import React, { Component } from 'react'
import BookCard from './BookCard'
import {func, string, array, shape} from 'prop-types'

/**
* @description React Component - generate a shelf with its books.
* @event onShelfChange - return shelf name where book should be placed
* @prop {array} available_shelves - array including a hash object with shelf name and id. e.g.: [{id: 'read', name: 'Read'}]. This will be used to render menu options
* @prop {hash} shelf - hash including shelf info and books. e.g.: {id: 'read', name: 'Read', books: [{id:'book_id', title: 'To Kill a Mockingbird', authors: 'Harper Lee',
*           imageURL: 'thumbnail_url', shelf: 'read'}]. 'shelf' key is optional, used on search page.
*/
class BookShelf extends Component {
  static propTypes = {
    available_shelves: array.isRequired,
    onShelfChange: func.isRequired,
    shelf: shape({
      id: string.isRequired,
      name: string.isRequired,
      books: array.isRequired,
    }),
  }
  /**
  * @description Handler value for book menu option
  * @param {string} future_shelf - The shelf name where book will be placed
  * @param {hash} book - The book object that will be moved
  */
  onShelfChange = (future_shelf, book) => {
    this.props.onShelfChange(future_shelf, book)
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
