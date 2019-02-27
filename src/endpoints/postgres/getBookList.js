const pg = _require('database/postgres');
const { selectBookList:sql } = _require('database/postgres/sql');


const getBookList = async({ reqId, bookTitle }) => {
  let data;

  logger.info({ reqId, bookTitle });

  let startTime;
  let totalTime;
  try {
    startTime = new Date().getTime();
    data = await pg.oneOrNone(sql, { bookTitle });
    totalTime = new Date().getTime() - startTime;
  } catch (err) {
    logger.error({ reqId, bookTitle, err });
    throw err;
  }

  logger.info('--success', { reqId, bookTitle, data: !!data, totalTime });

  if (!data) return null;

  return data;
};


module.exports = getBookList;
