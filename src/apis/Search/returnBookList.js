const { toJSON } = _require('utils');


async function returnBookList(ctx, next) {
  const { reqId, state:{ bookList }} = ctx;

  logger.info({ reqId });

  next();
  return ctx.body = [ toJSON(reqId, bookList) ];
}


module.exports = returnBookList;
