import User from '../models/User';

export default class UsersRepository {
  private _users: User[];

  constructor() {
    this._users = [];
  }

  public list(): User[] {
    return this._users;
  }

  public getById(id: string): User | undefined {
    return this._users.find((x) => x.id.toUpperCase() === id.toUpperCase());
  }

  public get(predicate: (value: User) => boolean): User | undefined {
    return this._users.find(predicate);
  }

  public add(user: User): void {
    this._users.push(user);
  }

  public update(user: User): void {
    const userFoundIndex = this._users.findIndex(
      (x) => x.id.toUpperCase() === user.id.toUpperCase()
    );

    if (userFoundIndex === -1) return;

    this._users[userFoundIndex] = user;
  }

  public delete(id: string): void {
    this._users = this._users.filter(
      (x) => x.id.toUpperCase() !== id.toUpperCase()
    );
  }
}
