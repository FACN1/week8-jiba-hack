const Hapi = require('hapi');
const Inert = require('inert'); // hapi plugin for serving static files
const Vision = require('vision'); // hapi plugin for templating
const Handlebars = require('handlebars');
const Path = require('path');
const routes = require('./routes');
const HapiAuth = require('hapi-auth-jwt2');

// create a new server and open a connection
const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 9000,
  state: { isSameSite: 'Lax' }
});

// validate function (token already decoded)
const validate = (decodedToken, request, callback) => {
  if (!decodedToken.username) {
    return callback(null, false);
  }
  return callback(null, true);
};

// register plugins with the server
server.register([Inert, Vision, HapiAuth], (err) => {
  if (err) throw err;

  // set server authentication strategy
  server.auth.strategy('jwtoken', 'jwt', {
    key: process.env.SECRET,
    validateFunc: validate,
    verifyoptions: { algorithms: ['HS256'] }
  });

  // link the routes to our server (each route has a handler)
  server.route(routes);

  // set up handlebars
  server.views({
    engines: {
      hbs: Handlebars
    },
    relativeTo: Path.join(__dirname, 'handlebars'),
    layoutPath: './layouts',
    layout: 'default',
    path: './views',
    partialsPath: './partials',
    helpersPath: './helpers'
  });
});

module.exports = server;
