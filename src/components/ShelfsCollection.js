import React, { Component } from 'react'
import BookShelf from './BookShelf'

class ShelfsCollection extends Component {

  render(){
    const { shelfs } = this.props;
    return(
      <div className="list-books-content">
        <div>
          {shelfs.map((shelf) => (
            <BookShelf shelf={shelf} />
          ))}
        </div>
      </div>
    )
  }
}

export default ShelfsCollection