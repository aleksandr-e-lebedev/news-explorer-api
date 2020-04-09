class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = 403;
    this.isOperational = true;
  }
}

module.exports = ForbiddenError;
