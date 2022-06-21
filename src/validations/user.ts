import { Not, Repository } from 'typeorm';
import FieldError from '../dtos/fieldError';
import UserDto from '../dtos/userDto';
import User from '../models/User';
import { emailPattern } from '../utils/regex';

interface UserValidation {
    name: string;
    email: string;
}

function validate(user: UserValidation): FieldError[] {
    const errors: FieldError[] = [];
    if (!user.name) {
        errors.push({
            field: 'name',
            message: 'Name is required!',
        });
    }

    if (!user.email) {
        errors.push({
            field: 'email',
            message: 'E-mail is required!',
        });
    }

    if (!emailPattern.test(user.email)) {
        errors.push({
            field: 'email',
            message: 'E-mail is invalid!',
        });
    }

    return errors;
}

export async function validateCreateUser(
    user: Omit<UserDto, 'id'>,
    usersRepository: Repository<User>
): Promise<FieldError[]> {
    const errors = validate(user);

    const countUsersByEmail = await usersRepository.count({
        where: {
            email: user.email,
        },
    });

    if (countUsersByEmail) {
        errors.push({
            field: 'email',
            message: 'E-mail is already in use!',
        });
    }

    if (!user.password) {
        errors.push({
            field: 'password',
            message: 'Password is required!',
        });
    }

    return errors;
}

export async function validateUpdateUser(
    user: Omit<UserDto, 'password'>,
    usersRepository: Repository<User>
): Promise<FieldError[]> {
    const errors = validate(user);

    const countUsersByEmail = await usersRepository.count({
        where: {
            id: Not(user.id),
            email: user.email,
        },
    });

    if (countUsersByEmail) {
        errors.push({
            field: 'email',
            message: 'E-mail is already in use!',
        });
    }

    return errors;
}
