import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { MainServiseCategoryEntity } from './mainserviseCategory';

  @Entity()
  export class MainServiseEntity extends BaseEntity {
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

    @Column({
      type: 'character varying',
      nullable:true
    })
    type: string;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    text: JSON;
    

  @ManyToOne(() => MainServiseCategoryEntity, (servise) => servise.servises)
  categoryServise: MainServiseCategoryEntity[]
  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  

  }
  