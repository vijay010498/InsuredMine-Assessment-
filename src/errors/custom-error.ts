/*
An abstract class which can be used by other custom errors to pass the message and get displayed - can be only done using type script not in javascript
 */

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
