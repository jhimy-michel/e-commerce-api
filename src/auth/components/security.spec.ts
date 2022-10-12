import {ReferenceObject, SecuritySchemeObject} from '@loopback/openapi-v3';

/**
 * Add authorize component to UI
 */
export type SecuritySchemeObjects = {
  [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};
export const SECURITY_SCHEME_SPEC: SecuritySchemeObjects = {
  jwt: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT'
  }
};
