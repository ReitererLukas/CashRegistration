import { BaseException } from "./BaseException";

export class NegativeAmountException extends BaseException {
  constructor() {
    super("Amount has to be positive");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NegativeAmountException.prototype);
  }

  responseCode(): number {
    return 400;  
  }
}