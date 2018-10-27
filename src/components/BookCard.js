import React, { Component } from 'react'
import BookMenuOption from './BookMenuOption'
import {func, string, array, shape} from 'prop-types'

/**
* @description React Component - generate book card with menu.
* @event onShelfChange - return shelf name where book should be placed
* @prop {array} available_shelves - array including a hash object with shelf name and id. e.g.: [{id: 'read', name: 'Read'}]. This will be used to render menu options
* @prop {string} currentShelf - shelf id only. e.g.: 'wantToRead'
* @prop {hash} book - hash including book info. e.g.: {id:'book_id', title: 'To Kill a Mockingbird', authors: ['Harper Lee'],
*           imageURL: 'thumbnail_url', shelf: 'read'}. 'shelf' key is optional, used on search page.
*/
class BookCard extends Component {
  static propTypes = {
    currentShelf: string.isRequired,
    onShelfChange: func.isRequired,
    available_shelves: array.isRequired,
    book: shape({
      id: string.isRequired,
      title: string.isRequired,
      authors: array.isRequired,
      imageURL: string.isRequired,
      shelf: string,
    }),
  }

  /**
  * @description Handler value for book menu option
  * @param {string} future_shelf - The shelf name where book will be placed
  */
  onShelfChange = (future_shelf) => {
    this.props.onShelfChange(future_shelf, this.props.book);
  }
  render(){
    const { book, currentShelf, available_shelves }= this.props;
    console.log(currentShelf);
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageURL})`
            }}
          />
          <BookMenuOption
            currentShelf={currentShelf}
            onShelfChange={this.onShelfChange}
            available_shelves={available_shelves}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}

export default BookCard
