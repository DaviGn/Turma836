import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import FieldError from '../../dtos/fieldError';
import UserDto from '../../dtos/userDto';
import FieldException from '../../exceptions/fieldExceptions';
import User from '../../models/User';
import UsersRepository from '../../repositories/usersRepository';
import { validateCreateUser } from '../../validations/user';

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
        const errors: FieldError[] = await validateCreateUser(
            {
                name,
                email,
                password,
                roleId,
            },
            this._repository
        );

        if (errors.length > 0) {
            throw new FieldException(errors);
        }

        const encryptedPassword = await hash(password, 8);

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = encryptedPassword;
        user.roleid = roleId;

        await this._repository.save(user);
        return user;
    }
}
