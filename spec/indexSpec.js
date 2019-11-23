const Request = require('request');

describe('Server', () => {
  let server;
  beforeAll(() => {
    server = require('../index');
  });
  afterAll(() => {
    server.close();
  });
  /* describe('GET /', () => {
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

  describe('GET /auth/get-users', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/auth/get-users', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
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
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/auth/create-user', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('POST /auth/signin', () => {
    const data = {};
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/auth/signin', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('POST /gifs', () => {
    const data = {};
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/gifs', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('POST /articles', () => {
    const data = {};
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/articles', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.patch('http://localhost:3000/api/v1/articles/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.del('http://localhost:3000/api/v1/articles/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /gifs/:gifId', () => {
    const data = {};
    beforeAll((done) => {
      Request.del('http://localhost:3000/api/v1/gifs/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('POST /articles/:id/comments', () => {
    const data = {};
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/articles/1/comments', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('POST /gifs/:id/comments', () => {
    const data = {};
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/gifs/1/comments', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('GET /feed', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/feed', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('GET /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/articles/2', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('GET /gifs/:gifId', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/gifs/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /flag/articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.patch('http://localhost:3000/api/v1/flag/articles/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /flag/gifs/:id', () => {
    const data = {};
    beforeAll((done) => {
      Request.patch('http://localhost:3000/api/v1/flag/gifs/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /flag/articles/:id/comments/:comment_id', () => {
    const data = {};
    beforeAll((done) => {
      Request.patch('http://localhost:3000/api/v1/flag/articles/1/comments/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('PATCH /flag/gifs/:id/comments/:comment_id', () => {
    const data = {};
    beforeAll((done) => {
      Request.patch('http://localhost:3000/api/v1/flag/gifs/1/comments/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /flag/articles/:id', () => {
    const data = {};
    beforeAll((done) => {
      Request.del('http://localhost:3000/api/v1/flag/articles/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /flag/gifs/:id', () => {
    const data = {};
    beforeAll((done) => {
      Request.del('http://localhost:3000/api/v1/flag/gifs/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /flag/articles/:id/comments/:comment_id', () => {
    const data = {};
    beforeAll((done) => {
      Request.del('http://localhost:3000/api/v1/flag/articles/1/comments/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });

  describe('DELETE /flag/gifs/:id/comments/:comment_id', () => {
    const data = {};
    beforeAll((done) => {
      Request.del('http://localhost:3000/api/v1/flag/gifs/1/comments/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.status).toBe('success');
    });
  });
});
