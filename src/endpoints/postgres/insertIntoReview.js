const pg = _require('database/postgres');
const { insertReview:sql } = _require('database/postgres/sql');
const { stringifyJSON } = _require('utils');


const insertIntoReview = async({ reqId, bookId, bookReviews }) => {
  const _bookReviews = stringifyJSON(reqId, bookReviews);

  /**
   * * need to loop through all API returned books & insert them
   * * this temporarily pops the first element
   */

  logger.info({ reqId, bookId });

  let startTime;
  let totalTime;
  try {
    startTime = new Date().getTime();
    await pg.none(sql, { bookId, reviews: _bookReviews });
    totalTime = new Date().getTime() - startTime;
  } catch (err) {
    logger.error({ reqId, err });
    throw err;
  }

  logger.info('--success', { reqId, totalTime });

  return;
};


module.exports = insertIntoReview;
