import {Entity, model, property} from '@loopback/repository';

@model()
export class Payment extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id?: string;

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
    type: 'date',
    default: () => new Date()
  })
  timeStamp?: string;

  constructor(data?: Partial<Payment>) {
    super(data);
  }
}

export interface PaymentRelations {
  // describe navigational properties here
}

export type PaymentWithRelations = Payment & PaymentRelations;
