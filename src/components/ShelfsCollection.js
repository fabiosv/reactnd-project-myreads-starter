import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ShelfsCollection extends Component {
  state = {
    shelfs: [
      {
        title: "Currently Reading",
        books: []
      }, {
        title: "Want to Read",
        books: []
      }, {
        title: "Read",
        books: []
      }
    ],
  }
  render(){
    const { shelfs } = this.state;
    return(
      <div className="list-books-content">
        <div>
          {shelfs.map((shelf) => {
            <BookShelf shelf={shelf} />
          })}
        </div>
      </div>
    )
  }
}

export default ShelfsCollection