import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import QueueClient from './QueueClient';
import Tag from './Tag';
import User from './User';

@Entity('queues')
export default class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int', { default: 0 })
  waitingTimeMinutes: number;

  @Column('int', { default: 0 })
  currentCode: number;

  @Column()
  status: string;

  @Column()
  tagId: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => QueueClient, queueClient => queueClient.queue)
  clients: QueueClient[];

  @ManyToOne(() => Tag, tag => tag.queues)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  @ManyToOne(() => User, user => user.queues)
  @JoinColumn({ name: 'userId' })
  user: User;
}
