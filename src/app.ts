import RoutesConfigs from './config/index.js';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as http from 'http';
import UserService from './services/user.service.js';
import { RouteConfig } from '@dlvlup/core/dist/common/index.js';

const routes: Array<RouteConfig> = [];

const PORT = process.env.PORT || 8000;

const app: Express = express();

app.use(express.json());
app.use(cors());

RoutesConfigs.forEach(Route => routes.push(new Route(app)));

app.get('/', async (req: Request, res: Response) => {
	res.send(
		'<h1>Welcome World</h1>'
	);
});

const server: http.Server = http.createServer(app);

server.listen(PORT, async () => {
	await UserService.Setup(); //TODO: Include many Services Setup.

	console.log(`Server is running on http://localhost:${PORT}`);

	routes.forEach((route: RouteConfig) => {
		console.log(`Routes configured for ${route.getName()}`);
	});
});
