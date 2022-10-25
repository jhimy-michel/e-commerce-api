import {DefaultCrudRepository} from '@loopback/repository';
import {Payment, PaymentRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PaymentRepository extends DefaultCrudRepository<Payment, typeof Payment.prototype._id, PaymentRelations> {
  constructor(@inject('datasources.mongo') dataSource: MongoDataSource) {
    super(Payment, dataSource);
  }
}
