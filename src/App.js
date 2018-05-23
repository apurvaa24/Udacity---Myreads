import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';

import ShelfList from './ShelfList';
import SearchBooks from './SearchBooks';


class BooksApp extends React.Component {
MAX_RESULTS = 30;

    state = {
        books: [],
        searchBooks: []
    };

    //api call for get books 
    componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState({ books });
      })
      .catch(err => console.error('Error occurred fetching contacts ', err));
  }

  //move book to different shelf
  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(this.setState(prevState => {
        let found = false;
        const newState =  prevState.books.map(b => {
          if (b.id === book.id) {
            b.shelf = shelf;
            found = true;
          }
          return b;
        });
        if (!found) {
          book.shelf = shelf;
          newState.push(book);
        }
        return { books: newState };
      }))
      .catch(err => console.error('Error occurred moving book: ', err));
  }
  
  //search books
  searchBooks = (query, MAX_RESULTS) => {
    BooksAPI.search(query, MAX_RESULTS)
      .then(searchedBooks => {
        this.setState({searchedBooks});
      })


      .catch(err => console.error('Error occurred searching books: ', err));
    
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ShelfList
              books={this.state.books}
              onMoveBook={this.changeShelf}
            />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={ ({history}) => (
          <SearchBooks
            books={this.state.books}
            onMoveBook={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
