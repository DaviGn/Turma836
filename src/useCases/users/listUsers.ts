import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';

export default class ListUsersUseCase {
  private _repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this._repository = repository;
  }

  public execute(): User[] {
    return this._repository.list();
  }
}
