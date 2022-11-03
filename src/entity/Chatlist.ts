import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chatlist', { schema: 'chatbot' })
export class Chatlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 64 })
  name: string | null;

  @Column('text', { name: 'message', nullable: true })
  message: string | null;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
