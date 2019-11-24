const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const tokenKeys = {
  keyPrivate: fs.readFileSync(path.resolve(__dirname, 'rsa_1024_priv.pem')),
  keyPublic: fs.readFileSync(path.resolve(__dirname, 'rsa_1024_pub.pem')),
};

const exp = '4h';

const verifyToken = (req, resp, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    // const bearer = bearerHeader.split(' ');
    // const bearerToken = bearer[1];
    // req.token = bearerToken;
    req.token = bearerHeader;
    next();
  } else {
    resp.status(403);
  }
};

const cloudinaryCred = { cloud_name: 'tboy1ak', api_key: '669164433331693', api_secret: '4ouIsOPtaEGEGDBNRwQqexoXNm0' };

const adminLoginForm = {
  email: 'tobia807@gmail.com',
  password: 'xxxentric4321',
  admin: true,
};

module.exports = {
  jwt,
  tokenKeys,
  exp,
  verifyToken,
  bcrypt,
  cloudinaryCred,
  path,
};
