import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
  })
  name: string;

  @Column({
    type: 'character varying',
  })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
