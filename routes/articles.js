const { router } = require('../router');
const pool = require('../elephantsql');
const tokenOrigin = require('../token/token');

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

//  employees can edit their articles
router.patch('/articles/:id', (req, resp) => {
  message = 'Article successfully updated';
  resp.json({ message });
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
