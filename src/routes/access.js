const Request = require('request');
const Jwt = require('jsonwebtoken');

const handler = (request, reply) => {
  /* STEP 1 - POST REQUEST TO GET ACCESS TOKEN FROM GITHUB */

  // [1.1] set up options for POST request to get access token
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

  // [1.2] make POST request to get access token from GitHub
  Request(options, (error, response, body) => {
    if (error) return reply(error);
    if (!body.access_token) {
      return reply('Something went wrong - no access token!');
    }

    /* STEP 2 - GET REQUEST TO GET USER INFORMATION FROM GITHUB */

    // [2.1] set up options for GET request to get user information
    const ghOptions = {
      url: 'https://api.github.com/user',
      headers: {
        'User-Agent': 'jiba-hack',
        Authorization: `token ${body.access_token}`
      },
      json: true
    };

    // [2.2] make GET request to get user details, using access_token
    return Request.get(ghOptions, (ghError, ghResponse, ghBody) => {
      if (ghError) return reply(ghError);

      /* STEP 3: CREATE JSON WEB TOKEN AND STORE IT AS A COOKIE */

      // [3.1] set up options for JSON Web Token
      const payload = {
        username: ghBody.login,
        image_url: ghBody.avatar_url,
        user_id: ghBody.id
      };
      const secret = process.env.SECRET;
      const jwtOptions = {
        expiresIn: Date.now() + (24 * 60 * 60 * 1000),
        subject: 'github-data'
      };

      // [3.2] create JSON Web Token
      return Jwt.sign(payload, secret, jwtOptions, (jwtError, jwToken) => {
        if (jwtError) return reply(jwtError);

        // [3.3] redirect and save the JSON Web Token as a COOKIE called token
        return reply.redirect('/').state('token', jwToken, {
          path: '/',
          isHttpOnly: false,
          isSecure: process.env.NODE_ENV === 'PRODUCTION'
        });
      });
    });
  });
};

module.exports = {
  method: 'GET',
  path: '/access',
  handler
};
