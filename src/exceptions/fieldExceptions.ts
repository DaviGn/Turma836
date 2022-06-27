import FieldError from '../dtos/fieldError';

export default class FieldException {
    public errors: FieldError[];
    readonly statusCode = 400;

    constructor(errors: FieldError[]) {
        this.errors = errors;
    }
}
