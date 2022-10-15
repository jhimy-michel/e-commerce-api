/**
 * Login response and request objects
 */

export const LOGIN_SUCCESS: object = {
  description: 'Login success response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'LoginSuccess',
        properties: {
          token: {
            type: 'string'
          }
        }
      }
    }
  }
};

export const LOGIN_FAILURE: object = {
  description: 'Login failure response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'LoginFailure',
        properties: {
          error: {
            type: 'object',
            properties: {
              statusCode: {type: 'number'},
              name: {type: 'string'},
              message: {type: 'string'}
            }
          }
        }
      }
    }
  }
};

export const LOGIN_REQUEST_BODY: object = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email'
          },
          password: {
            type: 'string',
            minLength: 6
          }
        }
      }
    }
  }
};

export const REFRESH_TOKEN_SUCCESS: object = {
  description: 'Refresh token success response',
  content: {
    'application/json': {
      schema: {
        title: 'RefreshTokenSuccess',
        type: 'object',
        properties: {token: {type: 'string'}}
      }
    }
  }
};

export const REFRESH_TOKEN_FAILURE: object = {
  description: 'Refresh token failure',
  content: {
    'application/json': {
      schema: {
        title: 'RefreshTokenFailure',
        type: 'object',
        properties: {message: {type: 'string'}}
      }
    }
  }
};

export type LoginResponseType = {
  token: string;
};
