import React, { Component } from 'react'
import BookMenuOption from './BookMenuOption'
import {func, string, array, shape} from 'prop-types'
import { IoMdEye, IoIosClose } from 'react-icons/io'
import BookDetails from './BookDetails'
import Modal from 'react-modal'


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
  state = {
    modalIsOpen: false,
  }

  /**
  * @description Handler value for book menu option
  * @param {string} future_shelf - The shelf name where book will be placed
  */
  onShelfChange = (future_shelf) => {
    this.props.onShelfChange(future_shelf, this.props.book);
  }
  openModal = () => {
    this.setState((currentState) => ({modalIsOpen: true}))
  }
  closeModal = () => {
    this.setState((currentState) => ({modalIsOpen: false}))
  }
  render(){
    const { book, currentShelf, available_shelves }= this.props;
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageURL})`
            }}
          >
            <a onClick={this.openModal}>
              <IoMdEye style={{
                fill: 'white',
                fontSize: '20px',
                backgroundColor: 'gray',
                opacity: '0.95'
              }}
              >See Details</IoMdEye>
            </a>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
            >
              <a
                className="closeButton"
                onClick={this.closeModal}
                style={{
                  float: 'right',
                  display: 'block',
                  fontSize: '25px',
                }}
              >
                <IoIosClose />
              </a>
              <BookDetails book_id={book.id} closeModal={this.closeModal}/>
            </Modal>
          </div>
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
