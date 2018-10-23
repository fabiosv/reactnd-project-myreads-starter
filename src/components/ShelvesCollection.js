import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ShelvesCollection extends Component {

  render(){
    const { shelves } = this.props;
    return(
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <BookShelf shelf={shelf} />
          ))}
        </div>
      </div>
    )
  }
}

export default ShelvesCollection