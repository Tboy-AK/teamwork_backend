const { router } = require('../router');
const pool = require('../elephantsql');

let message;
const status = 'success';
const token = 'token';

router.get('/', (req, resp) => {
  resp.json({
    info: 'Node.js, Express and Postgres API',
  });
});

router.get('/auth/get-users', (req, resp) => {
  message = 'view users';
  resp.json({ message });
});

/**  admin can create user  */
router.post('/auth/create-user', (req, resp) => {
  message = 'User account successfully created';
  resp.json({ message });
});

/**  admin and employee can sign in  */
router.post('/auth/signin', (req, resp) => {
  resp.json({ message: 'successfully signed in' });
});

module.exports = router;
