const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'thisisasecret', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
