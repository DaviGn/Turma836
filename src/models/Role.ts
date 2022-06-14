import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity('roles')
export default class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    nullable: false,
  })
  name: string;

  @OneToMany(() => User, (role) => role.role)
  users: User[];
}
