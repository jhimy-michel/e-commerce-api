import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {post, param, get, getModelSchemaRef, patch, put, del, requestBody} from '@loopback/rest';
import {Inventory} from '../models';
import {InventoryRepository} from '../repositories';

export class InventoryController {
  constructor(
    @repository(InventoryRepository)
    public inventoryRepository: InventoryRepository
  ) {}

  @authenticate('jwt')
  @post('/inventories', {
    responses: {
      '200': {
        description: 'Inventory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventory)}}
      }
    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventory, {
            title: 'NewInventory',
            exclude: ['_id']
          })
        }
      }
    })
    inventory: Omit<Inventory, '_id'>
  ): Promise<Inventory> {
    return this.inventoryRepository.create(inventory);
  }

  @authenticate('jwt')
  @get('/inventories/count', {
    responses: {
      '200': {
        description: 'Inventory model count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async count(@param.where(Inventory) where?: Where<Inventory>): Promise<Count> {
    return this.inventoryRepository.count(where);
  }

  @authenticate('jwt')
  @get('/inventories', {
    responses: {
      '200': {
        description: 'Array of Inventory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Inventory, {includeRelations: true})
            }
          }
        }
      }
    }
  })
  async find(@param.filter(Inventory) filter?: Filter<Inventory>): Promise<Inventory[]> {
    return this.inventoryRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/inventories', {
    responses: {
      '200': {
        description: 'Inventory PATCH success count',
        content: {'application/json': {schema: CountSchema}}
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventory, {partial: true})
        }
      }
    })
    inventory: Inventory,
    @param.where(Inventory) where?: Where<Inventory>
  ): Promise<Count> {
    return this.inventoryRepository.updateAll(inventory, where);
  }

  @authenticate('jwt')
  @get('/inventories/{id}', {
    responses: {
      '200': {
        description: 'Inventory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inventory, {includeRelations: true})
          }
        }
      }
    }
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Inventory, {exclude: 'where'}) filter?: FilterExcludingWhere<Inventory>
  ): Promise<Inventory> {
    return this.inventoryRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/inventories/{id}', {
    responses: {
      '204': {
        description: 'Inventory PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventory, {partial: true})
        }
      }
    })
    inventory: Inventory
  ): Promise<void> {
    await this.inventoryRepository.updateById(id, inventory);
  }

  @authenticate('jwt')
  @put('/inventories/{id}', {
    responses: {
      '204': {
        description: 'Inventory PUT success'
      }
    }
  })
  async replaceById(@param.path.string('id') id: string, @requestBody() inventory: Inventory): Promise<void> {
    await this.inventoryRepository.replaceById(id, inventory);
  }

  @authenticate('jwt')
  @del('/inventories/{id}', {
    responses: {
      '204': {
        description: 'Inventory DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inventoryRepository.deleteById(id);
  }
}
