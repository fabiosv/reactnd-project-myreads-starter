import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import BookCard from './BookCard'

class SearchBar extends Component{
  state = {
    query: '',
    booksFound: [],
  }
  handleQuery = (text) => {
    this.setState((currentState) => ({
      query: text,
    }));
    this.doSearch();
  }
  clearResult = () => {
    this.setState((currentState) => ({booksFound: []}))
  }
  getBookImage = (book) => {
    return typeof book.imageLinks !== 'undefined' && book.imageLinks.thumbnail !== 'undefined'
      ? book.imageLinks.thumbnail
      : ''
  }
  getShelfId = (book) => {
    const shelfNumber = this.props.myShelves.findIndex((shelf) => shelf.books.filter((b) =>
    b.id === book.id).length === 1);
    return shelfNumber >= 0
      ? this.props.myShelves[shelfNumber].id
      : 'none'
  }
  doSearch = () => {
    BooksAPI.search(this.state.query).then((response) => {
      console.log(response);
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
  onBookAdded = (future_shelf, book) => {
    book.currentShelf !== 'none' && this.props.removeBookOnShelf(book);
    this.props.addBookOnShelf(future_shelf, book);
  }
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

export default SearchBar
