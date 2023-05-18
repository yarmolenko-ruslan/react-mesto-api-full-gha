const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR } = require('../errors/errors');
const { JWT_SECRET } = require('../tokenValue')

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UNAUTHORIZED_ERROR('Авторизируйтесь, пожалуйста');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UNAUTHORIZED_ERROR('Авторизируйтесь, пожалуйста');
  }

  req.user = payload;

  next();
};
