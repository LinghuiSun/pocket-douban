import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'

import './item.css';
function Book(params) {
  return (
    <div className="item">
      <Image src={params.value.images.small} rounded />
      <div className="item-intro">
        <p>名称：{params.value.title}</p>
        <div className="book-tags">
          <span>{params.value.tags[0].name}</span>
          <span>{params.value.tags[1].name}</span>
        </div>
        <p>作者：{params.value.author}</p>
        <p>评分：{params.value.rating.average}</p>
        <p>时间：{params.value.pubdate}</p>
      </div>
    </div>
  )
}
function Movie(params) {
  return (
    <div className="item">
      <Image src={params.value.images.small} rounded />
      <div className="item-intro">
        <p className="movie-hd">{params.value.title}</p>
        <div className="movie-tags">
          {params.value.genres.map((genre, index) => <span key={index}>{genre} </span>)}
        </div>
        <p className="movie-staff">{params.value.casts.map((cast, index) => <span key={index}>{cast.name} </span>)}</p>
        <p>评分：{params.value.rating.average}</p>
      </div>
    </div>
  )
}
function Music(params) {
  return (
    <div className="item">
      <Image src={params.value.image} rounded />
      <div className="item-intro">
        <p>名称：{params.value.title}</p>
        <p>作者：{params.value.author.map((author, index) => <span key={index}>{author.name} </span>)}</p>
        <p>评分：{params.value.rating.average}</p>
      </div>
    </div>
  )
}

class Item extends Component {

  render() {
    const value = this.props.value;
    const category = this.props.category;
    const renderType = {
      'movie': <Movie value={value} />,
      'music': <Music value={value} />,
      'book': <Book value={value} />
    }
    const renderCom = renderType[category];
    return (
      <div>
        {renderCom}
      </div>
    )
  }
}
export default Item