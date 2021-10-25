const errorCode = require('./status-codes/errors-codes');

class ConflictingRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = errorCode.ERROR_CODE_CONFLICTING_REQUEST;
  }
}

module.exports = ConflictingRequestErr;
