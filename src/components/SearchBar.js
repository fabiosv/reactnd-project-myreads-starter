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
    }))
  }
  doSearch = () => {
    BooksAPI.search(this.state.query).then((response) => {
      const books = response.map((book) => ({
        id: book.id,
        title: book.title,
        authors: book.authors,
        imageURL: book.imageLinks.thumbnail
      }));
      this.setState((currentState) => ({
        booksFound: books,
      }));
    });
  }
  onShelfChange = (future_shelf, book) => {
    this.props.addBookOnShelf(future_shelf, book);
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
            {booksFound.map((book) => (
              <BookCard
                book={book}
                currentShelf={shelf.id}
                onShelfChange={this.onShelfChange}
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
