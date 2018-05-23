import React, { Component } from 'react';
import PropTypes from 'prop-types';
import placeholderBook from './icons/placeholderBook.png'

class BooksGrid extends Component {



  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }
  //call changeShelf
  moveBook(book, event) {
    this.props.onMoveBook(book, event.target.value);
  }

  render() {
    const { books } = this.props;


    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map(book => (
   
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 142, height: 212, backgroundImage:  `url("${book.imageLinks ? book.imageLinks.thumbnail : placeholderBook}")` }}></div>
                    <div className="book-shelf-changer">
                      <select  value={book.shelf ? book.shelf: "none"}onChange={this.moveBook.bind(this, book)}>
                        <option value="move" disabled>Move to</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title ? book.title : null}</div>
                  <div className="book-authors">{book.authors ? book.authors.join(',') : null}</div>
                </div>
              </li>
            ))
          }
        </ol>
      </div>
    )
  }

}

export default BooksGrid;