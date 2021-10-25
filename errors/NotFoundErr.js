const errorCode = require('./status-codes/errors-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCode.ERROR_CODE_NOT_FOUND;
  }
}

module.exports = NotFoundError;
