import {DefaultCrudRepository} from '@loopback/repository';
import {Order, OrderRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderRepository extends DefaultCrudRepository<Order, typeof Order.prototype._id, OrderRelations> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Order, dataSource);
  }
}
