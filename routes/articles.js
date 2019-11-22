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
router.delete('/articles/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = 'Article successfully deleted';
      const id = parseInt(req.params.id, 10);

      pool.query('SELECT * FROM articles WHERE articles.id=$1 AND author_id IN (SELECT user_id FROM users WHERE email=$2);',
        [id, authData.email], (errAuth, resAuth) => {
          if (errAuth) { throw errAuth; } else if (resAuth.rows.length !== 0) {
            pool.query('DELETE FROM articles WHERE articles.id=$1 AND author_id=$2',
              [id, resAuth.rows[0].author_id], (error) => {
                if (error) { throw error; }
                resp.status(200).send({ status, data: { message } });
              });
          } else resp.send('Unauthorized access!');
        });
    }
  });
});

//  employees can view a specific article
router.get('/articles/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (errAuth) => {
    if (errAuth) { resp.status(403); } else {
      const id = parseInt(req.params.id, 10);
      pool.query('SELECT * FROM articles WHERE id=$1;', [id], (errArticle, resArticle) => {
        if (errArticle) { throw errArticle; }
        pool.query('SELECT comment_id, comment, author_id FROM article_comments WHERE article_id=$1;', [id], (errComment, resComment) => {
          if (errComment) { throw errComment; }
          resp.status(200).send({
            status,
            data: {
              id: resArticle.rows[0].id,
              createdOn: resArticle.rows[0].created_on,
              title: resArticle.rows[0].title,
              article: resArticle.rows[0].article,
              comments: resComment.rows,
            },
          });
        });
      });
    }
  });
});

//  employees can comment on other colleagues' article post
router.post('/articles/:id/comments', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = 'Comment successfully created';
      const { comment } = req.body;
      const articleID = parseInt(req.params.id, 10);
      const createdOn = new Date();

      pool.query('SELECT a.title, a.article FROM articles AS a WHERE id=$1', [articleID], (errorArticle, resArticle) => {
        if (errorArticle) { throw errorArticle; }
        const { title, article } = resArticle.rows[0];
        pool.query('SELECT user_id FROM users WHERE email=$1', [authData.email], (errorID, resID) => {
          if (errorID) { throw errorID; }
          const commentatorID = resID.rows[0].user_id;
          pool.query('INSERT INTO article_comments (created_on, article_title, article, article_id, comment, author_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [createdOn.toLocaleDateString(), title, article, articleID, comment, commentatorID],
            (error, res) => {
              if (error) { throw error; }
              resp.status(201).send({
                status,
                data: {
                  message,
                  createdOn: res.rows[0].created_on,
                  articleTitle: res.rows[0].title,
                  article: res.rows[0].article,
                  comment: res.rows[0].comment,
                },
              });
            });
        });
      });
    }
  });
});

module.exports = router;
