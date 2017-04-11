const Hapi = require('hapi');
const Inert = require('inert'); // hapi plugin for serving static files
const Vision = require('vision'); // hapi plugin for templating
const Handlebars = require('handlebars');
const Path = require('path');
const routes = require('./routes');

// create a new server and open a connection
const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 9000
});

// register plugins with the server
server.register([Inert, Vision], (err) => {
  if (err) throw err;

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
