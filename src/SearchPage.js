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

  combineArrays = (arr1, arr2) => {
    return arr1.map((item1)=>{
      arr2.forEach((item2)=>{
        if(item2.id === item1.id){
          item1.shelf = item2.shelf

          return
        }
      })

      return item1
    })
  }

  inputUpdated = (searchText) => {
    this.setState({searchWords: searchText})
    let searchResults = []
    let userBooks = []

    BooksAPI.getAll()
    .then((books)=>{
      userBooks = books
    })
    .then(() => {
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
  
          searchResults = this.combineArrays(searchResults, userBooks)
  
          this.setState({searchResults})
        })
      }
      else {
        this.setState({searchResults})
      }
      })
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