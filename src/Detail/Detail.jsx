import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import fetchData from '../api';
require('es6-promise').polyfill();
import BookDetail from './book';
import MusicDetail from './music';
import MovieDetail from './movie';
import './detail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
class Detail extends Component {
  // Prevent React setState on unmounted Component
  _isMounted = false;

  constructor(props) {
    super(props)
    this.state = {
      type: '',
      id: '',
      content: []
    }
  }

  /**
   * 组件挂载后，通过fetchJsonp异步获取数据，更新state
   */
  componentDidMount() {
    this._isMounted = true;
    const { id, type } = this.props.location.state;
    this.setState({
      type: type,
      id: id
    });

    const url = this.getUrl(id, type);
    const that = this;
    fetchData(url, function (json) {
      if (that._isMounted) {
        that.setState({
          content: json.result
        });
      }
    })

  }
  /**
   * 
   * @param {string} value 
   * 根据输入的类别参数，返回编码后的url
   */
  getUrl(id, value) {
    const queryItem = {
      book: '{id,title,author,publisher,pubdate,rating{average},price,tags{name},images{small},catalog,summary}}',
      music: '{id,title,author{name},rating{average},image,tags{name},attrs{publisher,pubdate}}}',
      movie: '{id,title,rating{average},genres,casts{name,avatars{small}},images{small},pubdates,durations,directors{name}}}'
    }
    const url = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_${value}"]&q={ke_coding_${value}(id:"${id}")${queryItem[value]}`;
    return encodeURI(url);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const content = this.state.content[0];
    const type = this.state.type;
    const returnData = { type: type };
    const path = {
      pathname: '/',
      state: returnData,
    }
    const returnType = {
      'book': '图书',
      'music': '音乐',
      'movie': '电影'
    }
    const renderComponent = {
      'book': <BookDetail content={content} />,
      'music': <MusicDetail content={content} />,
      'movie': <MovieDetail content={content} />,
    }
    return (
      <div>
        <header className="detail-header">
          <Link to={path} className="detail-return">
            <FontAwesomeIcon icon={faAngleLeft} />
            <span> {returnType[type]}</span>
          </Link>
          <span className="detail-title">{content && content.title}</span>
        </header>
        <div>{renderComponent[type]}</div>
      </div>)
  }
}

export default Detail