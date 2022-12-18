import {DBService} from "@dlvlup/data/dist/DBService.js";
import {DBContext} from "@dlvlup/data/dist/DBContext.js";
import {UsersRepository} from "../repository/usersRepository.js";
import {Users} from "@dlvlup/data/dist/entities/index.js";
import {MysqlConfig} from "../config/db.config.js";

const config = new MysqlConfig();

class UserService extends DBService<Users> {
	constructor() {
		super();
	}

	public Repository: UsersRepository;

	public async Setup() {
		const DB = await new DBContext(config, this._entities).start();
		if (DB.dbIsConnected()) {console.log(`Connected to DB Successfully.`);}
		this.Repository = new UsersRepository(DB.DBSource, Users);
	}
}

export default new UserService();
