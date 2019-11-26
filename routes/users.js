const { router } = require('../router');
const pool = require('../elephantsql');
const tokenOrigin = require('../token/token');

let message;
const status = 'success';
const adminState = [true, false];

router.get('/', (req, resp) => {
  resp.json({
    info: 'Node.js, Express and Postgres API',
  });
});

router.get('/auth/get-users', (req, resp) => {
  message = 'view users';
  resp.json({ message });
});

//  admin can create an employee user account
router.post('/auth/create-user', tokenOrigin.verifyToken, (req, resp) => {
  tokenOrigin.jwt.verify(req.token, tokenOrigin.tokenKeys.keyPrivate, (err, authData) => {
    if (err) { resp.status(403); }
    if (authData.admin === adminState[0]) {
      message = 'User account successfully created';
      const {
        firstname, lastname, email, password, gender, jobrole, department, address, admin,
      } = req.body;
      const salt = tokenOrigin.bcrypt.genSaltSync(10);
      const token = tokenOrigin.jwt.sign({ email, password, admin }, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
      const hash = tokenOrigin.bcrypt.hashSync(password, salt);

      pool.query('INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address, token, admin) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;',
        [firstname, lastname, email, hash, gender, jobrole, department, address, token, adminState[1]],
        (error, res) => {
          if (error) { throw error; }
          resp.status(201).send({
            status,
            data: { message, token: res.rows[0].token, userId: res.rows[0].user_id },
          });
        });
    } else resp.json({ info: 'Unauthorized Admin Access!' });
  });
});

//  admin and employees can sign in
router.post('/auth/signin', (req, resp) => {
  const { email, password } = req.body;

  pool.query('SELECT user_id, email, password, admin from users WHERE email=$1', [email], (err, res) => {
    if (err) { throw err; }
    if (res.rows.length !== 0) {
      const passwordState = tokenOrigin.bcrypt.compareSync(password, res.rows[0].password);
      if (passwordState === true) {
        const token = tokenOrigin.jwt.sign({ email, password, admin: res.rows[0].admin }, tokenOrigin.tokenKeys.keyPrivate, { expiresIn: tokenOrigin.exp });
        resp.status(201).send({
          status,
          data: { token, userId: res.rows[0].user_id },
        });
      } else resp.json({ info: 'Incorrect password' });
    } else resp.json({ info: 'email not recognised' });
  });
});

module.exports = router;
