const pg = _require('database/postgres');
const { insertReview:sql } = _require('database/postgres/sql');


const insertIntoReview = async({ reqId, bookId, bookReviews }) => {
  /**
   * * need to loop through all API returned books & insert them
   * * this temporarily pops the first element
   */

  logger.info({ reqId, bookId });

  let startTime;
  let totalTime;
  try {
    startTime = new Date().getTime();
    await pg.none(sql, { bookId, reviews: bookReviews[0] });
    totalTime = new Date().getTime() - startTime;
  } catch (err) {
    logger.error({ reqId, err });
    throw err;
  }

  logger.info('--success', { reqId, totalTime });

  return;
};


module.exports = insertIntoReview;
