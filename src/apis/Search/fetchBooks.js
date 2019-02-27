const grEndpoints = _require('endpoints/gr-api');


const getBooksEndpoints = [ grEndpoints ];

async function fetchBooks(ctx, next) {
  const { reqId, state } = ctx;
  const { bookTitle } = state;
  let getAllBooks = [];
  let bookList = [];

  logger.info({ reqId, bookTitle });

  getAllBooks = getBooksEndpoints.map(endpoint => endpoint('GET_BOOK_LIST', { reqId, bookTitle }));

  try {
    bookList = await Promise.all(getAllBooks);
  } catch (err) {
    return ctx.body = `fetching books failure: ${err}`;
  }

  ctx.state = { ...state, bookList };
  return next();
}

module.exports = fetchBooks;
