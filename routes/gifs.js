const { router } = require('../router');
const pool = require('../elephantsql');

let message;
const status = 'success';

//  employee can create gif
router.post('/gifs', (req, resp) => {
  message = 'Gif image successfully posted';
  resp.json({ message });
});

//  employees can delete their gifs
router.delete('/gifs/:id', (req, resp) => {
  message = 'gif post successfully deleted';
  resp.json({ message });
});

//  employees can view a specific gif
router.get('/gifs/:id', (req, resp) => {
  resp.json({ message: 'view a specific gif' });
});

//  employees can comment on other colleagues' gif post
router.post('/gifs/:id/comments', (req, resp) => {
  message = 'Comment successfully created';
  resp.json({ message });
});

module.exports = router;
