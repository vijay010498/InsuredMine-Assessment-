import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 422;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    // for every validation the errors will be displayed
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
