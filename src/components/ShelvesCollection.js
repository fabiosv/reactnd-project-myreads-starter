import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ShelvesCollection extends Component {
  onMoveBook = (future_shelf, book) => {
    console.log(future_shelf);
    const { addBookOnShelf, removeBookOnShelf } = this.props;
    removeBookOnShelf(book.id);
    future_shelf !== "none" && addBookOnShelf(future_shelf, book);
  }
  render(){
    const { shelves, available_shelves } = this.props;
    return(
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <BookShelf key={shelf.id} shelf={shelf} available_shelves={available_shelves} onMoveBook={this.onMoveBook}/>
          ))}
        </div>
      </div>
    )
  }
}

export default ShelvesCollection