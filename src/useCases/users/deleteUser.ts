import UsersRepository from '../../repositories/usersRepository';

export default class DeleteUserUseCase {
  private _repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this._repository = repository;
  }

  public execute(id: string): void {
    this._repository.delete(id);
  }
}
