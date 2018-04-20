import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookList extends Component {
    state = {
        'currentlyReading': [],
        'wantToRead': [],
        'read': []
    }

    handleShelfChange = (event, book) => {
        const newShelf = event.target.value
        const oldShelf = book.shelf

        if (oldShelf !== newShelf) {
            BooksAPI.update(book, newShelf).then(() => {
                this.fetchAllBooks()
            })
        }
    }

    fetchAllBooks = () => {
        
        BooksAPI.getAll().then(
            results => {
                let currentlyReading = []
                let wantToRead = []
                let read = []

                if (Array.isArray(results)) {
                    currentlyReading = results.filter(book => {
                        return book.shelf === "currentlyReading"
                    })
                    wantToRead = results.filter(book => {
                        return book.shelf === "wantToRead"
                    })
                    read = results.filter(book => {
                        return book.shelf === "read"
                    })
                }
                
                this.setState({ 
                    'currentlyReading': currentlyReading,
                    'read': read,
                    'wantToRead': wantToRead
                })
            }
        )
    }

    componentDidMount() {
        this.fetchAllBooks()
    }

    render () {

        return (
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
                                    {this.state.currentlyReading.map(book => 
                                        <li key={book.id}>
                                            <Book 
                                                book={book} 
                                                handleShelfChange={this.handleShelfChange}
                                            />
                                        </li>
                                    )}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.wantToRead.map(book =>
                                        <li key={book.id}>
                                            <Book 
                                                book={book}
                                                handleShelfChange={this.handleShelfChange}
                                            />
                                        </li>
                                    )}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.read.map(book =>
                                        <li key={book.id}>
                                            <Book 
                                                book={book}
                                                handleShelfChange={this.handleShelfChange}ß
                                            />
                                        </li>
                                    )}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }

}

export default BookList;