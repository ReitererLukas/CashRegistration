import { BaseException } from "./BaseException";

export class InvalidTokenException extends BaseException {
  constructor() {
    super("Your Token expired");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidTokenException.prototype);
  }

  responseCode(): number {
    return 401;  
  }
}