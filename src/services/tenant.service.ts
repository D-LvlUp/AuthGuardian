import { DBService } from '@dlvlup/data/dist/DBService';
import { Tenants } from '@dlvlup/data/dist/entities';
import { TenantsRepository } from '../repository/tenantsRepository';
import { DBContext } from '@dlvlup/data/dist/DBContext';
import { MysqlConfig } from '../config/db.config';
import { log } from '@dlvlup/core/dist/helpers';
const config = new MysqlConfig();

class TenantService extends DBService<Tenants> {
	constructor() {
		super();
	}

	public Repository: TenantsRepository;

	public async Setup() {
		const DB = await new DBContext(config, this._entities).start();
		if (DB.dbIsConnected()) {log.success('Connected to DB Successfully.');}
		this.Repository = new TenantsRepository(DB.DBSource, Tenants);
	}
}

export default new TenantService();
