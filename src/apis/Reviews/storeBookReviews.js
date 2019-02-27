const pgEndpoint = _require('endpoints/postgres');


async function storeBookReviews(ctx, next) {
  const { reqId, state:{ bookId, bookReviews }} = ctx;

  logger.info({ reqId, bookId });

  try {
    await pgEndpoint('INSERT_INTO_REVIEW', { reqId, bookId, bookReviews });
  } catch (err) {
    logger.error({ err });
  }

  logger.info('--bookReviews stored');
  return;
}


module.exports = storeBookReviews;
