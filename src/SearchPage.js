import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchPage extends Component {
  state = {
    searchWords: '',
    currentBooks: [],
    searchResults: []
  }

  updateShelf = (book, shelf) => {
    let currentBooks;
    if (this.state.currentBooks.findIndex(b => b.id === book.id) > 0) {
      currentBooks = this.state.currentBooks.map(b => {
        if (b.id === book.id) {
          return {...book, shelf}
        } else {
          return b
        }
      })
    } else {
      currentBooks = [...this.state.currentBooks, {...book, shelf}]
    }

    this.setState({currentBooks})

    BooksAPI.update(book, shelf).then((data) => { })
  }

  inputUpdated = (searchText) => {
    this.setState({searchWords: searchText})
    let searchResults = []
    if (searchText) {
      BooksAPI.search(searchText).then(response => {
        if (response.length) {
          searchResults = response.map(retrievedBooks => {
            const index = this.state.currentBooks.findIndex(c => c.id === retrievedBooks.id)
            if( index >= 0 ) {
              return this.state.currentBooks[index]
            } else {
              return retrievedBooks
            }
          })
        }
        this.setState({searchResults})
      })
    }
    else {
      this.setState({searchResults})
    }
  }  

  render (){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            < input type="text" placeholder="Search by title or author" value={this.state.searchWords} onChange={(e) => this.inputUpdated(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book, i) => (
              <Book key={i} book={book} onUpdateBook={(book, shelf) => this.updateShelf(book, shelf)}/>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;