const Request = require('request');

describe('Server', () => {
  let server;
  beforeAll(() => {
    server = require('../index');
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
  });

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
      expect(data.body.message).toBe('User account successfully created');
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
      expect(data.body.message).toBe('successfully signed in');
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
      expect(data.body.message).toBe('Gif image successfully posted');
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
      expect(data.body.message).toBe('Article successfully posted');
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
      expect(data.body.message).toBe('Article successfully updated');
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
      expect(data.body.message).toBe('Article successfully deleted');
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
      expect(data.body.message).toBe('gif post successfully deleted');
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
      expect(data.body.message).toBe('Comment successfully created');
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
      expect(data.body.message).toBe('Comment successfully created');
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
      expect(data.body.message).toBe('All feed');
    });
  });

  describe('GET /articles/:articleId', () => {
    const data = {};
    beforeAll((done) => {
      Request.get('http://localhost:3000/api/v1/articles/1', (error, response, body) => {
        data.status = response.statusCode;
        data.body = JSON.parse(body);
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.message).toBe('view a specific article');
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
      expect(data.body.message).toBe('view a specific gif');
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
      expect(data.body.message).toBe('Article flagged as inappropriate');
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
      expect(data.body.message).toBe('Comment flagged as inappropriate');
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
      expect(data.body.message).toBe('Gif flagged as inappropriate');
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
      expect(data.body.message).toBe('Comment flagged as inappropriate');
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
      expect(data.body.message).toBe('flagged article successfully deleted');
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
      expect(data.body.message).toBe('flagged comment successfully deleted');
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
      expect(data.body.message).toBe('flagged gif successfully deleted');
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
      expect(data.body.message).toBe('flagged comment successfully deleted');
    });
  });
});
