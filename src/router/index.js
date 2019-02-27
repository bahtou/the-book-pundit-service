const KoaRouter = require('koa-router');

const BookSearchAPI = new KoaRouter();
const BookReviewAPI = new KoaRouter();

const { validateSearchTerm, validateBookId } = require('./validator');
const { hydrateBook, hydrateReviews } = require('./hydrator');
const { handleInitialRequest, responseHandler } = require('./controller');

const Search = _require('apis/Search/router');
const Reviews = _require('apis/Reviews/router');


BookSearchAPI
  .use('/search',
    validateSearchTerm,
    hydrateBook,

    Search.routes(),
    Search.allowedMethods()
  );

BookReviewAPI
  .use('/reviews/:bookId',
    validateBookId,
    hydrateReviews,

    Reviews.routes(),
    Reviews.allowedMethods()
  );


const routes = app => {
  app
    .use(responseHandler)
    .use(handleInitialRequest)

    .use(BookSearchAPI.routes())
    .use(BookReviewAPI.routes());
};


module.exports = routes;
