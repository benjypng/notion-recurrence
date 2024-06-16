import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  notion_id: string

  @CreateDateColumn()
  created_date: Date

  @Column({ unique: true })
  group_id: number

  @Column()
  dtstart: Date

  @Column()
  until: Date
}
