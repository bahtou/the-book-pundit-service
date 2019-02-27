const pg = _require('database/postgres');
const { selectBookReviews:sql } = _require('database/postgres/sql');


const getBookReviews = async({ reqId, bookId }) => {
  let data;

  logger.info({ reqId, bookId });

  let startTime;
  let totalTime;
  try {
    startTime = new Date().getTime();
    data = await pg.oneOrNone(sql, { bookId });
    totalTime = new Date().getTime() - startTime;
  } catch (err) {
    logger.error({ reqId, bookId, err });
    throw err;
  }

  logger.info('--success', { reqId, bookId, data: !!data, totalTime });

  if (!data) return null;

  return data;
};


module.exports = getBookReviews;
