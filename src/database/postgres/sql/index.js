const QueryFile = require('pg-promise').QueryFile;
const path = require('path');


const sql = file => {
  const fullPath = path.join(__dirname, file); // generating full path;
  const options = {

    //When in debug mode, the query file is checked for its last modification time on every query request,
    //so if it changes, the file is read afresh.
    //The default for this property is true when NODE_ENV = development, or false otherwise.
    debug: true,

    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // Showing how to use static pre-formatting parameters -
    // we have variable 'schema' in each SQL (as an example);
    params: {
      schema: 'pundit' // replace ${schema~} with "public"
    }
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    logger.err('query file', { qf: qf.error });
  }

  return qf;
};


module.exports = {
  insertBookSearchList: sql('./insertBookSearchList.sql'),
  insertReview: sql('./insertReview.sql'),
  selectBookList: sql('./selectBookList.sql'),
  selectBookReviews: sql('./selectBookReviews.sql')
};
