const uuidv4 = require('uuid/v4');


async function assignRequestId(ctx, next) {
  ctx.reqId = uuidv4();
  ctx.reqStartTime = Date.now();

  return next();
}


module.exports = assignRequestId;
