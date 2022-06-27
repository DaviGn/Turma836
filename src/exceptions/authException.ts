export default class AuthException {
    public message: string;
    readonly statusCode = 401;

    constructor(message: string) {
        this.message = message;
    }
}
