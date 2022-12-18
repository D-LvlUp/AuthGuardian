import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

const JWT_KEY = 'Shh-hhh';

class JWT {
	authenticateJWT(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;
		if(authHeader) {
			console.log(`AuthHeader: ${JWT_KEY}`);
			jwt.verify(authHeader, JWT_KEY, (err: any, user) => {
				if(err) {
					console.log(`Error: ${err}`)
					return res
						.status(403)
						.send({ success: false, message: 'Token Expired' })
				}
				req.body['user'] = user;
				next();
			});
		} else {
			res.status(403).json({ success: false, message: 'Unauthorized' })
		}
	}
}

export default new JWT();
