function stringifyJSON(reqId, data) {
  let stringified;

  logger.info({ reqId });

  try {
    stringified = JSON.stringify(data);
  } catch (err) {
    logger.error('cannot convert string to JSON', { reqId, data, err });
    throw new Error('parseJSON');
  }

  return stringified;
}


module.exports = stringifyJSON;
