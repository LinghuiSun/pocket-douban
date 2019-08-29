
import React, { Component } from 'react'
import { Image, Container, Col, Row } from 'react-bootstrap'

class MusicDetail extends Component {
  render() {
    const content = this.props.content;
    if (content === undefined) {
      return null;
    };
    return (
      < Container >
        <Row className="detail-item">
          <Col xs={5}><Image src={content.image} width="100%" rounded /></Col>
          <Col xs={7} className="detail-item-intro">
            <p>名称：{content.title}</p>
            <p>作者：{content.author.map((author, index) => <span key={index}>{author.name} </span>)}</p>
            <p>发布商：{content.attrs.publisher}</p>
            <p>发布时间：{content.attrs.pubdate}</p>
            <p>评分：{content.rating.average}</p>

          </Col>
        </Row>
        <Row>
          <Col className="detail-summary">
            <h4>简介</h4>
            <div className="detail-tags">
              {content.tags.map((tag, index) => <span key={index}>{tag.name} </span>)}
            </div>
          </Col>
        </Row>
      </Container >
    )
  }
}

export default MusicDetail