import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity()
  export class ServiseEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({
        type: 'character varying',
        nullable:true
      })
    title: string;

    @Column({
      type: 'character varying',
      nullable:true
    })
    title_ru: string;

  @Column({
    type: 'character varying',
    nullable:true
  })
    title_en: string;

    @Column({
      type: 'character varying',
      nullable:true
    })
    image_link: string;

  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  

  }