const config = {

  env: process.env.NODE_ENV,
  host: process.env.NODE_HOST,
  port: process.env.NODE_PORT,
  gitsha: process.env.GIT_VERSION,

  service: process.env.APP_SERVICE,

  apiService: {
    gr: {
      url: 'the-book-pundit-apis:3001'
    }
  },

  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    poolSize: process.env.POSTGRES_POOLSIZE, // max number of clients in the pool
    idleTimeoutMillis: process.env.POSTGRES_IDLETIMEOUTMILLIS, // how long a client is allowed to remain idle before being closed
    reapIntervalMillis: 1000,
    ssl: false,
    debug: true,
    returnToHead: false,
    poolLog: false,
    parseInputDatesAsUTC: false,
    retryConnection: {
      maxTime: process.env.POSTGRES_RETRY_MAX_TIME,
      time: process.env.POSTGRES_RETRY_CONNECTION
    }
  }
};


module.exports = config;
