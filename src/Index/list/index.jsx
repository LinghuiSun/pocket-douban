import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Item from '../item';


class List extends Component {

  /**
   * 
   * @param {object} item 
   * 遍历由object的values构成的数组，若为字符串，判断是否包含关键字
   * 若为对象，统一为数组后判断每一项是否包含关键字
   */
  filterList(item) {
    const keyword = this.props.keyword;
    const array = Object.values(item);
    for (let item of array) {
      if (typeof item === 'string' && item.includes(keyword)) {
        return true;
      };
      if (typeof item === 'object') {
        const newArr = Object.values(item);
        for (let ele of newArr) {
          if (typeof ele === 'string' && ele.includes(keyword)) {
            return true;
          };
          if (typeof ele === 'object') {
            return newArr.some(obj =>
              obj.name.includes(keyword)
            );
          };
        };
      };
    };

  }

  render() {
    const category = this.props.category;
    const list = this.props.value;
    const filteredList = list.filter(this.filterList.bind(this));
    return (

      <div>
        {
          filteredList.map(item => {
            const data = { id: item.id, type: category };
            const path = {
              pathname: '/detail',
              state: data,
            }
            return (
              <Link to={path} key={item.id}>
                <Item key={item.id} category={category} value={item} />
              </Link>)
          })
        }
      </div>
    )
  }
}

export default List