import {AuthorizationContext, AuthorizationDecision, AuthorizationMetadata, Authorizer} from '@loopback/authorization';
import {Provider, ValueOrPromise} from '@loopback/core';
import {CustomProfile} from '../../models/auth/user-profile.model';

/**
 * Authorizer class implementation
 * https://loopback.io/doc/en/lb4/Loopback-component-authorization.html
 */
export default class UserAuthorizationProvider implements Provider<Authorizer> {
  value(): ValueOrPromise<Authorizer<AuthorizationMetadata>> {
    throw new Error('Method not implemented.');
  }

  async authorize(context: AuthorizationContext, metadata: AuthorizationMetadata) {
    // TODO: Add authorization
  }
}
