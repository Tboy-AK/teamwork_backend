const { router } = require('../router');
const pool = require('../elephantsql');

let message;
const status = 'success';

//  employee can create article
router.post('/articles', (req, resp) => {
  message = 'Article successfully posted';
  resp.json({ message });
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
