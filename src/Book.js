import React, { Component } from 'react';

class Book extends Component {
  state = {
    currentShelf: "none"
  }

  selectionChanged = (e) => {
    this.setState({
      currentShelf: e.target.value
    })
    
    this.props.onUpdateBook(this.props.book, e.target.value)
    this.props.book.shelf = e.target.value
  }

  render(){
    const thumbnailUrl = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ""
    this.state.currentShelf = this.props.book.shelf ? this.props.book.shelf : "none"

    return(
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnailUrl}"` }}></div>
            <div className="book-shelf-changer">
              <select onChange={this.selectionChanged} value={this.state.currentShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      );
  }
}

export default Book