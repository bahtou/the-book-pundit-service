const goodreads = {

  GET_BOOK_LIST: require('./getBookList'),
  GET_BOOK_REVIEWS: require('./getBookReviews')

};


module.exports = (name, params) => goodreads[name](params);
