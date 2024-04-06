import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity()
  export class ApplicationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      type: 'character varying',
      nullable:true
    })
  application_Number: string;
  
    @Column({
        type: 'character varying',
        nullable:true
      })
    type_of_service: string;

    @Column({
      type: 'character varying',
      nullable:true
    })
    name: string;

    @Column({
        type: 'character varying',
        nullable:true
      })
      organization_name: string;

      @Column({
        type: 'character varying',
        nullable:true
      })
      number: string;
      
      @Column({
        type: 'character varying',
        nullable:true
      })
      comment: string;

      @Column({
        type: 'jsonb',
        nullable: true,
    })
    text: JSON;
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  
  }
  