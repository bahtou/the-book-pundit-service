const pg = _require('database/postgres');
const config = _require('config');


let retryCount = 0;
let delay = config.postgres.retryConnection.time;

const retryConnection = delay => {
  setTimeout(() => {
    verifyPostgresConnection();
  }, delay);
};

async function verifyPostgresConnection() {
  pg.proc('version')
    .then(data => {
      logger.info(`Successfully established connection to ${data.version}`);
      retryCount = 0;
    })
    .catch(err => {
      logger.error(`Connection to postgres: retry attempt ${retryCount}@${delay}`, { err });
      retryConnection(delay);
      retryCount++;
      delay = delay * 2;

      throw err;
    });
}


module.exports = verifyPostgresConnection;
