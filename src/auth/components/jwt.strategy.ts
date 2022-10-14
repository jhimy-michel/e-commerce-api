import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Request} from '@loopback/rest';
import jwt from 'jsonwebtoken';
import {CustomProfile} from '../../models/auth/user-profile.model';
import {JwtService} from '../jwt.service';
import {AuthProblemPleaseLogin, InvalidAuthToken} from '../constants/auth.errors';
import {TokenServiceBindings} from './keys';

/**
 * JWTAuthenticationStrategy defines the authentication
 * strategy for the application
 * in this case we are using jsonwebtoken
 * https://loopback.io/doc/en/lb4/JWT-authentication-extension.html
 */
export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  /**
   * The 'name' property is a unique identifier for the
   * authentication strategy (for example: 'basic', 'jwt', etc)
   */
  name = 'jwt';

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE) // injecting TokenService
    public tokenService: JwtService,
    @inject(TokenServiceBindings.TOKEN_SECRET) // injecting constant values
    private jwtSecret: string
  ) {}

  async authenticate(request: Request): Promise<CustomProfile | undefined> {
    const token: string = this.extractCredentials(request);

    if (!token) {
      throw new AuthProblemPleaseLogin();
    }

    const userProfile: CustomProfile = this.tokenService.verifyToken(token);
    return userProfile;
  }

  // validate the token thats is comming in the request auth header
  extractCredentials(request: Request): string {
    // checks if the auth header exists
    if (!request.headers.authorization) {
      throw new AuthProblemPleaseLogin();
    }

    const authHeaderValue = request.headers.authorization;

    // checking format header
    if (!authHeaderValue.startsWith('Bearer')) {
      throw new AuthProblemPleaseLogin();
    }

    try {
      // getting the token from the header value
      // e.g.: Authorization: Bearer <token>
      const token = authHeaderValue.slice(7, authHeaderValue.length).trimLeft();
      if (!token) {
        throw new InvalidAuthToken('No token field provided');
      }
      // verifying the token
      jwt.verify(token, this.jwtSecret);

      return token;
    } catch (err) {
      console.error(err.message);
      throw new InvalidAuthToken(err.message);
    }
  }
}
