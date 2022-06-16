import { BaseException } from "./BaseException";

export class CredentialsInvalidException extends BaseException {

  constructor() {
    super("User not found");
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CredentialsInvalidException.prototype);
  }

  responseCode(): number {
    return 400;
  }
}
