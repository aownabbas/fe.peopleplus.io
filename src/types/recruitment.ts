import { ZodType, z } from 'zod'
import { DropdownOption, StatusSetting, id, uuid, STATUS } from './config'
import { Department } from './settings'
import { checkPoint } from '@utils/bug'

export type ExperienceLevel = 'entry_level' | 'mid_level' | 'senior_level'
export type TravelRequirement = 'None' | 'Occasional' | 'Frequent'
export type JobStatus = 'Open' | 'Closed' | 'Draft'
export type EmploymentType = 'full-time' | 'part-time' | 'internship' | 'temporary' | 'contract'

export interface WorkLocation {
	id: number
	uuid: string
	organization_id: number
	name: string
	slug: string
	details: string
	created_at: Date
	updated_at: Date
}

export interface HiringManager {
	id: number
	uuid: string
	designation: any
	first_name: string
	last_name: string
	photo: string
}

export interface SkillSet {
	id: id
	name: string
	slug: string
	uuid: string
}
export interface CandidateStageCount {
	[key: string]: number
}
export interface Pipeline {
	[key: string]: Candidate[]
}

interface Organization {
	uuid: uuid
	id: id
	name: string
	photo: string
}

export interface Job {
	id: number
	uuid: string
	title: string
	end_date: any
	job_id: string
	start_date: any
	status: JobStatus
	created_at: string
	description: string
	salary_range: string
	department: Department | null
	organization: Organization | null
	candidatesCount: number
	short_description: string
	candidate_stages_count: CandidateStageCount
	employment_type: EmploymentType
	hiring_managers: HiringManager[]
	experience_level: ExperienceLevel
	travel_requirement: TravelRequirement
	application_email: string
	dead_line: string
	location: WorkLocation | null
	pipelines: Pipeline
	skill_sets: SkillSet[]
}

export interface NewJob {
	title: string
	description: string
	short_description: string
	organization_id?: number
	pipeline_id?: number
	job_id: string
	department_id: uuid
	work_location_id: number
	employment_type: EmploymentType
	skill_sets: string | number[] //csv ids
	hiring_managers: string | number[] //csv is
	salary_range: string
	currency: string
	dead_line: Date
	start_date: Date
	end_date: Date
	experience_level: ExperienceLevel
	travel_requirement: TravelRequirement
	time_zone: string
	application_email: string
	status?: JobStatus
	posted_by?: number //organization id
}

export interface NewJobForm extends NewJob {
	skill_sets: number[]
	hiring_managers: number[]
}

export interface SettingsState {
	department: DropdownOption[]
	location: DropdownOption[]
	employeement_type: DropdownOption[]
}

export interface CommentedBy {
	id: id
	uuid: uuid
	user_id: number
	first_name: string
	last_name: string
	company_logo: string
	organization_name: string
	description: string
	phone: string
	website: string
	is_remote: null | boolean
	is_multiple_office: null | boolean
	address: string
	city: string
	zipcode: string
	country: number
	time_zone: string
	office_name: null | string
	created_at: string
	updated_at: string
	photo: string
}

export interface Note {
	id: id
	uuid: uuid
	candidate_id: number
	commented_by_id: number
	commented_by_type: string
	comment: string
	created_at: string
	updated_at: string
	commented_by: CommentedBy
}

export interface ActivityBy {
	id: number
	uuid: string
	user_id: number
	first_name: string
	last_name: string
	company_logo: string
	photo: string
	organization_name: string
	description: string
	phone: string
	website: string
	is_remote: null | boolean
	is_multiple_office: null | boolean
	address: string
	city: string
	zipcode: string
	country: number
	time_zone: string
	office_name: null | string
	created_at: string
	updated_at: string
}

export interface Activity {
	id: number
	uuid: string
	candidate_id: number
	activity_by_id: number
	activity_by_type: string
	activity_type: string
	details: null | string
	created_at: string
	updated_at: string
	activity_by: ActivityBy
}

export interface RecruitmentState extends StatusSetting {
	jobList: Job[]
	Candidate: Candidate[]
	jobState: { total: number; totalApplicant: number; activeJobs: number }
	jobPaginateData: { page: number; per_page: number }
	job: Job
	activityList: Activity[]
	noteList: Note[]
	noteStatus: STATUS
	jobStatus: STATUS
	jobSearchStatus: STATUS
}

export interface JobDetailTabs {
	label: string
	value: 0 | 1 | 2 | 3
}

export interface AddJobTabs {
	label: string
	value: 0 | 1 | 2 | 3
}

export interface NewCandidate {
	organization_id: number
	job_id: string
	pipeline_stage_id: any
	first_name: string
	last_name: string
	email: string
	resume_path: File
	address?: string
	phone?: string
}

const MAX_FILE_SIZE = 3 * 1024 * 1024
function checkFileType(file: File) {
	if (file?.name) {
		const fileType = file.name.split('.').pop()
		if (fileType === 'docx' || fileType === 'pdf') return true
	}
	return false
}

// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const NewCandidateSchema = z.object({
	pipeline_stage_id: z.union([
		z.number().min(1, { message: 'Pipeline Stage is required' }),
		z.string().min(1, { message: 'Pipeline Stage is required' }),
	]),
	first_name: z.string().min(1, { message: 'First name is required' }),
	last_name: z.string().min(1, { message: 'Last name is required' }),
	email: z.string().email({ message: 'Valid email is required' }),
	phone: z.string().nullable().optional(),
	address: z.string().nullable().optional(),

	resume_path: z
		.instanceof(File)
		.optional()
		.refine((file) => file !== undefined, {
			message: 'Resume is required.',
		})
		.refine((file) => file && file.size <= MAX_FILE_SIZE, {
			message: 'File size exceeds the limit of 3 MB.',
		}),
})

export interface Candidate {
	id: number
	uuid: string
	first_name: string
	last_name: string
	email: string
	address: string
	phone: string
	resume_path: string
	resumeHtmlContent: string
	resume_html_content: string | null
	gpt_thread_id: string | null
	image: string | null
	status: string
	timezone: string
	columnId: string
	stageId: id
	created_at: string
}

export interface NewNote {
	comment: string
	candidate_id: uuid
}

export type pipelineParam = {
	candidate_id: uuid
	pipeline_stage_id: id
}

export type gptAssessment = {
	uuid: uuid
	content: string
}

export interface CandidateTabs {
	label: string //'Summary' | 'Resume' | 'Notes' | 'Activity'
	value: 0 | 1 | 2 | 3
}

export interface DepartmentTabs {
	id: id
	name: string
	slug: string
	uuid: uuid
}
