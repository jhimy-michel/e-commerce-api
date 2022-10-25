import {Entity, model, property} from '@loopback/repository';

@model()
export class OrderHistory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
    id: true,
    mongodb: {
      dataType: 'ObjectId'
    }
  })
  productId: string;

  @property({
    type: 'number',
    required: true
  })
  amount: number;

  @property({
    type: 'string',
    required: true
  })
  state: string;

  @property({
    type: 'string',
    required: true
  })
  notes: string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  timeStamp?: string;

  constructor(data?: Partial<OrderHistory>) {
    super(data);
  }
}

export interface OrderHistoryRelations {
  // describe navigational properties here
}

export type OrderHistoryWithRelations = OrderHistory & OrderHistoryRelations;
