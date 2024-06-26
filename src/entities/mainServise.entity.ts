import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { MainServiseCategoryEntity } from './mainServiseCategory.entity';

  @Entity()
  export class MainServiseEntity extends BaseEntity {
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
  icon_link : string;

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
  