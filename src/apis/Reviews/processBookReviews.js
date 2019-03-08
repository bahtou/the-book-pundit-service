const { parseJSON } = _require('utils');


async function processBookReviews(ctx, next) {
  const { reqId, state:{ bookReviews }} = ctx;
  const reviews = parseJSON(reqId, bookReviews[0]);
  const reviewsCount = reviews.length;

  /**
   * * bookReviews should be an array of arrays
   * * [ [], [], [] ]
   *
   * * for now, pop the first array and send
   */

  logger.info({ reqId, reviewsCount });

  if (reviewsCount === 0) {
    ctx.state = { ...ctx.state, bookReviews: reviews };
    return next();
  }

  const reviewerRegEx = /\s*Reviews/gi;
  const reviewRegEx = /&apos;s review\s*/gi;
  let i=0;
  for (;i<reviewsCount; i++) {
    reviews[i].reviewer = reviews[i].reviewer.replace(reviewerRegEx, '');
    reviews[i].review = reviews[i].review.replace(reviewRegEx, '');
  }

  ctx.state = { ...ctx.state, bookReviews: reviews };
  return next();
}


module.exports = processBookReviews;
