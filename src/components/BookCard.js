import React, { Component } from 'react'
import BookMenuOption from './BookMenuOption'

class BookCard extends Component {
  onShelfChange = (future_shelf) => {
    this.props.onShelfChange(this.props.book, future_shelf);
  }
  render(){
    const { book, currentShelf }= this.props;
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageURL})`
            }}
          />
          <BookMenuOption currentShelf={currentShelf} onShelfChange={this.onShelfChange}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default BookCard
