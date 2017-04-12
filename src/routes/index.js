const staticRoute = require('./static.js');
const formRoute = require('./form.js');
const transactRoute = require('./transact.js');
const homeRoute = require('./home.js');
const loginRoute = require('./login.js');
const welcomeRoute = require('./welcome.js');

// export all the routes in one array
module.exports = [
  staticRoute,
  formRoute,
  transactRoute,
  homeRoute,
  loginRoute,
  welcomeRoute
];
