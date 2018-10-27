import React, { Component } from 'react'

class BookMenuOption extends Component {
  state = {
    currentShelf: '',
  }
  componentDidMount = () => {
    const currentShelf = this.props.currentShelf === '' ? 'none' : this.props.currentShelf;
    this.setState((currentState) => ({
      currentShelf: currentShelf,
    }))
  }
  handlerSelected = (value) => {
    this.setState((currentState) => ({
      currentShelf: value
    }));
    console.log(value);
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
