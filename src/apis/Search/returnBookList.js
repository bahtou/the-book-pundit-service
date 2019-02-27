const { toJSON } = _require('utils');


async function returnBookList(ctx, next) {
  const { reqId, state:{ bookList }} = ctx;
  const _bookList = toJSON(reqId, bookList);
  const bookListCount = bookList.length;

  /**
   * * bookList should be an array of arrays
   * * [ [], [], []]
   *
   * * for now, pop the first array and send
   */

  logger.info({ reqId, bookListCount });

  next();
  return ctx.body = _bookList;
}


module.exports = returnBookList;
