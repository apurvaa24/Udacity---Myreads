import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BooksGrid from './BooksGrid';


class SearchBooks extends Component {
MAX_RESULTS = 30;
  static propTypes = {
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
  }

 //call search books
  updateQuery = (query) => {
    this.setState({
      query: query.trim()
    });
    this.searchBooks(query);
  }

   //search books from API
  searchBooks = (query, MAX_RESULTS) => {
    BooksAPI.search(query, MAX_RESULTS)
      .then(searchedBooks => {
        if (!searchedBooks || searchedBooks.error) 
            return [];

        let response = [];

        for (const searchedBook of searchedBooks) {
          for (const book of this.props.books) {
  
            if (searchedBook.id === book.id) {
             // console.log('searched book', searchedBook);
              searchedBook.shelf = book.shelf;
            }
          }
          response.push(searchedBook);
        }

        return response;
      })
      .then(searchedBooks => {
        this.setState(prevState => ({searchedBooks}))
      })
     .catch(err => console.error('Error occurred searching books: ', err));
  }

  render() {
    const { onMoveBook } = this.props;
    const { query, searchedBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={
                (event) => this.updateQuery(event.target.value)
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={searchedBooks}
            onMoveBook={onMoveBook}
          />
        </div>
      </div>
    )
  }

}

export default SearchBooks;