import { NextFunction, Request, Response } from 'express';
import { log } from '@dlvlup/core/dist/helpers';


export function validateApiKey(req: Request, res: Response, next: NextFunction) {
	const code = req.query['code'] || req.body['code'] || req.headers['code'];
	const IsLocalhost = req.headers['host']?.includes('localhost');

	if (!IsLocalhost && code != process.env.API_Key) {
		res.status(403).send('No API Key no threat!! 😡');
	}
	else {
		log.info(`Request ${req.url} executed at ${new Date().toISOString()}.`);
		next();
	}
}
