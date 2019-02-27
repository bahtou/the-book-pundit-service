async function returnBookReviews(ctx, next) {
  const { reqId, state:{ bookId, bookReviews }} = ctx;
  const reviewsCount = bookReviews.length;

  /**
   * * bookReviews should be an array of arrays
   * * [ [], [], [] ]
   *
   * * for now, pop the first array and send
   */

  logger.info({ reqId });

  if (reviewsCount === 0) {
    logger.info('--no reviews', { reqId, bookId, bookReviews });
  }

  next();
  return ctx.body = bookReviews;
}


module.exports = returnBookReviews;
