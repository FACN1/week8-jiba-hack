const server = require('../../src/server.js');
const tape = require('tape');
const jwt = require('jsonwebtoken');

// mock JWT data
const mockPayload = {
  username: 'JWLD',
  img_url: 'myImageUrl',
  user_id: 'myUserId'
};
const mockOptions = {
  expiresIn: Date.now() + (10 * 1000),
  subject: 'github-data'
};
const realSecret = process.env.SECRET;

/** HOME ROUTE **/

tape('Home route - loading', (t) => {
  const options = {
    url: '/',
    method: 'GET'
  };
  server.inject(options, (res) => {
    const testString = '<title>Kitty I/O</title>';
    t.equal(res.statusCode, 200, 'Status code is 200');
    t.ok(res.payload.includes(testString), 'Serves html with correct title');
    t.end();
  });
});

tape('Home route - without authentication', (t) => {
  const options = {
    url: '/',
    method: 'GET'
  };

  server.inject(options, (res) => {
    const authString = '<span hidden>loggedIn</span>';
    const unauthString = '<span hidden>notLoggedIn</span>';
    t.equal(res.statusCode, 200, 'Status code is 200');
    t.ok(res.payload.includes(unauthString), 'Serves correct html for unauthenticated users');
    t.notOk(res.payload.includes(authString), 'Doesn\'t serve the html for authenticated users');
    t.end();
  });
});

tape('Home route - with invalid token', (t) => {
  const token = jwt.sign(mockPayload, 'incorrectSecret', mockOptions);

  const options = {
    url: '/',
    method: 'GET',
    headers: { authorization: token }
  };

  server.inject(options, (res) => {
    const authString = '<span hidden>loggedIn</span>';
    const unauthString = '<span hidden>notLoggedIn</span>';
    t.equal(res.statusCode, 200, 'Status code is 200');
    t.ok(res.payload.includes(unauthString), 'Serves correct html for unauthenticated users');
    t.notOk(res.payload.includes(authString), 'Doesn\'t serve the html for authenticated users');
    t.end();
  });
});

tape('Home route - with valid token', (t) => {
  const token = jwt.sign(mockPayload, realSecret, mockOptions);

  const options = {
    url: '/',
    method: 'GET',
    headers: { authorization: token }
  };

  server.inject(options, (res) => {
    const authString = '<span hidden>loggedIn</span>';
    const unauthString = '<span hidden>notLoggedIn</span>';
    t.equal(res.statusCode, 200, 'Status code is 200');
    t.ok(res.payload.includes(authString), 'Serves correct html for authenticated users');
    t.notOk(res.payload.includes(unauthString), 'Doesn\'t serve html for unauthenticated users');
    t.end();
  });
});

/** FORM ROUTE **/

tape('Form route - without authentication', (t) => {
  const options = {
    url: '/form',
    method: 'GET'
  };

  server.inject(options, (res) => {
    t.equal(res.statusCode, 302, 'Status code is 302');
    t.equal(res.headers.location, '/', 'Redirects to /');
    t.end();
  });
});

tape('Form route - with invalid token', (t) => {
  const token = jwt.sign(mockPayload, 'incorrectSecret', mockOptions);

  const options = {
    url: '/form',
    method: 'GET',
    headers: { authorization: token }
  };

  server.inject(options, (res) => {
    t.equal(res.statusCode, 302, 'Status code is 302');
    t.equal(res.headers.location, '/', 'Redirects to /');
    t.end();
  });
});

tape('Form route - with valid token', (t) => {
  const token = jwt.sign(mockPayload, realSecret, mockOptions);

  const options = {
    url: '/form',
    method: 'GET',
    headers: { authorization: token }
  };

  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, 'Status code is 200');
    t.end();
  });
});

// exit process
tape.onFinish(() => {
  return process.exit(0);
});
