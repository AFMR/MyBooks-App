import React, { Component } from 'react';

import Book from './Book';

class MainPage extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  render(){
    console.log(this.props.books);
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
                      this.props.books.filter(book =>
                    book.shelf === 'CurrentlyReading')
                    .map(book => (
                      <li key={book.id}>
                      <Book book={book}/>
                      </li>
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
                      this.props.books.filter(book =>
                    book.shelf === 'WantToRead')
                    .map(book => (
                      <li key={book.id}>
                      <Book book={book}/>
                      </li>
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
                      this.props.books.filter(book =>
                    book.shelf === 'Read')
                    .map(book => (
                      <li key={book.id}>
                      <Book book={book}/>
                      </li>
                    ))
                    }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
            )
          }

}

export default MainPage;