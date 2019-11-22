const { router } = require('../router');
const pool = require('../elephantsql');
const tokenOrigin = require('../token/token');

// response message
let message;
const status = 'success';

//  employee can create article
router.post('/articles', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = 'Article successfully posted';
      const { title, article } = req.body;
      const createdOn = new Date();

      pool.query('SELECT user_id from users WHERE email=$1', [authData.email], (errorID, resID) => {
        if (errorID) { throw errorID; }
        const authorID = resID.rows[0].user_id;
        pool.query('INSERT INTO articles (created_on, title, article, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
          [createdOn.toLocaleDateString(), title, article, authorID],
          (error, res) => {
            if (error) { throw error; }
            resp.status('201').send({
              status,
              data: {
                message,
                articleId: res.rows[0].id,
                createdOn: res.rows[0].created_on,
                title: res.rows[0].title,
              },
            });
          });
      });
    }
  });
});

// employees can edit their articles
router.patch('/articles/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = 'Article successfully updated';
      const id = parseInt(req.params.id, 10);
      const { title, article } = req.body;

      pool.query('SELECT * FROM articles WHERE articles.id=$1 AND author_id IN (SELECT user_id FROM users WHERE email=$2);',
        [id, authData.email], (errAuth, resAuth) => {
          if (errAuth) { throw errAuth; } else if (resAuth.rows.length !== 0) {
            pool.query('UPDATE articles SET title=$1, article=$2 WHERE id=$3 AND author_id=$4 RETURNING *',
              [title, article, id, resAuth.rows[0].author_id], (error, res) => {
                if (error) { throw error; }
                resp.status(201).send({
                  status,
                  data: {
                    message,
                    title: res.rows[0].title,
                    article: res.rows[0].article,
                  },
                });
              });
          } else resp.send('Unauthorized access!');
        });
    }
  });
});

//  employees can delete their articles
router.delete('/articles/:id', (req, resp) => {
  message = 'Article successfully deleted';
  resp.json({ message });
});

//  employees can view a specific article
router.get('/articles/:id', (req, resp) => {
  resp.json({ message: 'view a specific article' });
});

//  employees can comment on other colleagues' article post
router.post('/articles/:id/comments', (req, resp) => {
  message = 'Comment successfully created';
  resp.json({ message });
});

module.exports = router;
