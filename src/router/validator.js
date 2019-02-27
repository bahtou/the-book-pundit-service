const { isNumber } = _require('utils');


async function validateBookId(ctx, next) {
  const { reqId, state, params:{ bookId }} = ctx;

  logger.info({ reqId, bookId });

  if (!isNumber(bookId)) {
    return ctx.body = 'not a number';
  }

  ctx.state = { ...state, bookId };
  return next();
}

async function validateSearchTerm(ctx, next) {
  const { reqId, state, query:{ q:bookTitle }} = ctx;

  logger.info({ reqId, bookTitle, state });

  if (isNumber(bookTitle)) {
    return ctx.body = 'numbers not allowed';
  }

  ctx.state = { ...state, bookTitle };
  return next();
}


module.exports = {
  validateSearchTerm,
  validateBookId
};
