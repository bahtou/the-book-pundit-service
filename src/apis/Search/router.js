const KoaRouter = require('koa-router');

const fetchBooks = require('./fetchBooks');
const returnBookList = require('./returnBookList');
const storeBookList = require('./storeBookList');


const Router = new KoaRouter();

Router
  .get('/',
    fetchBooks,
    returnBookList,
    storeBookList
  );


module.exports = Router;
