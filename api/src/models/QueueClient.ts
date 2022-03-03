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

// eslint-disable-next-line no-shadow
export enum QueueClientType {
  WAITING = 'waiting',
  ATTENDED = 'attended',
  EXITED = 'exited',
  CURRENT = 'current',
}

@Entity('queueClients')
export default class QueueClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: number;

  @Column({
    type: 'enum',
    enum: QueueClientType,
    default: QueueClientType.WAITING,
  })
  status: string;

  @Column()
  queueId: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  attendedOn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Queue, queue => queue.clients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'queueId' })
  queue: Queue;

  @ManyToOne(() => User, user => user.queueClients, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
}
