class UNAUTHORIZED_ERROR extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 401;
  }
}

module.exports = { UNAUTHORIZED_ERROR };
