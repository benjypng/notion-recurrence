import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  notion_id: string

  @CreateDateColumn()
  created_date: Date

  @Column()
  group_id: string
}
