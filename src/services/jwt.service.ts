import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { log } from '@dlvlup/core/dist/helpers';
import { response } from '../response';
const JWT_KEY = process.env.JWT_KEY || 'Shh-hhh';

class JWT {
	authenticateJWT(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;
		if(authHeader) {
			jwt.verify(authHeader, JWT_KEY, (err: any, user) => {
				if(err) {
					log.error(`Error: ${err}`);
					new response(res)
						.error('Forbidden')
						.message('Token Expired.')
						.send();
				}
				// @ts-ignore
				req['user'] = user;
				next();
			});
		} else {
			new response(res).error('Unauthorized').message('Access unauthorized.').send();
		}
	}
}

export default new JWT();
