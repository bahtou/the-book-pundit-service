const grEndpoints = _require('endpoints/gr-api');
const { toJSON } = _require('utils');


const getBooksEndpoints = [ grEndpoints ];

async function fetchBookReviews(ctx, next) {
  const { reqId, state } = ctx;
  const { bookId } = state;
  let getAllBookReviews = [];
  let bookReviews = [];

  logger.info({ reqId, bookId });

  getAllBookReviews = getBooksEndpoints.map(endpoint => endpoint('GET_BOOK_REVIEWS', { reqId, bookId }));

  try {
    bookReviews = await Promise.all(getAllBookReviews);
  } catch (err) {
    return ctx.body = `fetching book reviews failure: ${err}`;
  }

  ctx.state = { ...state, bookReviews };
  return next();
}


module.exports = fetchBookReviews;
