import {Entity, model, property} from '@loopback/repository';

@model()
export class Products extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id?: string;

  // name
  // description
  // cost
  // inventoryId
  // discountId
  // categoryId
  // createdOn
  // updatedOn

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
