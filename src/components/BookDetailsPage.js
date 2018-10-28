import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'


class BookDetailsPage extends Component {
  state = {
    book: {},
  }
  componentDidMount() {
    BooksAPI.get(this.props.book_id).then((response) => {
      console.log(response);
      this.setState((currentState) => ({
        book: {
          title: response.title,
          authors: response.authors,
          publishedDate: response.publishedDate,
          publisher: response.publisher,
          shelf: response.shelf,
          language: response.language,
          averageRating: response.averageRating,
          categories: response.categories,
          contentVersion: response.contentVersion,
          description: response.description,
          imageLinks: response.imageLinks.thumbnail,
          canonicalVolumeLink: response.canonicalVolumeLink,
          industryIdentifiers: response.industryIdentifiers.join(', '),
          infoLink: response.infoLink,
          pageCount: response.pageCount,
        }
      }));
    })
  }
  render(){
    const { book } = this.state;
    return(
      <div>
        <span>
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks})`
            }}
          >
          </div>
          <p>{book.industryIdentifiers}</p>
          <h2>{book.title}</h2>
          <p>{book.authors}</p>
          <p>{book.categories}</p>
          <p>{book.publishedDate}</p>
        </span>
        <span>
          <p>{book.description}</p>
        </span>
      </div>
    )
  }
}

export default BookDetailsPage