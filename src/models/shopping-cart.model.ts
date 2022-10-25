import {Entity, model, property} from '@loopback/repository';

@model()
export class ShoppingCart extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id?: string;

  @property({
    type: 'boolean',
    required: true
  })
  active: boolean;

  @property({
    type: 'date',
    required: true
  })
  expireOn: string;

  constructor(data?: Partial<ShoppingCart>) {
    super(data);
  }
}

export interface ShoppingCartRelations {
  // describe navigational properties here
}

export type ShoppingCartWithRelations = ShoppingCart & ShoppingCartRelations;
