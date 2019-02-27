function toJSON(reqId, data) {
  let jsonified;

  logger.info({ reqId });

  try {
    jsonified = JSON.parse(data);
  } catch (err) {
    logger.error('cannot convert string to JSON', { reqId, data, err });
    throw new Error('toJSON');
  }

  return jsonified;
}


module.exports = toJSON;
