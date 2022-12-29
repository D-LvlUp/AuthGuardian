
export enum httpCode {
	'Bad Request' = 400,
	'Unauthorized' = 401,
	'Forbidden' = 403,
	'Ok' = 200,
	'Created' = 201
}

export type status =
	'Unauthorized'
	| 'Ok'
	| 'Forbidden'
	| 'Bad Request'
	| 'Created'

export class BaseResponse {
	status: number;
	success: boolean;
	data: any;
	message: string;
}
