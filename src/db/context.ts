import { DataSource } from 'typeorm';
import Role from '../models/Role';
import User from '../models/User';
import DbConfig from '../configs/db.config';

const DbContext = new DataSource({
    type: 'postgres',
    host: DbConfig.host,
    port: DbConfig.port,
    username: DbConfig.username,
    password: DbConfig.password,
    database: DbConfig.database,
    synchronize: false,
    logging: false,
    entities: [User, Role],
    subscribers: [],
    migrations: ['./src/migrations/*.ts'],
    migrationsTableName: 'migrations',
});

export default DbContext;
