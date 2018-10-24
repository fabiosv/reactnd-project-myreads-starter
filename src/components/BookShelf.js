import React, { Component } from 'react'
import BookCard from './BookCard'

class BookShelf extends Component {
  onShelfChange = (future_shelf, book) => {
    this.props.onMoveBook(future_shelf, book)
  }
  render(){
    const { shelf, available_shelves } = this.props;
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelf.books.map((book) => (
              <li key={book.id}>
                <BookCard
                  book={book}
                  currentShelf={shelf.id}
                  onShelfChange={this.onShelfChange}
                  available_shelves={available_shelves}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
