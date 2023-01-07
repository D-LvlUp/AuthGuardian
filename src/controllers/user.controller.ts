import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { response } from '../response';
import {IUser} from "../interfaces/user.interface";

class UserController {
	constructor() {}

	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			let users: IUser[] = await UserService.Repository.GetRangeAsync()
			users.forEach(u => delete u.password)
			return new response(res)
				.success()
				.data(users)
				.send();
		} catch (e) {
			next(e);
		}

	}

	async getUserById (req: Request, res: Response, next: NextFunction) {
		const id = req.params['id'];
		const token = req.headers.authorization
		try {
			const user: IUser = await UserService.Repository.GetAsync(x => x.Where(r => r.id == id));
			delete user.password;
			if(user) {
				return new response(res)
					.success()
					.data(user)
					.add({ token })
					.send();
			}
			else {
				return new response(res)
					.error()
					.message(`No user with ID: ${id}`)
					.send();
			}

		} catch (e) {
			next(e);
		}
	}
}

export default new UserController();
