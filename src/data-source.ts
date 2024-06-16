import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Action } from './entity/EntityAction'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Action],
  migrations: [],
  subscribers: [],
})
