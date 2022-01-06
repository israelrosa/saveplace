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
import QueueClients from './QueueClients';
import Tag from './Tag';

@Entity('queues')
export default class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  waitingTimeMinutes: number;

  @Column()
  currentCode: string;

  @Column()
  status: string;

  @Column()
  tagId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => QueueClients, queueClients => queueClients.queue, {
    onDelete: 'SET NULL',
  })
  clients: QueueClients[];

  @ManyToOne(() => Tag, tag => tag.queues)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;
}
