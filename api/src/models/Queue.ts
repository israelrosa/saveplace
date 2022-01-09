import { Exclude, Expose } from 'class-transformer';
import moment from 'moment';
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
import QueueClient, { QueueClientType } from './QueueClient';
import Tag from './Tag';
import User from './User';

// eslint-disable-next-line no-shadow
export enum QueueType {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

@Entity('queues')
export default class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int', { default: 0 })
  currentCode: number;

  @Column({
    type: 'enum',
    enum: QueueType,
    default: QueueType.DISABLED,
  })
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
  @Exclude()
  clients: QueueClient[];

  @ManyToOne(() => Tag, tag => tag.queues)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;

  @ManyToOne(() => User, user => user.queues)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Expose({ name: 'nextClient' })
  nextClient() {
    let nextCode = this.currentCode + 1;
    const orderedClients = this.clients.sort((a, b) => a.code - b.code);
    const nextClient = orderedClients.find(client => {
      const isNext = client.code === nextCode;
      const isWaiting = client.status !== QueueClientType.EXITED;

      if (isNext && !isWaiting) {
        nextCode += 1;
        return false;
      }
      if (!isNext) {
        return false;
      }

      return true;
    });

    if (!nextClient) {
      return undefined;
    }

    return nextClient.id;
  }

  @Expose({ name: 'previousClient' })
  previousClient() {
    const previousCode = this.currentCode - 1;
    const previousClient = this.clients.find(
      client => client.code === previousCode,
    );

    if (!previousClient) {
      return undefined;
    }

    return previousClient.id;
  }

  @Expose({ name: 'waitingTimeMinutes' })
  waitingTimeMinutes() {
    if (this.clients.length === 0) {
      return 0;
    }
    const attendedClients = this.clients.filter(
      clients => clients.status === QueueClientType.ATTENDED,
    );

    const sortedClients = attendedClients.sort((a, b) =>
      Number(moment(b.attendedOn).diff(moment(a.attendedOn), 'millisecond')),
    );
    const FourFirstClients = sortedClients.splice(0, 4);

    const { diff } = FourFirstClients.reduce(
      (a, b, i) => {
        if (i === 0) {
          return { attendedOn: b.attendedOn, diff: a.diff };
        }
        let diffValue = a.diff;
        diffValue = moment(a.attendedOn).diff(moment(b.attendedOn), 'minutes');
        return { attendedOn: b.attendedOn, diff: diffValue };
      },
      { attendedOn: new Date(), diff: 0 },
    );

    const waitingTimeMedia = diff / (FourFirstClients.length - 1);

    return waitingTimeMedia;
  }

  @Expose({ name: 'lastGeneratedCode' })
  lastGeneratedCode() {
    if (!this.clients || this.clients.length === 0) {
      return this.currentCode;
    }
    const result = this.clients
      .sort((a, b) => {
        return a.code - b.code;
      })
      .pop();

    const lastCode = result !== undefined ? result.code : this.currentCode;

    return lastCode;
  }
}
