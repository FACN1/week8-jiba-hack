const Fs = require('fs');
const dbConnection = require('./db_connection.js');

const sql = Fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (error, res) => {
  if (error) {
    return console.log(error);
  }
  return console.log('Kitty table created with result:', res);
});
