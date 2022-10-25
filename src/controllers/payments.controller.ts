import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, patch, put, del, requestBody} from '@loopback/rest';
import {Payment} from '../models';
import {PaymentRepository} from '../repositories';

export class PaymentsController {
  constructor(
    @repository(PaymentRepository)
    public paymentRepository: PaymentRepository
  ) {}

  @authenticate('jwt')
  @post('/payments', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Payment)}}
      }
    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {
            title: 'NewPayment',
            exclude: ['_id']
          })
        }
      }
    })
    payment: Omit<Payment, '_id'>
  ): Promise<Payment> {
    return this.paymentRepository.create(payment);
  }

  @authenticate('jwt')
  @get('/payments/count', {
    responses: {
      '200': {
        description: 'Payment model count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async count(@param.where(Payment) where?: Where<Payment>): Promise<Count> {
    return this.paymentRepository.count(where);
  }

  @authenticate('jwt')
  @get('/payments', {
    responses: {
      '200': {
        description: 'Array of Payment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Payment, {includeRelations: true})
            }
          }
        }
      }
    }
  })
  async find(@param.filter(Payment) filter?: Filter<Payment>): Promise<Payment[]> {
    return this.paymentRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/payments', {
    responses: {
      '200': {
        description: 'Payment PATCH success count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true})
        }
      }
    })
    payment: Payment,
    @param.where(Payment) where?: Where<Payment>
  ): Promise<Count> {
    return this.paymentRepository.updateAll(payment, where);
  }

  @authenticate('jwt')
  @get('/payments/{id}', {
    responses: {
      '200': {
        description: 'Payment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Payment, {includeRelations: true})
          }
        }
      }
    }
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Payment, {exclude: 'where'}) filter?: FilterExcludingWhere<Payment>
  ): Promise<Payment> {
    return this.paymentRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/payments/{id}', {
    responses: {
      '204': {
        description: 'Payment PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Payment, {partial: true})
        }
      }
    })
    payment: Payment
  ): Promise<void> {
    await this.paymentRepository.updateById(id, payment);
  }

  @put('/payments/{id}', {
    responses: {
      '204': {
        description: 'Payment PUT success'
      }
    }
  })
  async replaceById(@param.path.string('id') id: string, @requestBody() payment: Payment): Promise<void> {
    await this.paymentRepository.replaceById(id, payment);
  }

  @authenticate('jwt')
  @del('/payments/{id}', {
    responses: {
      '204': {
        description: 'Payment DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paymentRepository.deleteById(id);
  }
}
