import { AppError } from "../../../../shared/errors/AppError";


export namespace CreateUserTransferenceError {
  export class UserSenderNotFound extends AppError {
    constructor() {
      super('User sender not found', 404);
    }
  }

  export class UserReceiverNotFound extends AppError {
    constructor() {
      super("User receiver not found", 404)
    }
  }

  export class UserBalanceInsufficient extends AppError {
    constructor() {
      super("User balance insufficient", 400)
    }
  }
}
