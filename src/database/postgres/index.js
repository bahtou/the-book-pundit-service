const uuidv4 = require('uuid/v4');
const config = _require('config');


let retryCount = 0;
let delay = config.postgres.retryConnection.time;

const retryConnection = delay => {
  setTimeout(() => {
    verifyConnection();
  }, delay);
};

const verifyConnection = () => {
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
    });
};

const dbOptions = {
  query(queryToBeExecuted) {
    const { query, params, dc, ctx } = queryToBeExecuted;
    logger.info(`pgQuery`, { query, params, dc, ctx });
  },
  connect(client, dc, useCount) {
    const { connectionParameters, processID, secretKey } = client;

    logger.info(`pgConnect--dc:${dc} processId:${processID} key:${secretKey} used:${useCount}`, { connectionParameters });
  },
  disconnect(client, dc) {
    const { connectionParameters, processID, secretKey } = client;

    logger.warn(`pgDisconnect--releasing the virtual connection--dc:${dc} processId:${processID} key:${secretKey}`, { connectionParameters });
  },
  error(err, { ctx, params, query, client, cn, dc }) {
    let connectionParameters;
    let processID;
    let secretKey;

    if (client) {
      ({ connectionParameters, processID, secretKey } = client);
    }

    logger.error(`pgError--dc:${dc}`, { err, connectionParameters, processID, key: secretKey });

    if (err.code === 'ECONNREFUSED') {
      logger.error(`pg--trying to re-establish a connection to postgres:${dc}`);
    }

    if (err.code === '57P01') {
      logger.error(`PAGERDUTY: call support immediately`);
      retryConnection(delay);
    }

    if (dc) {
      logger.error(`pg--database context:${dc}`);
    }

    if (cn) {
      logger.error('pg--connection', { cn });
      // this is a connection-related error
      // cn = safe connection details passed into the library:
      //      if password is present, it is masked by #
    }

    if (query) {
      logger.error('pgQuery', { query });
      // query string is available
      if (params) {
        logger.error('params', { params });
        // query parameters are available
      }
    }

    if (ctx) {
      // occurred inside a task or transaction
      logger.error('ctx', { ctx });
    }
  },
  noWarnings: false

};

const pgp = require('pg-promise')(dbOptions);
const pg = pgp(config.postgres, uuidv4()); //set database context to uuid


module.exports = pg;
