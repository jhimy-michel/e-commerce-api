import {BindingKey} from '@loopback/context';
import {AuthService, JwtService} from '../index';

// Defining secrets and constants values
export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = `${process.env.TOKEN_SECRET}`;
  export const TOKEN_EXPIRES_IN_VALUE = '1d';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>('authentication.jwt.secret');
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>('authentication.jwt.expires.in.seconds');
  export const TOKEN_SERVICE = BindingKey.create<JwtService>('services.jwt.service');
}

export namespace AuthServiceBindings {
  export const AUTH_SERVICE = BindingKey.create<AuthService>('services.auth.service');
}
