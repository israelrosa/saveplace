import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Queue from './Queue';
import User from './User';

@Entity('queueClients')
export default class QueueClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  status: string;

  @Column()
  queueId: string;

  @Column()
  userId: string;

  @Column()
  attendedOn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Queue, queue => queue.clients)
  @JoinColumn({ name: 'queueId' })
  queue: Queue;

  @ManyToOne(() => User, user => user.queues)
  @JoinColumn({ name: 'userId' })
  user: User;
}
