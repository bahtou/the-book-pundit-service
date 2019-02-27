const superagent = require('superagent');
const { apiService:{ gr }} = _require('config');


async function getBookList({ reqId, bookTitle }) {
  const url = `${gr.url}/gr/books/search`;
  const query = {
    q: bookTitle
  };
  let startTime;
  let totalTime;
  let response = {};

  logger.info({ reqId, url, query });
  startTime = new Date().getTime();
  try {
    response = await superagent
      .get(url).accept('json').query(query);
    totalTime = new Date().getTime() - startTime;
  } catch (err) {
    totalTime = new Date().getTime() - startTime;
    const { status, response:{ error, headers } } = err;
    logger.error({ reqId, status, headers, error });
    throw err;
  }

  const { status, headers, text } = response;
  logger.info('--success', { reqId, status, headers, totalTime });

  return text;
}


module.exports = getBookList;
