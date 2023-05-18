const { BAD_REQUEST_ERROR } = require('./badRequestError');
const { NOT_FOUND_ERROR } = require('./notFoundError');
const { UNAUTHORIZED_ERROR } = require('./unauthorizedError');
const { CONFLICT_ERROR } = require('./conflictError');
const { FORBIDDEN_ERROR } = require('./forbiddenError');

module.exports = {
  BAD_REQUEST_ERROR, NOT_FOUND_ERROR, UNAUTHORIZED_ERROR, CONFLICT_ERROR, FORBIDDEN_ERROR,
};
