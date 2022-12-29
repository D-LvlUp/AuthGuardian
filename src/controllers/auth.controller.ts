import { Request, NextFunction, Response } from 'express';
import UserService from '../services/user.service';
import { IUser } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { log } from '@dlvlup/core/dist/helpers';
import { response } from '../response';
const tokenExpirationTime = 300; //In seconds
const secret = process.env.JWT_KEY || 'Shh-hhh';

class AuthController {
	constructor() {}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const email: string = req.body['email'];
			const password: string = req.body['password'];
			const user: IUser = await UserService.Repository.getUserByEmail(email);
			log.info(`User: ${JSON.stringify(user, null, 1)}.`);
			if(user && user.password) {
				const isPasswordMatch = bcrypt.compareSync(password,user.password);
				if (!isPasswordMatch) {
					new response(res)
						.error('Unauthorized')
						.message('Wrong Username or Password.')
						.send();
				}
				else {
					user.lastLogin = new Date();
					await UserService.Repository.updateLastLogin(user);
					const token = jwt.sign(req.body, secret, {
						expiresIn: tokenExpirationTime
					});

					delete user.password;

					new response(res)
						.success()
						.data(user)
						.message('Login Successful!')
						.add({ token })
						.send();
				}
			} else {
				new response(res)
					.error('Unauthorized')
					.message('Wrong Username or Password.')
					.send();
			}
		} catch (e) {
			next(e);
		}
	}

	async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const username = req.body['username'];
			const email = req.body['email'];
			const fullname = req.body['fullname'];
			let password = req.body['password'];
			const role = req.body['role'] || null;

			const user = await UserService.Repository.getUserByEmail(email);
			if(user) {
				new response(res)
					.error('Bad Request')
					.message('User already exist.')
					.send();
			}
			else {
				try {
					password = encrypt(password);
					await UserService.Repository.createUser({
						username,
						email,
						fullname,
						password,
						role
					});
					const newUser: IUser = await UserService.Repository.GetAsync(x => x.Where(r => r.email == email));
					delete newUser.password;

					const token = jwt.sign({ username, password }, secret, {
						expiresIn: tokenExpirationTime
					});

					new response(res)
						.success('Created')
						.message('User Created Successfully!')
						.data(newUser)
						.add({ token })
						.send();

				} catch (e) {
					log.error(`Controller capturing error: ${e}.`);
					throw new Error('Error Registering...');
				}
			}
		} catch (e) {
			next(e);
		}
	}
}

function encrypt(password: string): string {
	return bcrypt.hashSync(password, 10);
}

export default new AuthController();
