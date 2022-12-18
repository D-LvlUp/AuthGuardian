import AuthController from "../controllers/auth.controller.js";
import {RouteConfig} from "@dlvlup/core/dist/common/index.js";

export class AuthRoutes extends RouteConfig {
	constructor(app: any) {
		super(app, 'AuthRoutes');
	}

	configureRoutes() {
		this.app.route('/login').post([AuthController.login])

		this.app.route('/signup').post([AuthController.signup])

		return this.app;
	}
}
