import { Repository } from 'typeorm';
import FieldError from '../../dtos/fieldError';
import UserDto from '../../dtos/userDto';
import FieldException from '../../exceptions/fieldExceptions';
import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';
import { emailPattern } from '../../utils/regex';

export default class CreateUserUseCase {
  private _repository: Repository<User>;

  constructor() {
    this._repository = UsersRepository;
  }

  public async execute({
    name,
    email,
    password,
    roleId,
  }: Omit<UserDto, 'id'>): Promise<User | null> {
    const errors: FieldError[] = [];

    if (!name) {
      errors.push({
        field: 'name',
        message: 'Name is required!',
      });
    }

    if (!email) {
      errors.push({
        field: 'email',
        message: 'E-mail is required!',
      });
    }

    if (!emailPattern.test(email)) {
      errors.push({
        field: 'email',
        message: 'E-mail is invalid!',
      });
    }

    const countUsersByEmail = await this._repository.count({
      where: {
        email,
      },
    });

    if (countUsersByEmail) {
      errors.push({
        field: 'email',
        message: 'E-mail is already in use!',
      });
    }

    if (!password) {
      errors.push({
        field: 'password',
        message: 'Password is required!',
      });
    }

    if (errors.length > 0) {
      throw new FieldException(errors);
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.roleid = roleId;

    await this._repository.save(user);
    return user;
  }
}
