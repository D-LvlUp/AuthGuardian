import { NextFunction, Request, Response } from 'express';
import { log } from '@dlvlup/core/dist/helpers';
import TenantService from "../services/tenant.service";


export async function validateApiKey(req: Request, res: Response, next: NextFunction) {
	const code = req.query['code'] || req.body['code'] || req.headers['code'];
	const host = req.headers.host
	const IsLocalhost = host?.includes('localhost:');

	let IsTenant;

	try {
		if(host != null && !IsLocalhost) {
			IsTenant = await TenantService.Repository.IsAuthorizedTenant(host, code)
			if (!IsTenant) {
				res.status(403).send('No API Key no threat!! 😡');
			}
		}

		log.info(`Request ${req.url} executed at ${new Date().toISOString()}.`);
		next();
	} catch (e) {
		res.status(200).send('Tenant Service not yet Setup.')
	}

}
