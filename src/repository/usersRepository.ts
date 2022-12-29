import { IUser } from '../interfaces/user.interface.js';
import { Users } from '@dlvlup/data/dist/entities';
import { BaseRepository } from '@dlvlup/data/dist/BaseRepository';

export class UsersRepository extends BaseRepository<Users> {
	async getUserByEmail(email: string): Promise<Users> {
		return await this.GetAsync(x => x.Where(r => r.email == email));
	}

	async createUser(data: IUser) {
		const user = new Users(data);
		try {
			await this.AddAsync(user);
		} catch (e: any) {
			throw new Error(e);
		}
	}

	async updateLastLogin(data: any) {
		try {
			await this._dataRepository.update({ id: data.id }, data);
		} catch (e: any) {
			throw new Error(e);
		}
	}
}
