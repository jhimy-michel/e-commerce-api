import {Entity, model, property} from '@loopback/repository';

@model()
export class Products extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id?: string;

  @property({
    type: 'string',
    required: true
  })
  name: string;

  @property({
    type: 'string',
    required: true
  })
  description: string;

  @property({
    type: 'number',
    required: true
  })
  price: string;

  @property({
    type: 'number',
    required: true
  })
  amountAvailableInStock: string;

  @property({
    type: 'string',
    id: true,
    mongodb: {
      dataType: 'ObjectId'
    }
  })
  discountId?: string;

  @property({
    type: 'string',
    id: true,
    required: true,
    mongodb: {
      dataType: 'ObjectId'
    }
  })
  categoryId: string;

  @property({
    type: 'date',
    default: new Date()
  })
  createdOn?: string;

  @property({
    type: 'date',
    default: new Date()
  })
  updatedOn?: string;

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
