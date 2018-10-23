import React, { Component } from 'react'
import BookMenuOption from './BookMenuOption'

class BookCard extends Component {
  render(){
    const { book }= this.props;
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.url})`
            }}
          />
          <div className="book-shelf-changer">
            <BookMenuOption />
          </div>
        </div>
        <div className="book-title">{book.year}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default BookCard
