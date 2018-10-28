import React, { Component } from 'react'
import { func, string, array } from 'prop-types'

/**
* @description React Component - generate menu button to move book to other shelf.
* @event onShelfChange - return shelf name where book should be placed
* @prop {array} available_shelves - array including a hash object with shelf name and id. e.g.: [{id: 'read', name: 'Read'}]. This will be used to render menu options
* @prop {string} currentShelf - shelf id only. e.g.: 'wantToRead'
*/
class BookMenuOption extends Component {
  static propTypes = {
    currentShelf: string.isRequired,
    onShelfChange: func.isRequired,
    available_shelves: array.isRequired,
  }
  state = {
    currentShelf: '',
  }
  componentDidMount = () => {
    this.setState((currentState) => ({
      currentShelf: this.props.currentShelf,
    }))
  }

  /**
  * @description Handler value for book menu option
  * @param {string} value - The shelf name where book will be placed
  */
  handlerSelected = (value) => {
    this.setState((currentState) => ({
      currentShelf: value
    }));
    this.props.onShelfChange(value);
  }
  render() {
    const { currentShelf } = this.state;
    const { available_shelves } = this.props;
    return(
      <div className="book-shelf-changer">
        <select value={currentShelf} onChange={(event) => this.handlerSelected(event.target.value)} >
          <option value="move" disabled>Move to...</option>
          {available_shelves.map((shelf) => (
            <option value={shelf.id} key={shelf.id}>{shelf.name}</option>
          ))}
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookMenuOption
