import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';

export default class GetUserUseCase {
  private _repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this._repository = repository;
  }

  public execute(id: string): User | undefined {
    return this._repository.getById(id);
  }
}
