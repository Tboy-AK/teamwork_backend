const Request = require('request');
const tokenOrigin = require('../token/token');

const adminLoginForm = {
  email: 'tobia807@gmail.com',
  password: 'xxxentric4321',
  admin: true,
};

describe('Server', () => {
  let server;
  beforeAll(() => {
    server = require('../server');
  });
  afterAll(() => {
    server.close();
  });
  describe('GET /', () => {
    const data = {};

    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.info).toBe('Node.js, Express and Postgres API');
    });
  });

  /* describe('GET /auth/get-users', () => {
    const data = {};

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/auth/get-users', (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.message).toBe('view users');
    });
  }); */

  describe('POST /auth/create-user', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'POST',
      headers: { authorization: token },
      body: {
        firstname: 'test', lastname: 'test', email: 'test', password: 'test', gender: 'male', jobrole: 'test', department: 'test', address: 'test', admin: false,
      },
      json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/auth/create-user', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(201);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
    it('Status 200', () => {
      expect(data.body.data.message).toBe('User account successfully created');
    });
  });

  describe('POST /auth/signin', () => {
    const data = {};
    const options = { method: 'POST', body: { email: adminLoginForm.email, password: adminLoginForm.password }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/auth/signin', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(201);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('POST /gifs', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'POST',
      headers: { authorization: token },
      body: {
        image: 'C:/Users/AKANJI OLUWATOBILOBA/Pictures/hsv 1.jpg', title: 'test',
      },
      json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/gifs', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(201);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
    it('Status 200', () => {
      expect(data.body.data.message).toBe('GIF image successfully posted');
    });
  });

  describe('POST /articles', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'POST', headers: { authorization: token }, body: { title: 'test', article: 'test' }, json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/articles', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(201);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
    it('Status 200', () => {
      expect(data.body.data.message).toBe('Article successfully posted');
    });
  });

  describe('PATCH /articles/:articleId', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'PATCH', headers: { authorization: token }, body: { title: 'tested', article: 'tested' }, json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/articles/6', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
    it('Status 200', () => {
      expect(data.body.data.message).toBe('Article successfully updated');
    });
  });

  describe('DELETE /articles/:articleId', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'DELETE', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/articles/1', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
    it('Status 200', () => {
      expect(data.body.data.message).toBe('Article successfully deleted');
    });
  });

  describe('DELETE /gifs/:gifId', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'DELETE', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/gifs/3', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
    it('Status 200', () => {
      expect(data.body.data.message).toBe('Gif post successfully deleted');
    });
  });

  describe('POST /articles/:id/comments', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'POST', headers: { authorization: token }, body: { comment: 'test' }, json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/articles/2/comments', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(201);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
    it('Status 200', () => {
      expect(data.body.data.message).toBe('Comment successfully created');
    });
  });

  describe('POST /gifs/:id/comments', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'POST', headers: { authorization: token }, body: { comment: 'test' }, json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/gifs/1/comments', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(201);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
    it('Status 200', () => {
      expect(data.body.data.message).toBe('Comment successfully created');
    });
  });

  describe('GET /feed', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'GET', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/feed', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('GET /articles/:articleId', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'GET', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/articles/2', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('GET /gifs/:gifId', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'GET', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/gifs/1', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /flag/articles/:articleId', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'PATCH', headers: { authorization: token }, body: { flag: 'false' }, json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/flag/articles/6', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /flag/gifs/:id', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'PATCH', headers: { authorization: token }, body: { flag: 'false' }, json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/flag/gifs/1', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /flag/articles/:id/comments/:comment_id', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'PATCH', headers: { authorization: token }, body: { flag: 'false' }, json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/flag/articles/2/comments/2', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /flag/gifs/:id/comments/:comment_id', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = {
      method: 'PATCH', headers: { authorization: token }, body: { flag: 'false' }, json: true,
    };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/flag/gifs/1/comments/5', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /flag/articles/:id', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'DELETE', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/flag/articles/1', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /flag/gifs/:id', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'DELETE', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/flag/gifs/3', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /flag/articles/:id/comments/:comment_id', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'DELETE', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/flag/articles/1/comments/1', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /flag/gifs/:id/comments/:comment_id', () => {
    const data = {};
    const token = tokenOrigin.jwt.sign(adminLoginForm, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
    const options = { method: 'DELETE', headers: { authorization: token }, json: true };

    beforeAll((done) => {
      Request('http://localhost:3000/api/v1/flag/gifs/3/comments/1', options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Status 200', () => {
      expect(data.body.status).toBe('success');
    });
  });
});
