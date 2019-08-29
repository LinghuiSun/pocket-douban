
import React, { Component } from 'react'
import { Image, Container, Col, Row } from 'react-bootstrap'


class MovieDetail extends Component {
  render() {
    const content = this.props.content;
    if (content === undefined) {
      return null;
    };
    return (
      <Container>
        <Row className="detail-item">
          <Col className="image-center"><Image src={content.images.small} rounded /></Col>
        </Row>
        <Row>
          <Col className="detail-movie-summary">
            <h4>简介</h4>
            <p>名称：{content.title}</p>
            <p>上映时间：{content.pubdates}</p>
            <p>导演：{content.directors[0].name}</p>
            <p>时长：{content.durations[0]}</p>
            <div className="movie-tags">
              {content.genres.map((genre, index) => <span key={index}>{genre} </span>)}
            </div>

          </Col>
        </Row>
        <Row>
          <Col><h4>演员</h4></Col>
        </Row>
        <Row>
          {content.casts.map((cast, index) =>
            <Col xs={4} key={index}>
              <Image src={cast.avatars.small} alt={cast.name} roundedCircle width="100%" />
              {cast.name}
            </Col>)}
        </Row>
      </Container>


    )


  }
}

export default MovieDetail