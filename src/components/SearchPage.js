import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import BookCard from './BookCard'
import { func, array } from 'prop-types'

/**
* @description Search Page - Search new books and add in a specific shelf
* @prop {method} addBookOnShelf - append one book in a specific shelf and update API
* @prop {method} removeBookOnShelf - delete one book from a specific shelf
* @prop {method} removeFromAPI - update API setting shelf to 'none'
* @prop {array} available_shelves - array including a hash object with shelf name and id. e.g.: [{id: 'read', name: 'Read'}]. This will be used to render menu options
* @prop {array} myShelves - array including many shelf and stored books. e.g.: [{id: 'read', name: 'Read', books: []}]
*/
class SearchPage extends Component{
  static propTypes = {
    addBookOnShelf: func.isRequired,
    removeBookOnShelf: func.isRequired,
    removeFromAPI: func.isRequired,
    available_shelves: array.isRequired,
    myShelves: array.isRequired,
  }
  state = {
    query: '',
    booksFound: [],
  }

  /**
  * @description Handle query input and search for new books
  * @param {string} text - Text from input tag
  */
  handleQuery = (text) => {
    this.setState((currentState) => ({
      query: text,
    }));
    this.doSearch();
  }

  /**
  * @description Clear books retrieved from previous Search
  */
  clearResult = () => {
    this.setState((currentState) => ({booksFound: []}))
  }

  /**
  * @description Get book cover if present in API Response
  * @param {hash} book - book info
  * @return {string} thumbnail url or ''
  */
  getBookImage = (book) => {
    return typeof book.imageLinks !== 'undefined' && book.imageLinks.thumbnail !== 'undefined'
      ? book.imageLinks.thumbnail
      : ''
  }

  /**
  * @description Find book in myShelves and return shelf id
  * @param {hash} book - book info
  * @return {string} shelf id or 'none' if not found
  */
  getShelfId = (book) => {
    const shelfNumber = this.props.myShelves.findIndex((shelf) => shelf.books.filter((b) =>
    b.id === book.id).length === 1);
    return shelfNumber >= 0
      ? this.props.myShelves[shelfNumber].id
      : 'none'
  }

  /**
  * @description Call search method from API and set booksFound with retrieved books
  */
  doSearch = () => {
    BooksAPI.search(this.state.query).then((response) => {
      if(typeof response !== 'undefined' && response instanceof Array) {
        const books = response.map((book) => ({
          id: book.id,
          title: book.title,
          authors: book.authors,
          imageURL: this.getBookImage(book),
          currentShelf: this.getShelfId(book),
        }));
        this.setState((currentState) => ({
          booksFound: books,
        }));
      } else {
        this.clearResult();
      }
    });
  }

  /**
  * @description Add the searched book in a specific shelf, move if this book is placed in any shelf or remove if user select 'none'
  * @param {string} future_shelf - The shelf name where book will be placed
  * @param {hash} book - The book object that will be appended
  */
  onBookAdded = (future_shelf, book) => {
    book.currentShelf !== 'none' && this.props.removeBookOnShelf(book);
    future_shelf === 'none'
    ? this.props.removeFromAPI(book)
    : this.props.addBookOnShelf(future_shelf, book);
  }

  /**
  * @description Check if search not returned any books
  * @return {boolean}
  */
  booksNotFound = () => {
    return this.state.booksFound.length === 0 && this.state.query.length > 0
  }
  render(){
    const { booksFound } = this.state;
    const { available_shelves } = this.props;
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.booksNotFound() && (
              <div>Not Found</div>
            )}
            {booksFound.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                currentShelf={book.currentShelf}
                onShelfChange={this.onBookAdded}
                available_shelves={available_shelves}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
