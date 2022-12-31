export interface ITenant {
	id: number
	application_name: string
	host: string
	api_key: string
	IsActive: boolean
	created_at: Date
	updated_at: Date
}
