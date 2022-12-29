import { Application } from "express";
import UserController from "../controllers/user.controller";
import JWT from '../services/jwt.service'
import { RouteConfig } from "@dlvlup/core/dist/common";

export class UserRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'UserRoutes');
	}

	configureRoutes() {
		this.app.route('/users').get([JWT.authenticateJWT, UserController.getUsers])

		this.app.route('/users/:id').get([JWT.authenticateJWT, UserController.getUserById])

		return this.app;
	}
}
