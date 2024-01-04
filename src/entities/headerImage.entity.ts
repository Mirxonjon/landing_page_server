import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity()
  export class HeaderImageEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable:true
    })
    haeder_image_link: string;

    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  

  }
  