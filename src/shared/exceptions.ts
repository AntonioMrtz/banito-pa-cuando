export { AppError };

/**
 * Base class for application-specific errors. Extends the built-in Error class and sets the name property to the class name.
 */
class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
