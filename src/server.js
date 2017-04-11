const hapi = require('hapi');
// package of hapi for serving static file
const inert = require('inert');
const vision = require('vision');
const path = require('path');
const handlebars = require('handlebars');

const routes = require('./routes');

// create a new server and open a connection
const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 9000
});

server.register([inert, vision], (err) => {
  if (err) throw err;
  // link the routes to our server
  // each route has a handler
  server.route(routes);

  server.views({
    engines: {
      hbs: handlebars
    },
    relativeTo: path.join(__dirname, 'handlebars'),
    layoutPath: './layouts',
    layout: 'default',
    path: './views',
    partialsPath: './partials',
    helpersPath: './helpers'
  });
});

module.exports = server;
