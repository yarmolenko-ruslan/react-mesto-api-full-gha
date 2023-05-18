const { BAD_REQUEST_ERROR } = require('../errors/badRequestError');
const { CONFLICT_ERROR } = require('../errors/conflictError');

const errorMessage = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return next(new BAD_REQUEST_ERROR('Неверный запрос или данные'));
  }

  if (err.name === 'ValidationError') {
    return next(new BAD_REQUEST_ERROR('Неверный запрос или данные'));
  }

  if (err.code === 11000) {
    return next(new CONFLICT_ERROR('Пользователь с таким email уже существует'));
  }

  return next(err);
};

module.exports = { errorMessage };
