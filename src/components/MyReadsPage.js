import React from 'react'
import { Link } from 'react-router-dom'

import ShelvesCollection from './ShelvesCollection'

function MyReadsPage (props) {
  const { shelves, available_shelves } = props;
  const { addBookOnShelf, removeBookOnShelf, removeFromAPI } = props;
  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <ShelvesCollection
        shelves={shelves}
        available_shelves={available_shelves}
        addBookOnShelf={addBookOnShelf}
        removeBookOnShelf={removeBookOnShelf}
        removeFromAPI={removeFromAPI}
      />
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

export default MyReadsPage