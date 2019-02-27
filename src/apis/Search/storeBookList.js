const pgEndpoint = _require('endpoints/postgres');


async function storeBookList(ctx, next) {
  const { reqId, state:{ bookTitle, bookList }} = ctx;

  logger.info({ reqId, bookTitle });

  try {
    await pgEndpoint('INSERT_INTO_BOOKSEARCHLIST', { reqId, bookTitle, bookList });
  } catch (err) {
    logger.error({ err });
  }

  logger.info('--booklist stored');
  return;
}


module.exports = storeBookList;
