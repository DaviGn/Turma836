import { Repository } from 'typeorm';
import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';

export default class ListUsersUseCase {
  private _repository: Repository<User>;

  constructor() {
    this._repository = UsersRepository;
  }

  public async execute(): Promise<User[]> {
    return await this._repository.find();
  }
}
