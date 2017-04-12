const Request = require('request');

const handler = (request, reply) => {
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: request.query.code
  };
  const options = {
    method: 'POST',
    body: data,
    json: true,
    url: 'https://github.com/login/oauth/access_token'
  };
  Request(options, (error, response, body) => {
    if (error) return reply(error);
    if (!body.access_token) {
      return reply('Something went wrong - no access token!');
    }
    return reply(body.access_token);
  });
};

module.exports = {
  method: 'GET',
  path: '/access',
  handler
};
