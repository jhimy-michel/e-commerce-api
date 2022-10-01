import {Model, model, property} from '@loopback/repository';

@model()
export class Category extends Model {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id?: string;

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
