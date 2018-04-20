import React from 'react'
import './App.css'
import SearchPage from './SearchPage'
import BookList from './BookList'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
  }
  
  render() {
    return (
      <div className="app">
          <Route path="/search" 
            render={() => (
              <SearchPage />
            )}
          /> 
          <Route path="/"
            exact={true}
            render={() => (<BookList />)}
          />
      </div>
    )
  }
}

export default BooksApp
