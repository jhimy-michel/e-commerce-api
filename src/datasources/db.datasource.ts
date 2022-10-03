import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const dbUser = 'jmichel';
const dbPassword = 'aYgPvjIrIyTTQEBm';
const dataBase = 'e-commerce';

const config = {
  name: 'mongo',
  connector: 'mongodb',
  url: `mongodb+srv://jmchel:aYgPvjIrIyTTQEBm@jmichel.20qdtdc.mongodb.net/e-commerce?retryWrites=true&w=majority`,
  host: '',
  port: 0,
  user: '',
  password: '',
  database: 'e-commerce',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}
