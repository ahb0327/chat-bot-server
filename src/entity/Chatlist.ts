import { Column, Entity } from 'typeorm';

@Entity('chatlist', { schema: 'chatbot' })
export class Chatlist {
  @Column('varchar', { name: 'id', length: 250 })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 64 })
  name: string | null;

  @Column('text', { name: 'message', nullable: true })
  message: string | null;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;
}
