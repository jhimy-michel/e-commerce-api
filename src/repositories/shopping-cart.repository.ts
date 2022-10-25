import {DefaultCrudRepository} from '@loopback/repository';
import {ShoppingCart, ShoppingCartRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ShoppingCartRepository extends DefaultCrudRepository<
  ShoppingCart,
  typeof ShoppingCart.prototype._id,
  ShoppingCartRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(ShoppingCart, dataSource);
  }
}
