const bodyParser = require('body-parser');
const { app } = require('./router');

const user = require('./routes/users');
const article = require('./routes/articles');
const gif = require('./routes/gifs');
const feed = require('./routes/feed');
const flag = require('./routes/flag');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', user);
app.use('/api/v1', article);
app.use('/api/v1', gif);
app.use('/api/v1', feed);
app.use('/api/v1', flag);

module.exports = app;
