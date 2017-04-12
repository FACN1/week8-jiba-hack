const handler = (request, reply) => {
  const data = {
    title: 'Update',
    loggedIn: false,
    githubInfo: request.auth.credentials // JWT payload data
  };

  // if user is authenticated, set loggedIn bool to true
  if (request.auth.isAuthenticated) {
    data.loggedIn = true;
  }

  return reply.view('form', data);
};

module.exports = {
  method: 'GET',
  path: '/form',
  config: {
    auth: {
      mode: 'try', // handler will still run even if not authorised
      strategy: 'jwtoken'
    },
    handler
  }
};
