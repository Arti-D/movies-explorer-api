const errorCode = require('./status-codes/errors-codes');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCode.ERROR_CODE_FORBIDDEN;
  }
}

module.exports = ForbiddenErr;
