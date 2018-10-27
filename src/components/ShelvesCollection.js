import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { func, array } from 'prop-types'

/**
* @description React Component - generate shelves and its books.
* @event onShelfChange - manipulate shelves structure using addBookOnShelf and removeBookOnShelf functions
* @prop {method} addBookOnShelf - append one book in a specific shelf and update API
* @prop {method} removeBookOnShelf - delete one book from a specific shelf
* @prop {method} removeFromAPI - update API setting shelf to 'none'
* @prop {array} available_shelves - array including a hash object with shelf name and id. e.g.: [{id: 'read', name: 'Read'}]. This will be used to render menu options
* @prop {array} shelves - array including many shelf and stored books. e.g.: [{id: 'read', name: 'Read', books: []}]
*/
class ShelvesCollection extends Component {
  static propTypes = {
    addBookOnShelf: func.isRequired,
    removeBookOnShelf: func.isRequired,
    removeFromAPI: func.isRequired,
    shelves: array.isRequired,
    available_shelves: array.isRequired,
  }
  /**
  * @description Move book from one shelf to another or to 'none'
  * @param {string} future_shelf - The shelf name where book will be placed
  * @param {hash} book - The book object that will be moved
  */
  onShelfChange = (future_shelf, book) => {
    console.log(future_shelf);
    const { addBookOnShelf, removeBookOnShelf, removeFromAPI } = this.props;
    removeBookOnShelf(book);
    future_shelf !== "none"
      ? addBookOnShelf(future_shelf, book)
      : removeFromAPI(book);
  }
  render(){
    const { shelves, available_shelves } = this.props;
    return(
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <BookShelf key={shelf.id} shelf={shelf} available_shelves={available_shelves} onShelfChange={this.onShelfChange}/>
          ))}
        </div>
      </div>
    )
  }
}

export default ShelvesCollection