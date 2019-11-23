const cloudinary = require('cloudinary').v2;
const { router } = require('../router');
const pool = require('../elephantsql');
const tokenOrigin = require('../token/token');

// response message
let message;
const status = 'success';

const flagState = [true, false];
const adminState = [true, false];

// cloudinary configuration
cloudinary.config(tokenOrigin.cloudinaryCred);

//  flag article middleware
router.patch('/flag/articles/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); }
    message = ['Article flagged as inappropriate', 'Article successfully unflagged'];
    const id = parseInt(req.params.id, 10);
    const { flag } = req.body;
    if (flag === JSON.stringify(flagState[0])) {
      pool.query('UPDATE articles SET flag=$1 WHERE id=$2 RETURNING *',
        [flagState[0], id], (error, res) => {
          if (error) { throw error; }
          resp.status(201).send({
            status,
            data: {
              message: message[0],
              articleID: res.rows[0].id,
            },
          });
        });
    } else if (flag === JSON.stringify(flagState[1]) && authData.admin === adminState[0]) {
      pool.query('UPDATE articles SET flag=$1 WHERE id=$2 RETURNING *',
        [flagState[1], id], (error, res) => {
          if (error) { throw error; }
          resp.status(201).send({
            status,
            data: {
              message: message[1],
              articleID: res.rows[0].id,
            },
          });
        });
    } else { resp.sendStatus(403); }
  });
});

//  flag gif middleware
router.patch('/flag/gifs/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = ['Gif flagged as inappropriate', 'gif successfully unflagged'];
      const id = parseInt(req.params.id, 10);
      const { flag } = req.body;
      if (flag === JSON.stringify(flagState[0])) {
        pool.query('UPDATE gifs SET flag=$1 WHERE id=$2 RETURNING *',
          [flagState[0], id], (error, res) => {
            if (error) { throw error; }
            resp.status(201).send({
              status,
              data: {
                message: message[0],
                gifID: res.rows[0].id,
              },
            });
          });
      } else if (flag === JSON.stringify(flagState[1]) && authData.admin === adminState[0]) {
        pool.query('UPDATE gifs SET flag=$1 WHERE id=$2 RETURNING *',
          [flagState[1], id], (error, res) => {
            if (error) { throw error; }
            resp.status(201).send({
              status,
              data: {
                message: message[1],
                gifID: res.rows[0].id,
              },
            });
          });
      } else { resp.sendStatus(403); }
    }
  });
});

//  flag article comment middleware
router.patch('/flag/articles/:id/comments/:comment_id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = ['Comment flagged as inappropriate', 'Comment successfully unflagged'];
      const id = parseInt(req.params.id, 10);
      const commentID = parseInt(req.params.comment_id, 10);
      const { flag } = req.body;

      if (flag === JSON.stringify(flagState[0])) {
        pool.query('UPDATE article_comments SET flag=$1 WHERE article_id=$2 AND comment_id=$3 RETURNING *',
          [flagState[0], id, commentID], (error, res) => {
            if (error) { throw error; }
            resp.status(201).send({
              status,
              data: {
                message: message[0],
                articleID: res.rows[0].id,
              },
            });
          });
      } else if (flag === JSON.stringify(flagState[1]) && authData.admin === adminState[0]) {
        pool.query('UPDATE article_comments SET flag=$1 WHERE article_id=$2 AND comment_id=$3 RETURNING *',
          [flagState[1], id, commentID], (error, res) => {
            if (error) { throw error; }
            resp.status(201).send({
              status,
              data: {
                message: message[1],
                articleID: res.rows[0].id,
              },
            });
          });
      } else { resp.sendStatus(403); }
    }
  });
});

//  flag gif comment middleware
router.patch('/flag/gifs/:id/comments/:comment_id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else {
      message = ['Comment flagged as inappropriate', 'Comment successfully unflagged'];
      const id = parseInt(req.params.id, 10);
      const commentID = parseInt(req.params.comment_id, 10);
      const { flag } = req.body;

      if (flag === JSON.stringify(flagState[0])) {
        pool.query('UPDATE gif_comments SET flag=$1 WHERE gif_id=$2 AND id=$3 RETURNING *',
          [flagState[0], id, commentID], (error, res) => {
            if (error) { throw error; }
            resp.status(201).send({
              status,
              data: {
                message: message[0],
                gifID: res.rows[0].id,
              },
            });
          });
      } else if (flag === JSON.stringify(flagState[1]) && authData.admin === adminState[0]) {
        pool.query('UPDATE gif_comments SET flag=$1 WHERE gif_id=$2 AND id=$3 RETURNING *',
          [flagState[1], id, commentID], (error, res) => {
            if (error) { throw error; }
            resp.status(201).send({
              status,
              data: {
                message: message[1],
                gifID: res.rows[0].id,
              },
            });
          });
      } else { resp.sendStatus(403); }
    }
  });
});

//  delete flagged article middleware
router.delete('/flag/articles/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); } else if (authData.admin === adminState[0]) {
      message = 'Article successfully deleted';
      const id = parseInt(req.params.id, 10);

      pool.query('DELETE FROM articles WHERE flag=$1 AND id=$2', [flagState[0], id], (error) => {
        if (error) { throw error; }
        resp.status(200).send({ status, data: { message } });
      });
    } else resp.send('Unauthorized Admin Access!');
  });
});

//  delete flagged gif middleware
router.delete('/flag/gifs/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (errAuth, authData) => {
    if (errAuth) { resp.status(403); } else if (authData.admin === adminState[0]) {
      message = 'Gif post successfully deleted';
      const id = parseInt(req.params.id, 10);

      pool.query('SELECT * FROM gifs WHERE gifs.flag=$1 AND gifs.id=$2;',
        [flagState[0], id], (err, res) => {
          if (err) { throw err; }
          if (res.rows.length !== 0) {
            cloudinary.uploader.destroy(res.rows[0].image_url.split('//')[1].split('/')[5].split('.')[0],
              (errUpDelete) => {
                if (errUpDelete) { throw errUpDelete; } else {
                  pool.query('DELETE FROM gifs WHERE id=$1', [res.rows[0].id], (errDelete) => {
                    if (errDelete) { throw errDelete; }
                    resp.status(200).send({ status, data: { message } });
                  });
                }
              });
          } else resp.send('Gif post is not flagged');
        });
    } else resp.send('Unauthorized Admin Access!');
  });
});

//  delete flagged article comment middleware
router.delete('/flag/articles/:id/comments/:comment_id', (req, resp) => {
  message = 'flagged comment successfully deleted';
  resp.json({ message });
});

//  delete flagged gif comment middleware
router.delete('/flag/gifs/:id/comments/:comment_id', (req, resp) => {
  message = 'flagged comment successfully deleted';
  resp.json({ message });
});

module.exports = router;
