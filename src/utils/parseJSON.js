function parseJSON(reqId, data) {
  let jsonified;

  logger.info({ reqId });

  try {
    jsonified = JSON.parse(data);
  } catch (err) {
    logger.error('cannot convert string to JSON', { reqId, data, err });
    throw new Error('parseJSON');
  }

  return jsonified;
}


module.exports = parseJSON;
