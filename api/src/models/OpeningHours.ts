import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('openingHours')
export default class OpeningHours {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: string;

  @Column()
  openMorningTime: string;

  @Column()
  closeMorningTime: string;

  @Column()
  openAfternoonTime: string;

  @Column()
  closeAfternoonTime: string;
}
