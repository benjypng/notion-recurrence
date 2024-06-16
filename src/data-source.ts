import 'reflect-metadata'

import { DataSource } from 'typeorm'

import { Action } from './entity/EntityAction'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'actions.sqlite',
  synchronize: true,
  logging: false,
  entities: [Action],
  migrations: [],
  subscribers: [],
})
