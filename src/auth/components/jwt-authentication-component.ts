import {registerAuthenticationStrategy} from '@loopback/authentication';
import {Application, Binding, Component, CoreBindings, inject} from '@loopback/core';
import {AuthService} from '../auth.service';
import {JwtService} from '../jwt.service';
import {JWTAuthenticationStrategy} from './jwt.strategy';
import {AuthServiceBindings, TokenServiceBindings, TokenServiceConstants} from './keys';
/**
 * JWTAuthentication component
 * Binds constants values used for JWT
 * Binds JWT service into this component
 * Binds Auth service into this component
 * Register a custom auth strategy
 * https://loopback.io/doc/en/lb4/Component.html
 */
export class JWTAuthenticationComponent implements Component {
  bindings: Binding[] = [
    Binding.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE),
    Binding.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE),
    Binding.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JwtService),
    Binding.bind(AuthServiceBindings.AUTH_SERVICE).toClass(AuthService)
  ];

  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
    registerAuthenticationStrategy(app, JWTAuthenticationStrategy);
  }
}
