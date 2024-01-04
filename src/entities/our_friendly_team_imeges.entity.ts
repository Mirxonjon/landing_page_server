import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity()
  export class FrendlyTeamEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable:true
    })
    our_team_image_link: string;

  
  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  

  }
  