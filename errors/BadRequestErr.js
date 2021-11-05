const errorCode = require('./status-codes/errors-codes');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCode.ERROR_CODE_VALIDATION;
  }
}

module.exports = BadRequestErr;
