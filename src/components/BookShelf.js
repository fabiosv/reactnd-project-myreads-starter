import React, { Component } from 'react'
import BookCard from './BookCard'

class BookShelf extends Component {
  onShelfChange = (book, future_shelf) => {

  }
  render(){
    const { shelf } = this.props;
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf.books.map((book) => (
              <li>
                <BookCard book={book} currentShelf={shelf.name} onShelfChange={this.onShelfChange}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
