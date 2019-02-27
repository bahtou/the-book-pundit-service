const responseHandler = async(ctx, next) => {
  const { reqBegin } = ctx.state;

  try {
    await next();
    const reqDuration = `${Date.now() - reqBegin}ms`;
    ctx.set('X-ResponseTime', reqDuration);
  } catch (err) {
    const { reqId, state:{ entryPoint, response }} = ctx;
    const reqDuration = `${Date.now() - reqBegin}ms`;

    if (!response) {
      logger.error(`RESPONSE ERROR--missing response`, { reqId, entryPoint, err });
      ctx.status = 500;
      ctx.body = { reqId, msg: 'Internal Server Error' };
      return;
    }

    const { status=500, headers, body } = response;

    logger.warn(`RESPONSE ERROR`, { reqId, body, headers, status, entryPoint, reqDuration });

    if (headers) {
      ctx.set(headers);
    }

    ctx.set('X-ResponseTime', reqDuration);
    ctx.status = status;
    ctx.body = { reqId, ...body };

    return;
  }
};

const handleInitialRequest = async(ctx, next) => {
  const { reqId, method, headers, ip, ips, path, querystring, origin, hostname } = ctx;

  let entryPoint = {
    xForwardedFor: headers['x-forwarded-for'],
    ipAddress: ip,
    ipAddresses: ips,
    method,
    path,
    querystring,
    hostname,
    origin,
    userAgent: headers['user-agent']
  };

  ctx.state = { ...ctx.state, entryPoint };
  logger.info('ENTRY POINT', { reqId, entryPoint });

  return next();
};


module.exports = {
  handleInitialRequest,
  responseHandler
};
