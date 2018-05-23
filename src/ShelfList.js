import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BooksGrid from './BooksGrid';

const shelfName = ['currentlyReading', 'wantToRead', 'read'];

class ShelfList extends Component {


  static propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    const { books, onMoveBook } = this.props;

    return (
      <div>
        {
          shelfName.map(shelf => (
            <div className="bookshelf" key={shelf}>
              <h2 className="bookshelf-title">
                {shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })}
              </h2>
              <BooksGrid
                books={books.filter(book => book.shelf === shelf)}
                onMoveBook={onMoveBook}
              />
            </div>
          ))
        }
      </div>
    )
  }

}

export default ShelfList;
