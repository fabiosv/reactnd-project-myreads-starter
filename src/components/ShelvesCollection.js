import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ShelvesCollection extends Component {

  render(){
    const { shelves, available_shelves } = this.props;
    return(
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <BookShelf key={shelf.id} shelf={shelf} available_shelves={available_shelves}/>
          ))}
        </div>
      </div>
    )
  }
}

export default ShelvesCollection