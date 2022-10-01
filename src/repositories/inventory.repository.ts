import {DefaultCrudRepository} from '@loopback/repository';
import {Inventory, InventoryRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class InventoryRepository extends DefaultCrudRepository<
  Inventory,
  typeof Inventory.prototype._id,
  InventoryRelations
> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Inventory, dataSource);
  }
}
