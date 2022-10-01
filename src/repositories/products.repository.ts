import {DefaultCrudRepository} from '@loopback/repository';
import {Products, ProductsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype._id,
  ProductsRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Products, dataSource);
  }
}
