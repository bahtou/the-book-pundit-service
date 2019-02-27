const postgres = {

  GET_BOOK_LIST: require('./getBookList'),
  GET_BOOK_REVIEWS: require('./getBookReviews'),

  INSERT_INTO_BOOKSEARCHLIST: require('./insertIntoBookSearchList'),
  INSERT_INTO_REVIEW: require('./insertIntoReview')

};


module.exports = (name, params) => postgres[name](params);
