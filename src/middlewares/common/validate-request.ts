import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator"; //used to serialize the errors
import { RequestValidationError } from "../../errors"; // to serialize and send multiple validation errors

export const validateRequest = (
  req: Request, //normal request object
  res: Response, //normal response object
  next: NextFunction
) => {
  const errors = validationResult(req); //getting the errors based the validation given in the routes

  if (!errors.isEmpty()) {
    //if errors -  It will be serialized and sent along with the status code specified in RequestValidationError.ts file  - which is 422
    throw new RequestValidationError(errors.array());
  }
  next(); // no errors - next middleware will be called
};
