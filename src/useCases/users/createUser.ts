import FieldError from '../../dtos/fieldError';
import UserDto from '../../dtos/userDto';
import FieldException from '../../exceptions/fieldExceptions';
import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';
import { emailPattern } from '../../utils/regex';

export default class CreateUserUseCase {
  private _repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this._repository = repository;
  }

  public execute({ name, email, password }: Omit<UserDto, 'id'>): User {
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

    const userByEmail = this._repository.get(
      (x) => x.email.toUpperCase() === email.toUpperCase()
    );

    if (userByEmail) {
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

    const user = new User({
      name,
      email,
      password,
    });
    this._repository.add(user);
    return user;
  }
}
