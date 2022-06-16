import { BaseException } from "./BaseException";

export class UserExistsException extends BaseException {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UserExistsException.prototype);
  }

  responseCode(): number {
    return 406;  
  }
}