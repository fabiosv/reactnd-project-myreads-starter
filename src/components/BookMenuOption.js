import React, { Component } from 'react'

class BookMenuOption extends Component {
  state = {
    currentShelf: '',
    options: [
      {
        value: 'currentlyReading',
        label: 'Currently Reading'
      }, {
        value: 'wantToRead',
        label: 'Want to Read'
      }, {
        value: 'read',
        label: 'Read'
      }, {
        value: 'none',
        label: 'None'
      },
    ],
  }
  componentDidMount = () => {
    const currentShelf = this.state.options.filter((option) => option.label === this.props.currentShelf)[0].value;
    this.setState((currentState) => ({
      currentShelf: currentShelf
    }))
  }
  handleOptions = (event) => {
    this.setState((currentState) => ({
      currentShelf: event.target.value
    }))
  }
  render() {
    const { currentShelf, options } = this.state;
    return(
      <div className="book-shelf-changer">
        <select value={currentShelf} onChange={this.handleOptions} >
          <option value="move" disabled>Move to...</option>
          {options.map((option) => (
            <option value={option.value} key={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default BookMenuOption
