import {Model, model, property} from '@loopback/repository';

@model()
export class Inventory extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id?: string;

  constructor(data?: Partial<Inventory>) {
    super(data);
  }
}

export interface InventoryRelations {
  // describe navigational properties here
}

export type InventoryWithRelations = Inventory & InventoryRelations;
