const dbQueries = {};

dbQueries.postTransaction = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO kitty (name, transaction_value) VALUES ($1, $2)',
    [data.name, data.amount],
    callback
  );
};

dbQueries.retrieveTransactions = (connPool, callback) => {
  connPool.query(
    'SELECT name, transaction_value, transaction_date FROM kitty ORDER BY transaction_date DESC',
    callback
  );
};

module.exports = dbQueries;
