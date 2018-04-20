import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchPage extends Component {
    state = {
        'searchResult': [],
        'allShelvedBooks': [],
        'query': ""
    }

    onUpdateSearchQuery = (queryString) => {
        this.fetchAllShelvedBooks()
        this.setState({ 'query': queryString })

        if (queryString !== "") {
            BooksAPI.search(queryString)
                .then((results) => {
                    let searchResultsWithShelfData = []
                    if (Array.isArray(results)) {
                        searchResultsWithShelfData = results.map(
                            book => {
                                this.state.allShelvedBooks.forEach(function(shelvedBook) {
                                    if (book.id === shelvedBook.id) {
                                        book["shelf"] = shelvedBook["shelf"]
                                    } 
                                })
                                return book
                        })
                    }
                    this.setState({ 'searchResult': searchResultsWithShelfData })
                })
        } else if (queryString === "") {
            this.setState({'searchResult': []})
        }
    }

    handleShelfChange = (event, book) => {
        const newShelf = event.target.value
        const oldShelf = book.shelf

        if (oldShelf !== newShelf) {
            BooksAPI.update(book, newShelf).then(() => {
                this.setState((prevState) => {
                    const updatedList = prevState.searchResult.map(searchedBook => {
                        if (searchedBook.id === book.id) {
                            searchedBook['shelf'] = newShelf
                        }
                        return searchedBook
                    })
                    return { searchResult: updatedList };
                })
            })
        }
    }

    fetchAllShelvedBooks = () => {
        BooksAPI.getAll().then(
            results => {
                this.setState({ 'allShelvedBooks': results })
            }
        )
    }

    componentDidMount() {
        this.fetchAllShelvedBooks()
    }

    render () {
        const { query, searchResult } = this.state

        const listOfBooks = searchResult.length > 0 ? (
            
            searchResult.map(
                (book) => {   
                    return (
                        <li key={book.id}>
                            <Book 
                                book={book} 
                                handleShelfChange={this.handleShelfChange}
                            />
                        </li>
                    )
                })
            ) : ""
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"
                        className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" 
                            placeholder="Search by title or author" 
                            value={query}
                            onChange={(event) => this.onUpdateSearchQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {listOfBooks}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage