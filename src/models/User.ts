import { v4 } from 'uuid';
import UserDto from '../dtos/userDto';

export default class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor({ name, email, password }: Omit<UserDto, 'id'>) {
    this.id = v4();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
