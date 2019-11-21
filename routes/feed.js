const { router } = require('../router');
const pool = require('../elephantsql');

const status = 'success';

//  employees can view all articles or gifs, showing the most recently posted articles or gifs first
router.get('/feed', (req, resp) => {
  resp.json({ message: 'All feed' });
});

module.exports = router;
