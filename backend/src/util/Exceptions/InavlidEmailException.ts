import { BaseException } from "./BaseException";

export class InvalidEmailException extends BaseException {

  constructor() {
    super("Use your HTL Kaindorf email");
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidEmailException.prototype);
  }

  responseCode(): number {
    return 400;
  }
}
