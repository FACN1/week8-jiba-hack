const dbQueries = require('../db_queries.js');
const connPool = require('../../database/db_connection.js');

const NUM_OF_RESULTS = 50;

const handler = (request, reply) => {
  dbQueries.retrieveTransactions(connPool, (err, response) => {
    // sum the transactions in the kitty
    const total = response.rows.reduce((transactionSum, row) => {
      return transactionSum + row.transaction_value;
    }, 0);

    const data = {
      title: 'Kitty I/O',
      total,
      rows: response.rows.slice(0, NUM_OF_RESULTS),
      loggedIn: false,
      githubInfo: request.auth.credentials // JWT payload data
    };

    // if user is authenticated, set loggedIn bool to true
    if (request.auth.isAuthenticated) {
      data.loggedIn = true;
    }

    return reply.view('home', data);
  });
};

module.exports = {
  method: 'GET',
  path: '/',
  config: {
    auth: {
      mode: 'try', // handler will still run even if not authorised
      strategy: 'jwtoken'
    },
    handler
  }
};
