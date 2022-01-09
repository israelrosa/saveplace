import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Queue from './Queue';

@Entity('tags')
export default class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Queue, queue => queue.tag)
  queues: Queue[];
}
