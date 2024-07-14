import { StatusSetting } from './config'

export interface EventsState extends StatusSetting {
	selectedDate: any
	event: {
		selectedDate: Date
		listing: any
		stats: any
		detail: any
		categoryCounts: {
			event: number
			holidays: number
			birthday: number
			misc: number
		}
	}
	isModalOpen: boolean
}

export interface Stats {
	icon: string
	label: string
	count: number
}
