import {Application} from "express";
import UserController from "../controllers/user.controller.js";
import JWT from '../services/jwt.service.js'
import {RouteConfig} from "@dlvlup/core/dist/common/index.js";

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
