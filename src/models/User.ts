import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Role from './Role';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    length: 250,
    nullable: false,
  })
  password: string;

  // Chave estrangeira
  @ManyToOne(() => Role, (user) => user.users)
  role: Role;
}
