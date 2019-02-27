const KoaRouter = require('koa-router');

const fetchBookReviews = require('./fetchBookReviews');
const processBookReviews = require('./processBookReviews');
const returnBookReviews = require('./returnBookReviews');
const storeBookReviews = require('./storeBookReviews');


const Router = new KoaRouter();

Router
  .get('/',
    fetchBookReviews,
    processBookReviews,
    returnBookReviews,
    storeBookReviews
  );


module.exports = Router;
