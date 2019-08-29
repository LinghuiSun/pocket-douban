import React, { Component } from 'react'
import './search.css';
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      placeholder: {
        book: '书名、作者、ISBN',
        movie: '电影、影人、影院、电视剧',
        music: '唱片名、表演者、条码、ISRC'
      }
    }
  }
  /**
   * 
   * @param {*} event 
   * 若按下回车键，进行搜索
   */
  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.onSearch(this.state.value);
    };
  }
  handleSearch() {
    this.props.onSearch(this.state.value);
  }
  /**
   * 
   * @param {*} event
   * input输入时更新state 
   */
  handleChange(event) {
    const newValue = event.target.value;
    this.setState({ value: newValue });
  }
  render() {
    const type = this.props.category;
    const placeholder = this.state.placeholder[type];
    return (
      <div className="search">
        <input
          className="search-input"
          type="text"
          value={this.state.value}
          placeholder={placeholder}
          onKeyUp={this.handleKeyUp.bind(this)}
          onChange={this.handleChange.bind(this)} />
        <button
          className="search-btn"
          onClick={this.handleSearch.bind(this)}>搜索</button>
      </div>
    )
  }
}

export default Search