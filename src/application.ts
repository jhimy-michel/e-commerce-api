import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent} from './auth/components/jwt-authentication-component';
import {SECURITY_SCHEME_SPEC} from './auth/components/security.spec';

export {ApplicationConfig};

export class ECommerceApiApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer'
    });
    this.addSecuritySpec('Domain API');

    this.component(RestExplorerComponent);

    // Mount authentication system
    this.component(AuthenticationComponent);

    // Mount JWT component
    this.component(JWTAuthenticationComponent);

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;

    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      }
    };
  }

  addSecuritySpec(apiName: string): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: apiName,
        version: require('../package.json').version
      },
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      security: [
        {
          jwt: []
        }
      ],
      servers: [{url: '/'}]
    });
  }
}
