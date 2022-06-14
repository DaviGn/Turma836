import { Not, Repository } from 'typeorm';
import FieldError from '../../dtos/fieldError';
import UserDto from '../../dtos/userDto';
import FieldException from '../../exceptions/fieldExceptions';
import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';
import { emailPattern } from '../../utils/regex';

export default class UpdateUserUseCase {
  private _repository: Repository<User>;

  constructor() {
    this._repository = UsersRepository;
  }

  public async execute({
    id,
    name,
    email,
    password,
  }: UserDto): Promise<User | null> {
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
        id: Not(id),
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

    const user = await this._repository.findOneBy({
      id,
    });

    if (!user) return null;

    user.name = name;
    user.email = email;
    user.password = password;

    await this._repository.save(user);
    return user;
  }
}
