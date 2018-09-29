import React from 'react'
import './App.css'
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI';
import SearchPage from './SearchPage';
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchPage/>
        )}/>
        <Route exact path="/" render={() => (
          <MainPage/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
