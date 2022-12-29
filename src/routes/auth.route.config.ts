import AuthController from "../controllers/auth.controller";
import { RouteConfig } from "@dlvlup/core/dist/common";

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
