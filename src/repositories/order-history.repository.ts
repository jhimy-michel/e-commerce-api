import {DefaultCrudRepository} from '@loopback/repository';
import {OrderHistory, OrderHistoryRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderHistoryRepository extends DefaultCrudRepository<
  OrderHistory,
  typeof OrderHistory.prototype._id,
  OrderHistoryRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(OrderHistory, dataSource);
  }
}
