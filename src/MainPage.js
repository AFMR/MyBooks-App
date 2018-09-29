import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class MainPage extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setStateInternal(books)
    })
  }

  setStateInternal(books){
    this.setState({ currentlyReading: books.filter(book => book.shelf === 'currentlyReading') })
    this.setState({ wantToRead: books.filter(book => book.shelf === 'wantToRead') })
    this.setState({ read: books.filter(book => book.shelf === 'read') })      
  }

  updateShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then((data) => {
        BooksAPI.getAll().then((books)=>{
          this.setStateInternal(books)
        })
      })
   }

   render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  this.state.currentlyReading.map(book => (
                    <Book key={book.id} book={book} onUpdateBook={(book, shelf) => this.updateShelf(book, shelf)}/>
                  ))
                }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  this.state.wantToRead.map(book => (
                    <Book key={book.id} book={book} onUpdateBook={(book, shelf) => this.updateShelf(book, shelf)}/>
                  ))
                }
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  this.state.read.map(book => (
                    <Book key={book.id} book={book} onUpdateBook={(book, shelf) => this.updateShelf(book, shelf)}/>
                  ))
                }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainPage;