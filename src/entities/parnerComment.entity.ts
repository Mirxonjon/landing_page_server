import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity()
  export class PartnerCommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable:true
    })
    image_link: string;

    @Column({
        type: 'character varying',
        nullable:true
      })
    camment: string;
  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;

  }
  