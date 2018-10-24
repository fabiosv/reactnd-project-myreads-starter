import React, { Component } from 'react'

class BookMenuOption extends Component {
  state = {
    currentShelf: '',
  }
  componentDidMount = () => {
    this.setState((currentState) => ({
      currentShelf: this.props.currentShelf
    }))
  }
  handleOptions = (event) => {
    this.setState((currentState) => ({
      currentShelf: event.target.value
    }))
    this.props.onShelfChange(this.state.currentShelf);
  }
  render() {
    const { currentShelf } = this.state;
    const { available_shelves } = this.props;
    return(
      <div className="book-shelf-changer">
        <select value={currentShelf} onChange={this.handleOptions} >
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
