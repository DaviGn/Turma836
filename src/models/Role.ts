import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    nullable: false,
  })
  name: string;
}
