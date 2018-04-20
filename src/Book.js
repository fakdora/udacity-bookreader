import React, { Component } from 'react'

class Book extends Component {

    render () {
        const {book} = this.props
        let thumbnailStyle = {}

        if (typeof book.imageLinks !== 'undefined') {
            thumbnailStyle = {
                width: 128, 
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
            }
        }

        const currentBookShelf = book.shelf ? book.shelf : "none"

        return (
            <div className="book">
                <div className="book-top">
                    <div 
                        className="book-cover" 
                        style={thumbnailStyle}>
                    </div>
                    
                    <div className="book-shelf-changer">
                    
                        <select 
                            value={currentBookShelf} 
                            onChange={(e) => this.props.handleShelfChange(e, book)}
                        >
                            <option value="moveto" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>

 
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {typeof book.authors !== 'undefined' ? 
                        book.authors.join(", ")
                        :  ""
                    }
                 </div>
            </div>
        )
    }
}

export default Book
