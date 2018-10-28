import React, { Component } from 'react'
import Rating from 'react-rating'
import {IoIosStarOutline, IoIosStarHalf, IoIosStar} from 'react-icons/io'
import * as BooksAPI from '../utils/BooksAPI'
import './BookDetailsPage.css'
import PageHeader from './PageHeader'


class BookDetailsPage extends Component {
  state = {
    book: {},
    industryIdentifiers: [],
  }
  componentDidMount() {
    BooksAPI.get(this.props.book_id).then((response) => {
      this.setState((currentState) => ({
        book: {
          title: response.title,
          subtitle: response.subtitle,
          authors: response.authors,
          publishedDate: response.publishedDate,
          publisher: response.publisher,
          shelf: response.shelf,
          language: response.language,
          averageRating: response.averageRating,
          ratingsCount: response.ratingsCount,
          categories: response.categories,
          contentVersion: response.contentVersion,
          description: response.description,
          imageLinks: response.imageLinks.thumbnail,
          canonicalVolumeLink: response.canonicalVolumeLink,
          infoLink: response.infoLink,
          pageCount: response.pageCount,
        },
      }));
    })
    console.log(this.props.history)
  }
  render(){
    const { book } = this.state;
    return(
      <div>
        <div className="container">
          <div className="left">
            <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks})`,
                marginBottom: 10
              }}
            >
            </div>
            <p>{book.authors}</p>
            <p>Categories: {book.categories}</p>
            <p>Publisher: {book.publisher}</p>
            <p>{book.publishedDate}</p>
            <Rating
              readonly={true}
              placeholderRating={book.averageRating}
              fractions={2}
              emptySymbol={<IoIosStarOutline/>}
              placeholderSymbol={<IoIosStar/>}
              fullSymbol="fa fa-star fa-2x"
            /> <p style={{display: 'inline'}}>({book.ratingsCount})</p>
          </div>
          <div className="right">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetailsPage