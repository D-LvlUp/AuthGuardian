import { ITenant } from '../interfaces/tenant.interface';
import { Tenants } from '@dlvlup/data/dist/entities';
import { BaseRepository } from '@dlvlup/data/dist/BaseRepository';

export class TenantsRepository extends BaseRepository<Tenants> {

	async addTenant(data: ITenant) {
		const tenant = new Tenants(data);
		try {
			await this.AddAsync(tenant);
		} catch (e: any) {
			throw new Error(e);
		}
	}

	async IsAuthorizedTenant(host: string, api_key: string)  {
		return await this.GetAsync(x => x.Where(t =>
		t.host === host && t.api_key === api_key)
			.Select(t => t.IsActive));
	}
}
