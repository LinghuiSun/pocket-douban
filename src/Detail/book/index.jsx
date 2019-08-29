import React, { Component } from 'react'
import { Image, Container, Col, Row } from 'react-bootstrap'

class BookDetail extends Component {
  render() {
    const content = this.props.content;
    if (content === undefined) {
      return null;
    };
    return (
      < Container >
        <Row className="detail-item">
          <Col xs={5} sm={3}><Image src={content.images.small} width="100%" rounded /></Col>
          <Col xs={7} sm={9} className="detail-item-intro">
            <p>名称：{content.title}</p>
            <p>作者：{content.author[0]}</p>
            <p>出版社：{content.publisher}</p>
            <p>时间：{content.pubdate}</p>
            <p>评分：{content.rating.average}</p>
            <p>价钱：￥{content.price}</p>
            <div className="detail-tags">
              <span>{content.tags[0].name}</span>
              <span>{content.tags[1].name}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="detail-summary">
            <h4>序言</h4>
            <p>{content.catalog.replace(/<br>/g, ' ')}</p>
            <h4>简介</h4>
            <p>{content.summary}</p>
          </Col>
        </Row>
      </Container >
    )

  }
}

export default BookDetail