const KoaRouter = require('koa-router');

const fetchBookReviews = require('./fetchBookReviews');
const returnBookReviews = require('./returnBookReviews');
const storeBookReviews = require('./storeBookReviews');


const Router = new KoaRouter();

Router
  .get('/',
    fetchBookReviews,
    returnBookReviews,
    storeBookReviews
  );


module.exports = Router;
