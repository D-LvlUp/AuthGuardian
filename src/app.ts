import RoutesConfigs from './routes/index';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as http from 'http';
import UserService from './services/user.service';
import { RouteConfig } from '@dlvlup/core/dist/common';
import { validateApiKey } from './security/api.security';
import { log } from '@dlvlup/core/dist/helpers';
import TenantService from './services/tenant.service';

const routes: Array<RouteConfig> = [];

const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(validateApiKey);

RoutesConfigs.forEach(Route => routes.push(new Route(app)));

app.get('/', (req: Request, res: Response) => {
	res.send(
		'<h1>Welcome World</h1>'
	);
});

app.all('*', (req: Request, res: Response) => {
	// Here user design an
	// error page and render it
	res.status(404).send('PAGE NOT FOUND');
});

const server: http.Server = http.createServer(app);


server.listen(PORT, async () => {
	await UserService.Setup(); //TODO: Include many Services but one Setup.
	await TenantService.Setup();

	log.info(`Server is running on http://localhost:${PORT}`);

	routes.forEach((route: RouteConfig) => {
		log.success(`Routes configured for ${route.getName()}`);
	});
});
