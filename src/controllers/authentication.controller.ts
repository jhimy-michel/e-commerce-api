import {Credentials} from '@loopback/authentication-jwt';
import {inject, service} from '@loopback/core';
import {post, requestBody, Response, RestBindings} from '@loopback/rest';
import {AuthService, JwtService} from '../auth';
import {LOGIN_FAILURE, LOGIN_REQUEST_BODY, LOGIN_SUCCESS} from './responses/login';

export type LoginTokenResponse = {
  token: string;
};

export class AuthenticationController {
  constructor(
    @service(JwtService)
    public jwtService: JwtService,
    @service(AuthService)
    public userService: AuthService,
    @inject(RestBindings.Http.RESPONSE) private response: Response
  ) {}

  @post('/auth/login', {
    description: `Response codes: \n
    200: Indicates that the request has succeeded. \n
    401: Indicates that the credentials provided are wrong. \n`,
    responses: {
      '200': LOGIN_SUCCESS,
      '401': LOGIN_FAILURE
    }
  })
  async login(
    @requestBody(LOGIN_REQUEST_BODY)
    credentials: Credentials
  ): Promise<LoginTokenResponse> {
    const user = await this.userService.verifyCredentials(credentials);

    const profileUser = await this.userService.convertToUserProfile(user);
    const tokenData = await this.jwtService.generateToken(profileUser);

    return tokenData;
  }
}
