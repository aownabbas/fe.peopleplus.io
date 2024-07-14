import { StatusSetting } from './config'

interface Employee {
	id: number
	uuid: string
	first_name: string
	last_name: string
	email: string
	photo: string
	phone_number?: any
	department_id?: number
	designation?: string
	department?: Department
}

interface Department {
	id: number
	uuid: string
	organization_id: number
	name: string
	slug: string
	details: string
	created_at: string
	updated_at: string
}

interface Event {
	title: string
	icon: string
	date: string
	category: string
	uuid: string
}

interface Job {
	id: number
	uuid: string
	title: string
	job_id: string
	application_email: string
	dead_line: string
	employment_type: string
	short_description: string
	description: string
	salary_range: string
	start_date: string | null
	end_date: string | null
	experience_level: string
	travel_requirement: string
	hiring_managers: Employee[]
	skill_sets: SkillSet[]
	location: Location
	status: string
	created_at: string
	department: Department
	candidatesCount: number
	candidate_stages_count: Record<string, number>
}

interface SkillSet {
	id: number
	uuid: string
	name: string
	slug: string
}

interface Location {
	id: number
	uuid: string
	organization_id: number
	name: string
	slug: string
	details: string
	created_at: string
	updated_at: string
}

interface Department {
	id: number
	uuid: string
	name: string
}

export type Events = Event[]

export interface DashboardState extends StatusSetting {
	stats: {
		candidateCount: number
		employeeCount: number
		assetCount: number
		jobCount: number
	}

	activeEmployees: Employee[]
	events: Events
	jobs: Job[]
}
