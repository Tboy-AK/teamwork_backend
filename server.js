const app = require('./app');

const PORT = process.env.PORT || 3000;

//  app.listen(port, () => { console.log(`App running on port ${port}.`); });

module.exports = app.listen(PORT, () => { console.log(`App running on PORT ${PORT}.`); });
/*

https.createServer(options, app).listen(3000, () => {
  console.log('Go to...\nhttps://localhost:3000');
});
https.createServer(options, (req, res) => {
  res.end('secure!');
}).listen(443);
*/

//  redirect http port 80 to https
/*
https.createServer((req, res) => {
  res.writeHead(3000, { Location: `https://${req.headers.host}${req.url}` });
  res.end('securely directed!');
}).listen(80);

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});
*/
// server.listen(port, () => { console.log(`App running on port ${port}.`); });
