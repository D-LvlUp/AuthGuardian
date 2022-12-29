import { DBService } from '@dlvlup/data/dist/DBService';
import { DBContext } from '@dlvlup/data/dist/DBContext';
import { UsersRepository } from '../repository/usersRepository';
import { Users } from '@dlvlup/data/dist/entities';
import { MysqlConfig } from '../config/db.config';
import { log } from '@dlvlup/core/dist/helpers';
const config = new MysqlConfig();

class UserService extends DBService<Users> {
	constructor() {
		super();
	}

	public Repository: UsersRepository;

	public async Setup() {
		const DB = await new DBContext(config, this._entities).start();
		if (DB.dbIsConnected()) {log.success('Connected to DB Successfully.');}
		this.Repository = new UsersRepository(DB.DBSource, Users);
	}
}

export default new UserService();
