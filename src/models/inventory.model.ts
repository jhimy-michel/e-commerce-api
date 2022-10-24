import {Entity, model, property} from '@loopback/repository';

@model()
export class Inventory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
    id: true,
    mongodb: {
      dataType: 'ObjectId'
    }
  })
  productId: string;

  constructor(data?: Partial<Inventory>) {
    super(data);
  }
}

export interface InventoryRelations {
  // describe navigational properties here
}

export type InventoryWithRelations = Inventory & InventoryRelations;
