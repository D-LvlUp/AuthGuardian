export interface IUser {
	id?: string,
	username: string,
	email: string,
	fullname: string,
	role?: string,
	password?: string,
	lastLogin?: Date,
	created_at?: Date,
	updated_at?: Date
}
