import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import SearchBar from './components/SearchBar'
import ShelvesCollection from './components/ShelvesCollection'
import * as BooksAPI from './utils/BooksAPI'
import camelCaseToPhrase from './utils/StringsMethods'

class BooksApp extends React.Component {
  state = {
    shelves: [],
    available_shelves: [],
  }
  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      console.log(response);
      const shelves_names = Array.from(new Set(response.map((book) => book.shelf)));
      const shelves = shelves_names.map((shelf) => ({
        id: shelf,
        name: camelCaseToPhrase(shelf),
        books: response.filter((book) => book.shelf === shelf).map((book) => ({
          id: book.id,
          title: book.title,
          authors: book.authors,
          imageURL: book.imageLinks.thumbnail
        }))
      }));
      /* Output Example:
      *   shelves: [
      *     {
      *       name: "Currently Reading",
      *       books: [
      *         {
      *           id:'book_id'
      *           title: 'To Kill a Mockingbird',
      *           authors: 'Harper Lee',
      *           imageURL: 'thumbnail_url'
      *         },
      *       ]
      *     }
      *   ]
      */
      this.setState((currentState) => ({
        shelves: shelves,
      }))
      const available_shelves = shelves_names.map((shelf) => ({
        id: shelf,
        name: camelCaseToPhrase(shelf),
      }));
      this.setState((currentState) => ({
        available_shelves: available_shelves,
      }))
    })
  }
  addBookOnShelf = (shelf_name, book_id) => {

  }
  removeBookOnShelf = (shelf_name, book_id) => {

  }
  moveBook = (book_title, toShelf_name) => {
    const currentShelf = this.state.shelfs.filter((shelf) => {
      return shelf.books.filter((b) => {
        return b.title === book_title
      }).length >= 1
    })[0];
    const futureShelf = this.state.shelfs.filter((shelf) => {
      return shelf.name === toShelf_name
    })[0];
    const otherShelfs = this.state.shelfs.filter((shelf) => {
      return shelf.name !== currentShelf.name && shelf.name !== toShelf_name
    });
    this.setState((currentState) => ({
      shelfs: currentState.shelfs
    }))

  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ShelvesCollection shelves={this.state.shelves} available_shelves={this.state.available_shelves}/>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
        <Route path='/search' component={SearchBar} />
      </div>
    )
  }
}

export default BooksApp