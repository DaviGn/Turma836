export default {
    host: process.env.DB_host,
    port: Number(process.env.DB_port),
    username: process.env.DB_username,
    password: process.env.DB_password,
    database: process.env.DB_database,
};
