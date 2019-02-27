const pg = _require('database/postgres');
const { insertBookSearchList:sql } = _require('database/postgres/sql');


const insertIntoBookSearchList = async({ reqId, bookTitle, bookList }) => {
  /**
   * * need to loop through all API returned books & insert them
   * * this temporarily pops the first element
   */

  logger.info({ reqId, bookTitle });

  let startTime;
  let totalTime;
  try {
    startTime = new Date().getTime();
    await pg.none(sql, { bookTitle, bookList: bookList[0] });
    totalTime = new Date().getTime() - startTime;
  } catch (err) {
    logger.error({ reqId, err });
    throw err;
  }

  logger.info('--success', { reqId, totalTime });

  return;
};


module.exports = insertIntoBookSearchList;
