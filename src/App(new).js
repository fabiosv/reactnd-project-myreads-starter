import React from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import ShelfsCollection from './components/ShelfsCollection';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route to='/search' component={SearchBar} />
        <Route exact to='/' render={() => {
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ShelfsCollection />
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        }} />
      </div>
    )
  }
}

export default BooksApp