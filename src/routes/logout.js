const handler = (request, reply) => {
  reply.redirect('/').unstate('token');
};

module.exports = {
  path: '/logout',
  method: 'GET',
  handler
};
