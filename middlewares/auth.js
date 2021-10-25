const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'REALLY_SECRET' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedErr');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
