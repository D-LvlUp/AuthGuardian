import {IUser} from "../interfaces/user.interface.js";
import {Users} from "@dlvlup/data/dist/entities/index.js";
import {BaseRepository} from "@dlvlup/data/dist/BaseRepository.js";

export class UsersRepository extends BaseRepository<Users> {
	async getUserByEmail(email: string): Promise<Users> {
		return await this.GetAsync(x => x.Where(r => r.email == email))
	}

	async createUser(data: IUser) {
		try {
			await this.AddAsync(data);
		} catch (e: any) {
			throw new Error(e);
		}
	}
}
