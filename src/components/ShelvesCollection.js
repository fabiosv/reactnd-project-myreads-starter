import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ShelvesCollection extends Component {
  onShelfChange = (future_shelf, book) => {
    console.log(future_shelf);
    const { addBookOnShelf, removeBookOnShelf, removeFromAPI } = this.props;
    removeBookOnShelf(book);
    future_shelf !== "none"
      ? addBookOnShelf(future_shelf, book)
      : removeFromAPI(book);
  }
  render(){
    const { shelves, available_shelves } = this.props;
    return(
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <BookShelf key={shelf.id} shelf={shelf} available_shelves={available_shelves} onShelfChange={this.onShelfChange}/>
          ))}
        </div>
      </div>
    )
  }
}

export default ShelvesCollection