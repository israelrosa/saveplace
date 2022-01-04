import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Queue from './Queue';

@Entity('queueClients')
export default class QueueClients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  status: string;

  @Column()
  queueId: string;

  @Column()
  attendedOn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Queue, queue => queue.clients)
  @JoinColumn({ name: 'queueId' })
  queue: Queue;
}
