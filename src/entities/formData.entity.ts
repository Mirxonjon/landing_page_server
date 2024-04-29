import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
  })
  org_name: string;

  @Column({
    type: 'character varying',
  })
  number: string;

  @CreateDateColumn({ name: 'created_at' })
  create_data: Date;
}
