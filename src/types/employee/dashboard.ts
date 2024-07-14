import { StatusSetting } from 'type/config'

interface WorkingHours {
	hours: number
	minutes: number
}

export interface DashboardState extends StatusSetting {
	stats: {
		candidateCount: number
	}
	workinghours: WorkingHours
	attendence: any[] //Replace any[] with the actual type of items in the attendence array if it's known beforehand.
}
