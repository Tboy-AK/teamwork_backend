const { router } = require('../router');
const pool = require('../elephantsql');
const tokenOrigin = require('../token/token');

let message;
const status = 'success';
const flagState = [true, false];
const adminState = [true, false];

//  flag article middleware
router.patch('/flag/articles/:id', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); }
    message = ['Article flagged as inappropriate', 'Article successfully unflagged'];
    const id = parseInt(req.params.id, 10);
    const { flag } = req.body;
    if (flag === 'true') {
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
router.patch('/flag/articles/:id/comments/:comment_id', (req, resp) => {
  message = ['Comment flagged as inappropriate', 'Comment successfully unflagged'];
  resp.json({ message: message[0] });
});

//  flag gif comment middleware
router.patch('/flag/gifs/:id/comments/:comment_id', (req, resp) => {
  message = ['Comment flagged as inappropriate', 'Comment successfully unflagged'];
  resp.json({ message: message[0] });
});

//  delete flagged article middleware
router.delete('/flag/articles/:id', (req, resp) => {
  message = 'flagged article successfully deleted';
  resp.json({ message });
});

//  delete flagged gif middleware
router.delete('/flag/gifs/:id', (req, resp) => {
  message = 'flagged gif successfully deleted';
  resp.json({ message });
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
