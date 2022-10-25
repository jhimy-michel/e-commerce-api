import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, patch, put, del, requestBody} from '@loopback/rest';
import {ShoppingCart} from '../models';
import {ShoppingCartRepository} from '../repositories';

export class ShoppingCartController {
  constructor(
    @repository(ShoppingCartRepository)
    public shoppingCartRepository: ShoppingCartRepository
  ) {}

  @post('/shopping-carts', {
    responses: {
      '200': {
        description: 'ShoppingCart model instance',
        content: {'application/json': {schema: getModelSchemaRef(ShoppingCart)}}
      }
    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCart, {
            title: 'NewShoppingCart',
            exclude: ['_id']
          })
        }
      }
    })
    shoppingCart: Omit<ShoppingCart, '_id'>
  ): Promise<ShoppingCart> {
    return this.shoppingCartRepository.create(shoppingCart);
  }

  @get('/shopping-carts/count', {
    responses: {
      '200': {
        description: 'ShoppingCart model count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async count(@param.where(ShoppingCart) where?: Where<ShoppingCart>): Promise<Count> {
    return this.shoppingCartRepository.count(where);
  }

  @get('/shopping-carts', {
    responses: {
      '200': {
        description: 'Array of ShoppingCart model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ShoppingCart, {includeRelations: true})
            }
          }
        }
      }
    }
  })
  async find(@param.filter(ShoppingCart) filter?: Filter<ShoppingCart>): Promise<ShoppingCart[]> {
    return this.shoppingCartRepository.find(filter);
  }

  @patch('/shopping-carts', {
    responses: {
      '200': {
        description: 'ShoppingCart PATCH success count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCart, {partial: true})
        }
      }
    })
    shoppingCart: ShoppingCart,
    @param.where(ShoppingCart) where?: Where<ShoppingCart>
  ): Promise<Count> {
    return this.shoppingCartRepository.updateAll(shoppingCart, where);
  }

  @get('/shopping-carts/{id}', {
    responses: {
      '200': {
        description: 'ShoppingCart model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ShoppingCart, {includeRelations: true})
          }
        }
      }
    }
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ShoppingCart, {exclude: 'where'}) filter?: FilterExcludingWhere<ShoppingCart>
  ): Promise<ShoppingCart> {
    return this.shoppingCartRepository.findById(id, filter);
  }

  @patch('/shopping-carts/{id}', {
    responses: {
      '204': {
        description: 'ShoppingCart PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ShoppingCart, {partial: true})
        }
      }
    })
    shoppingCart: ShoppingCart
  ): Promise<void> {
    await this.shoppingCartRepository.updateById(id, shoppingCart);
  }

  @put('/shopping-carts/{id}', {
    responses: {
      '204': {
        description: 'ShoppingCart PUT success'
      }
    }
  })
  async replaceById(@param.path.string('id') id: string, @requestBody() shoppingCart: ShoppingCart): Promise<void> {
    await this.shoppingCartRepository.replaceById(id, shoppingCart);
  }

  @del('/shopping-carts/{id}', {
    responses: {
      '204': {
        description: 'ShoppingCart DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.shoppingCartRepository.deleteById(id);
  }
}
