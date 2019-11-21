const { router } = require('../router');
const pool = require('../elephantsql');

let message;
const status = 'success';

//  flag article middleware
router.patch('/flag/articles/:id', (req, resp) => {
  message = ['Article flagged as inappropriate', 'Article successfully unflagged'];
  resp.json({ message: message[0] });
});

//  flag gif middleware
router.patch('/flag/gifs/:id', (req, resp) => {
  message = ['Gif flagged as inappropriate', 'gif successfully unflagged'];
  resp.json({ message: message[0] });
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
