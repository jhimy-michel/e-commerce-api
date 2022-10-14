import {AuthenticationComponent} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import {join} from 'path';
import {JWTAuthenticationComponent} from './auth/components/jwt-authentication-component';
import {SECURITY_SCHEME_SPEC} from './auth/components/security.spec';
import {MyAuthenticationSequence} from './sequence';

export {ApplicationConfig};

export class EcommerceServiceApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up default home page
    this.static('/', join(__dirname, '../public/'));
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer'
    });

    this.addSecuritySpec('Ecommerce API');
    // Mount API REST component
    // disable /explorer
    this.component(RestExplorerComponent);

    this.mountComponents();

    // Set up the custom sequence
    this.sequence(MyAuthenticationSequence);

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

  mountComponents(): void {
    // Mount authentication system
    this.component(AuthenticationComponent);

    // Mount JWT component
    this.component(JWTAuthenticationComponent);
  }
}
