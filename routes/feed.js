const { router } = require('../router');
const pool = require('../elephantsql');
const tokenOrigin = require('../token/token');

const status = 'success';

//  employees can view all articles or gifs, showing the most recently posted articles or gifs first
router.get('/feed', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (errAuth) => {
    if (errAuth) { throw errAuth; }
    pool.query('(SELECT * FROM articles UNION SELECT * FROM gifs) ORDER BY created_on DESC;',
      (error, res) => {
        if (error) { throw error; }
        resp.status(200).send({ status, data: res.rows });
      });
  });
});

module.exports = router;
