import { Repository } from 'typeorm';
import FieldError from '../../dtos/fieldError';
import UserDto from '../../dtos/userDto';
import FieldException from '../../exceptions/fieldExceptions';
import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';
import { validateUpdateUser } from '../../validations/user';

export default class UpdateUserUseCase {
    private _repository: Repository<User>;

    constructor() {
        this._repository = UsersRepository;
    }

    public async execute({
        id,
        name,
        email,
        roleId,
    }: Omit<UserDto, 'password'>): Promise<User | null> {
        const errors: FieldError[] = await validateUpdateUser(
            {
                id,
                name,
                email,
                roleId,
            },
            this._repository
        );

        if (errors.length > 0) {
            throw new FieldException(errors);
        }

        const user = await this._repository.findOneBy({
            id,
        });

        if (!user) {
            return null;
        }

        user.name = name;
        user.email = email;
        user.roleid = roleId;

        await this._repository.save(user);
        return user;
    }
}
