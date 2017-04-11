const Joi = require('joi');
const connPool = require('../../database/db_connection.js');
const dbQueries = require('../db_queries.js');

const handler = (request, reply) => {
  dbQueries.postTransaction(connPool, request.payload, (err) => {
    if (err) {
      return reply(`Error when adding to database: ${err}`);
    }
    return reply.redirect('/');
  });
};

module.exports = {
  method: 'POST',
  path: '/transact',
  handler,
  config: {
    validate: {
      payload: {
        name: Joi.string().regex(/^[a-zA-Z]{3,40}$/),
        amount: Joi.number().integer()
      }
    }
  }
};
