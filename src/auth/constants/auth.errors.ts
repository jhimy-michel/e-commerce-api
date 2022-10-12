import {HttpErrors} from '@loopback/rest';

/**
 * Contains generic system errors
 */
export class AuthProblemPleaseLogin extends HttpErrors.Unauthorized {
  constructor() {
    super('Authentication problem, please login.');
  }
}

export class AuthProblemInvalidCredentials extends HttpErrors.Unauthorized {
  constructor() {
    super('Invalid email or password.');
  }
}

export class AuthProblemLoginIncorrect extends HttpErrors.Unauthorized {
  constructor() {
    super('Login incorrect, please try again!');
  }
}

export class InvalidAuthToken extends HttpErrors.Unauthorized {
  constructor(msg: string) {
    super(`${msg}`);
  }
}

export class InvalidTwoFactorAuth extends HttpErrors.Forbidden {
  constructor(msg: string) {
    super(`${msg}`);
  }
}

export class BlockedAccount extends HttpErrors.Unauthorized {
  constructor() {
    super('Your user account has been blocked, please wait 1 minute before trying again.');
  }
}
