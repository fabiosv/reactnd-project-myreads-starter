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
    default_shelves: ['currentlyReading', 'wantToRead', 'read'],
    available_shelves: []
  }
  checkNewShelves = (api_response) => {
    const default_shelves = [...this.state.default_shelves];
    const shelves_from_api = Array.from(new Set(api_response.map((book) => book.shelf)));
    const new_shelves = shelves_from_api.filter((api_shelf) => !default_shelves.includes(api_shelf));
    const shelves_names = [...default_shelves, ...new_shelves];
    return shelves_names;
  }
  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      const shelves_names = this.checkNewShelves(response);
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
      *       id: 'currentlyReading',
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

  addBookOnShelf = (shelf_id, book) => {
    var new_shelves = [...this.state.shelves];
    var target_shelf = new_shelves.findIndex((shelf) => shelf.id === shelf_id)

    /*Adding book*/
    new_shelves[target_shelf].books = new_shelves[target_shelf].books.concat(book);

    this.setState((currentState) => ({
      shelves: new_shelves,
    }));
    BooksAPI.update(book, shelf_id);
  }
  removeBookOnShelf = (book) => {
    var new_shelves = [...this.state.shelves];
    const target_shelf = new_shelves.findIndex((shelf) => shelf.books.filter((b) =>
      b.id === book.id).length === 1);

    /*Removing book */
    new_shelves[target_shelf].books = new_shelves[target_shelf].books.filter((b) => b.id !== book.id);

    this.setState((currentState) => ({
      shelves: new_shelves,
    }));
    BooksAPI.update(book, new_shelves[target_shelf].id);
  }
  removeFromAPI = (book)=> {
    BooksAPI.update(book, 'future');
  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ShelvesCollection
              shelves={this.state.shelves}
              available_shelves={this.state.available_shelves}
              addBookOnShelf={this.addBookOnShelf}
              removeBookOnShelf={this.removeBookOnShelf}
              removeFromAPI={this.removeFromAPI}
            />
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