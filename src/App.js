import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import camelCaseToPhrase from './utils/StringsMethods'

import SearchPage from './components/SearchPage'
import MyReadsPage from './components/MyReadsPage'

class BooksApp extends React.Component {
  state = {
    shelves: [],
    default_shelves: ['currentlyReading', 'wantToRead', 'read'],
    available_shelves: []
  }

  /**
  * @description Check if there are any book with a new shelf, not mapped in default_shelves
  * @param {array} api_response - Verify if API has a new shelf available
  * @return {array} shelves_names - including default shelves and new shelves mapped from API
  */
  checkNewShelves = (api_response) => {
    const default_shelves = [...this.state.default_shelves];
    const shelves_from_api = Array.from(new Set(api_response.map((book) => book.shelf)));
    const new_shelves = shelves_from_api.filter((api_shelf) => !default_shelves.includes(api_shelf));
    const shelves_names = [...default_shelves, ...new_shelves];
    return shelves_names;
  }

  /**
  * @description Extract shelves info. e.g.: id, name, books
  * @param {array} response - Books returned from API
  * @param {array} available_shelves - array including a hash objects with shelf name and id. e.g.: [{id: 'read', name: 'Read'}].
  * @return {list} shelves = [
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
  extractShelves = (response, available_shelves) => {
    return available_shelves.map((shelf) => ({
      id: shelf,
      name: camelCaseToPhrase(shelf),
      books: response.filter((book) => book.shelf === shelf).map((book) => ({
        id: book.id,
        title: book.title,
        authors: book.authors,
        imageURL: book.imageLinks.thumbnail
      }))
    }));
  }

  /**
  * @description Add a book in the shelf
  * @param {string} shelf_id - The shelf name where book will be placed
  * @param {hash} book - The book object that will be appended
  */
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

  /**
  * @description Remove a book from a specific shelf
  * @param {hash} book - The book object that will be removed from shelves
  */
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

  /**
  * @description If 'none' was selected in Menu, this function will update API to remove book from main page
  * @param {hash} book - The book object that will be removed
  */
  removeFromAPI = (book)=> {
    BooksAPI.update(book, 'none');
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      const shelves_names = this.checkNewShelves(response);
      const available_shelves = shelves_names.map((shelf) => ({
        id: shelf,
        name: camelCaseToPhrase(shelf),
      }));
      this.setState((currentState) => ({
        available_shelves: available_shelves,
      }))

      const shelves = this.extractShelves(response, shelves_names);
      this.setState((currentState) => ({
        shelves: shelves,
      }))
    })
  }
  render() {
    const {available_shelves, shelves} = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyReadsPage
            shelves={shelves}
            available_shelves={available_shelves}
            addBookOnShelf={this.addBookOnShelf}
            removeBookOnShelf={this.removeBookOnShelf}
            removeFromAPI={this.removeFromAPI}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
            available_shelves={available_shelves}
            onSearch={this.extractShelves}
            myShelves={shelves}
            addBookOnShelf={this.addBookOnShelf}
            removeBookOnShelf={this.removeBookOnShelf}
            removeFromAPI={this.removeFromAPI}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp