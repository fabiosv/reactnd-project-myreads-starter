import React, { Component } from 'react'
import Rating from 'react-rating'
import {IoIosStarOutline, IoIosStar, IoIosBook} from 'react-icons/io'
import * as BooksAPI from '../utils/BooksAPI'
import './BookDetails.css'
import Container from 'react-bootstrap/lib/Container'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ShareBar from './ShareBar'
import camelCaseToPhrase from '../utils/StringsMethods'
import {string} from 'prop-types'

/**
* @description React Component - Responsive, Display Book detail.
* @prop {string} book_id - Book ID used to search book detail through API
*/
class BookDetails extends Component {
  static propTypes = {
    book_id: string.isRequired,
  }
  state = {
    book: {},
    industryIdentifiers: [],
  }
  componentDidMount() {
    BooksAPI.get(this.props.book_id).then((response) => {
      console.log(response);
      this.setState((currentState) => ({
        book: {
          title: response.title,
          subtitle: response.subtitle,
          authors: response.authors,
          publishedDate: this.checkEmpty(response.publishedDate, 'unknow'),
          publisher: response.publisher,
          shelf: camelCaseToPhrase(response.shelf),
          language: response.language,
          averageRating: response.averageRating,
          ratingsCount: this.checkEmpty(response.ratingsCount, 0),
          categories: response.categories,
          contentVersion: response.contentVersion,
          description: response.description,
          imageLinks: response.imageLinks.thumbnail,
          canonicalVolumeLink: response.canonicalVolumeLink,
          previewLink: response.previewLink,
          pageCount: response.pageCount,
        },
      }));
    })
  }

  /**
  * @description Check if first parameter is 'undefined', returning second parameter if it's true or first parameter
  * @param {object} value - Value to be tested
  * @param {object} valueIfEmpty - Value to be returned weather first is 'undefined'
  */
  checkEmpty = (value, valueIfEmpty) => {
    return typeof value === 'undefined' ? valueIfEmpty : value;
  }
  render(){
    const { book } = this.state;
    return(
      <Container>
        <Row sm={12}>
          <Col sm={12} md={4} className="left">
            <h4>Shelf: {book.shelf}</h4>
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
            <p>Pub. Date: {book.publishedDate}</p>
            <Rating
              readonly={true}
              placeholderRating={book.averageRating}
              fractions={4}
              emptySymbol={<IoIosStarOutline/>}
              placeholderSymbol={<IoIosStar/>}
              fullSymbol="fa fa-star fa-2x"
            />
            <p style={{display: 'inline'}}>({book.ratingsCount})</p>
            <ShareBar url={book.previewLink} />
            <a href={book.previewLink} target="_blank" style={{marginLeft: '23%'}}>See Book <IoIosBook /></a>
          </Col>
          <Col sm={12} md={6} className="right">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <p>{book.description}</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BookDetails