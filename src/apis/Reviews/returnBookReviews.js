const { toJSON } = _require('utils');


async function returnBookReviews(ctx, next) {
  const { reqId, state:{ bookId, bookReviews }} = ctx;
  const reviews = toJSON(reqId, bookReviews[0]);
  const reviewsCount = reviews.length;

  logger.info({ reqId, reviewsCount });

  if (reviewsCount === 0) {
    logger.info('--no reviews', { reqId, bookId });
    return ctx.body = [ reviews ];
  }

  next();
  return ctx.body = [ reviews ];
}


module.exports = returnBookReviews;
