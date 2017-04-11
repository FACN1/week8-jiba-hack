const handler = (request, reply) => {
  return reply.view('form', {
    title: 'Update'
  });
};

module.exports = {
  method: 'GET',
  path: '/form',
  handler
};
