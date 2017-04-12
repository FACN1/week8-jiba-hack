const Querystring = require('querystring');

const handler = (request, reply) => {
  const queries = Querystring.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: 'http://localhost:9000/access'
  });
  reply.redirect(`https://github.com/login/oauth/authorize?${queries}`);
};

module.exports = {
  method: 'GET',
  path: '/login',
  handler
};
