const errorCode = require('./status-codes/errors-codes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCode.ERROR_CODE_AUTHORIZATION;
  }
}

module.exports = UnauthorizedError;
