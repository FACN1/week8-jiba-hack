const staticRoute = require('./static.js');
const formRoute = require('./form.js');
const transactRoute = require('./transact.js');
const homeRoute = require('./home.js');

// export all the routes in one array
module.exports = [
  staticRoute,
  formRoute,
  transactRoute,
  homeRoute
];
