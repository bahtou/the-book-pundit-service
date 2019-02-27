const pgEndpoint = _require('endpoints/postgres');


async function hydrateBook(ctx, next) {
  const { reqId, state:{ bookTitle }} = ctx;
  let data = [];

  logger.info({ reqId, bookTitle });

  try {
    data = await pgEndpoint('GET_BOOK_LIST', { reqId, bookTitle });
  } catch (err) {
    logger.error('GET_BOOK_LIST', err);
    throw err;
  }

  if (data && data.book_list) {
    logger.info('--cached', { reqId, bookTitle });
    return ctx.body = data.book_list;
  }

  return next();
}

async function hydrateReviews(ctx, next) {
  const { reqId, state:{ bookId }} = ctx;
  let data = [];

  logger.info({ reqId, bookId });

  // try {
  //   data = await pgEndpoint('GET_BOOK_REVIEWS', { reqId, bookId });
  // } catch (err) {
  //   logger.error('GET_GET_BOOK_REVIEWSBOOK_LIST', err);
  //   throw err;
  // }

  // if (data && data.reviews) {
  //   logger.info('--cached', { reqId, bookId });
  //   return ctx.body = data.reviews;
  // }

  return next();
}


module.exports = {
  hydrateBook,
  hydrateReviews
};
