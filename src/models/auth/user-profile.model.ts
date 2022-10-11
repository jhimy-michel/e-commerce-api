import {Entity, model, property} from '@loopback/repository';
import {securityId, UserProfile} from '@loopback/security';

@model()
export class CustomProfile extends Entity implements UserProfile {
  [securityId]: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {
      dataType: 'ObjectId'
    }
  })
  _id: string;

  @property({
    type: 'number'
  })
  roleLevel?: string;

  constructor(data?: Partial<CustomProfile>) {
    super(data);
  }
}
