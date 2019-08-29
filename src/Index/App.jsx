import React, { Component } from 'react';
import Search from './search';
import Footer from './footer';
import List from './list';
import fetchJsonp from 'fetch-jsonp';
require('es6-promise').polyfill();
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faSync } from '@fortawesome/free-solid-svg-icons'
class App extends Component {
  // Prevent React setState on unmounted Component
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      category: 'book',
      bookList: [],
      movieList: [],
      musicList: [],
      hasMore: true,
      page: 1
    };
    this.fetchMore = this.fetchMore.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  /**
   * 组件挂载后，通过fetchJsonp异步获取数据，更新state
   */
  componentDidMount() {
    console.log("DidMount");
    this._isMounted = true;
    const returnType = this.props.location.state && this.props.location.state.type;
    this.setState({
      category: returnType || 'book'
    });

    this.fetchData('book');
    this.fetchData('music');
    this.fetchData('movie');
  }
  /**
   * 
   * @param {string} type 
   * 异步获取数据存储在state的List中
   */

  fetchData(value) {
    const type = value ? value : this.state.category;
    const typeUrl = this.getUrl(type, 1);
    const updateList = type + 'List';
    const that = this;
    fetchJsonp(typeUrl)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        if (that._isMounted) {
          that.setState({
            [updateList]: json.result
          });
        }
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  }


  fetchMore() {
    const type = this.state.category;
    const updateList = type + 'List';
    if (this.state[updateList].length >= 100) {
      this.setState({ hasMore: false });
      return;
    }
    const nextPage = this.state.page + 1;
    const typeUrl = this.getUrl(type, nextPage);
    this.setState({
      page: nextPage
    });
    const that = this;
    fetchJsonp(typeUrl)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        that.setState({
          [updateList]: that.state[updateList].concat(json.result)
        });
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  }

  /**
   * 
   * @param {string} value 
   * 根据输入的类别参数，返回编码后的url
   */
  getUrl(value, page) {
    const queryItem = {
      book: '{id,title,author,rating{average},pubdate,tags{name},images{small}}}',
      music: '{id,title,author{name},rating{average},image}}',
      movie: '{id,title,rating{average},genres,casts{name},images{small}}}'
    }
    const url = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_${value}"]&q={ke_coding_${value}(_page:${page},_limit:4)${queryItem[value]}`;
    return encodeURI(url);
  }
  /**
   * 
   * @param {string} value 
   * 点击搜索框按钮，将搜索框的值传回父组件，作为keyword传给子组件List
   */
  handleSearch(value) {
    this.setState({
      keyword: value
    });
  }

  handleClick(value) {
    this.setState({
      category: value
    });
  }


  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {
    const type = this.state.category;
    const contentList = this.state[type + 'List'];
    return (
      <div>
        <Search category={type} onSearch={this.handleSearch.bind(this)} />
        {/* 上拉刷新，下拉加载组件 */}
        <InfiniteScroll
          dataLength={contentList.length}
          next={this.fetchMore}
          hasMore={this.state.hasMore}
          loader={<p style={{ textAlign: "center" }}>
            加载中 <FontAwesomeIcon icon={faSpinner} size="x" />
          </p>}
          height={500}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>到底啦</b>
            </p>
          }
          refreshFunction={this.fetchData}
          pullDownToRefresh
          pullDownToRefreshContent={
            <p style={{ textAlign: 'center' }}>&#8595; 上拉刷新</p>
          }
          releaseToRefreshContent={
            <p style={{ textAlign: 'center' }}>
              释放刷新 <FontAwesomeIcon icon={faSync} size="x" />
            </p>
          }
        >
          <List category={type} value={contentList} keyword={this.state.keyword} />
        </InfiniteScroll>

        <Footer activeItem={this.state.category} onClick={this.handleClick.bind(this)} />
      </div >

    );
  }
}


export default App;


