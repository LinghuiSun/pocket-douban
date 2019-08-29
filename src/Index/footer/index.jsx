import React, { Component } from 'react'
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFilm, faMusic } from '@fortawesome/free-solid-svg-icons'
class Footer extends Component {

  handleClick(category) {
    return this.props.onClick(category);
  }

  render() {
    const activeItem = this.props.activeItem;
    const footerList = [{
      category: 'book',
      text: '图书',
      icon: <FontAwesomeIcon icon={faBook} size="2x" />,
    },
    {
      category: 'movie',
      text: '电影',
      icon: <FontAwesomeIcon icon={faFilm} size="2x" />,
    },
    {
      category: 'music',
      text: '音乐',
      icon: <FontAwesomeIcon icon={faMusic} size="2x" />,
    }];

    return (
      <div className="footer">
        {footerList.map(item => {
          return (
            <div key={item.category} className={item.category === activeItem ? "footer-active" : "footer-item"} onClick={this.handleClick.bind(this, item.category)}>
              {item.icon}
              <p className="footer-text">{item.text}</p>
            </div>)
        })}
      </div>


    )
  }
}

export default Footer