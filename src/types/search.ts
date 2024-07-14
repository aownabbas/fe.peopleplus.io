import { StatusSetting, uuid } from './config'

export interface Person {
	id: number
	name: string
	role: string
	phone: string
	reDir: {
		url: string
		state?: {
			uuid?: string
		}
	}
	email: string
	image: string
}

export interface SearchState extends StatusSetting {
	employees: Person[]
	candidates: Person[]
}
