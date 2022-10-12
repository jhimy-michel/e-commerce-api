import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import jwt from 'jsonwebtoken';
import {AuthProblemLoginIncorrect, AuthProblemPleaseLogin, InvalidAuthToken} from './constants/auth.errors';
import {TokenServiceBindings} from '../auth/components/keys';
import {CustomProfile} from '../models/auth/user-profile.model';
import {UserRepository} from '../repositories';

export type LoginTokenResponse = {
  token: string;
};

export class JwtService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET) // injecting Token secret
    private jwtSecret: string,
    /* @inject(TokenServiceBindings.TOKEN_REFRESH_SECRET) // injecting refresh token secret
    private jwtRefreshSecret: string, */
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN) // injecting refresh token secret
    private expirationToken: string,
    @repository(UserRepository)
    private userRepository: UserRepository
  ) {}

  /*
   * Add service methods here
   */
  // generates a new token
  async generateToken(userProfile: CustomProfile): Promise<LoginTokenResponse> {
    if (!userProfile) {
      throw new AuthProblemLoginIncorrect();
    }

    const userInfoForToken = {
      user: {
        _id: userProfile._id
      }
    };

    // Generate a JSON Web Token
    // We generate a JWT token on the API service so that the API can be used standalone without the UI-service.

    try {
      const token = jwt.sign(userInfoForToken, this.jwtSecret, {
        expiresIn: this.expirationToken
      }) as string;

      return {token};
    } catch (error) {
      console.error(error);
      throw new AuthProblemPleaseLogin();
    }
  }

  /**
   * Verify access token
   * @param token
   * @returns
   */
  verifyToken(token: string): CustomProfile {
    if (!token) {
      throw new AuthProblemPleaseLogin();
    }

    // Custom Profile is an extension for the User model
    // but it only has _id, organization and userRoles
    let userProfile: CustomProfile;

    try {
      const secret = this.jwtSecret;
      // decode user profile from token
      const decodedToken = jwt.verify(token, secret) as {user: CustomProfile};

      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      userProfile = decodedToken.user;
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
      throw new InvalidAuthToken(err.message);
    }
    return userProfile;
  }
}
