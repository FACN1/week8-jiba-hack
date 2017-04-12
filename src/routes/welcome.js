const handler = (request, reply) => {
  reply(request.query);
};

module.exports = {
  method: 'GET',
  path: '/welcome',
  handler
};
