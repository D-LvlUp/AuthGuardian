import { Response } from 'express';
import { BaseResponse, status, httpCode } from './interfaces/response.interface';

export class response { //TODO: Better with extend Response class?
	constructor(res: Response) {
		this.res = res;
	}

	private res: Response;

	private props: any = {};

	private resp: BaseResponse = new BaseResponse();

	success(status: status = 'Ok') {
		this.resp.success = true;
		this.resp.status = httpCode[status];
		return this;
	}

	error(status: status = 'Bad Request'): this {
		this.resp.success = false;
		this.resp.status = httpCode[status];
		return this;
	}

	message(text: string): this {
		this.resp.message = text;
		return this;
	}

	data(payload: any): this {
		this.resp.data = payload;
		return this;
	}

	add({ ...prop }): this {
		Object.keys(prop).forEach(key => {
			this.props[key] = prop[key];
		});
		return this;
	}

	send(): Response {
		return this.res.status(this.resp.status).json({ ...this.resp, ...this.props });
	}

}

