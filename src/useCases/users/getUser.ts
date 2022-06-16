import { Repository } from 'typeorm';
import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';

export default class GetUserUseCase {
    private _repository: Repository<User>;

    constructor() {
        this._repository = UsersRepository;
    }

    public async execute(id: string): Promise<User | null> {
        return await this._repository.findOneBy({ id });
    }
}
