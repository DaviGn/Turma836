import User from '../models/User';
import dataSource from '../db/context';

// Criando repositório customizado
const UserRepository = dataSource.getRepository(User).extend({});
export default UserRepository;
