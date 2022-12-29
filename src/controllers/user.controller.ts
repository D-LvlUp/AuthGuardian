import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { response } from '../response';

class UserController {
	constructor() {}

	async getUsers(req: Request, res: Response, next: NextFunction) {
		try {
			return new response(res)
				.success()
				.data(await UserService.Repository.GetRangeAsync())
				.send();
		} catch (e) {
			next(e);
		}

	}

	async getUserById (req: Request, res: Response, next: NextFunction) {
		const id = req.params['id'];
		try {
			const user = await UserService.Repository.GetAsync(x => x.Where(r => r.id == id));
			if(user) {
				return new response(res)
					.success()
					.data(user)
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
