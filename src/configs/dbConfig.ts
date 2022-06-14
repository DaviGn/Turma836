import { DataSource } from 'typeorm';
import Role from '../models/Role';
import User from '../models/User';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'turma836',
  synchronize: false,
  logging: false,
  entities: [User, Role],
  subscribers: [],
  migrations: ['./src/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

export default AppDataSource;
