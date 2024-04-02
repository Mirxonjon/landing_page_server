import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { MainServiseEntity } from './mainServise.entity';

  @Entity()
  export class  MainServiseCategoryEntity extends BaseEntity {
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
      
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;


  @OneToMany(() => MainServiseEntity, (mainServiseCatgeory) => mainServiseCatgeory.categoryServise)
  servises: MainServiseEntity[]

  

  }
  