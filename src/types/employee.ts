import { DropdownOption, PaginationState, StatusSetting, uuid } from './config'

export interface EmployeeState extends StatusSetting {
	list: any[]
	isLoading: boolean
	documentCategoryLoading: boolean
	tempUnLinkedList: any[]
	onBoardingList: any[]
	employeePagination: PaginationState
	unlinkedEmployeePagination: PaginationState
	dropDownList: any[]
	unlinkedList: any[]
	tempList: any[]
	departments: any[]
	Options: DropdownOption[]
	documents: any
	detail: object
	selectedDocumentCategory: string | null
	deletedDocumentId: string | null
	isOpen: boolean
	isAlertDialogOpen: boolean
	document_categories: any
	employeeFeedbackComments: any[]
	employeeFeedback: object
	loading: boolean
	feedbackLoading:boolean
}

export interface Department {
	name: string
	uuid: string
}

export interface DepartmentCategory {
	name: string
	uuid: string
}
export interface Document {
	uuid: string
	file_name: string
	mime_type: string
	file_path: string
	size: number
	created_at: string
	uploadBy: Employee
	document_category: DepartmentCategory
}

export interface NewEmployee {
	first_name: string
	is_top_level: number
	uuid: string
	last_name: string
	cnic: string
	dob: any
	joining_date: any
	probation_end_date: any
	termination_date: any
	gender: string
	phone_number: string
	emergency_contact: string
	street_address: string
	email: string
	password: string
	photo: string
	city: string
	employee_type: string
	state: string
	employee_status: string
	country_id: string
	employee_id: string
	designation: string
	department_id: string
	work_location_id: string
	salary: string
	pay_frequency: string
	currency: string
	working_hours: string
	working_days: any
	time_zone: string
	job_title: string
	degree: string
	institute: string
	about: string
	postcode: number
	benefit: any
}

export interface Employee {
	parent_id?: number
	id: number
	first_name: string
	is_top_level: any
	uuid: string
	last_name: string
	cnic: string
	dob: Date
	joining_date: Date
	probation_end_date: Date
	termination_date: Date
	gender: string
	phone_number: string
	emergency_contact: string
	street_address: string
	email: string
	password: string
	status: string
	photo: string
	city: string
	employee_type: string
	state: string
	country?: string
	employee_status: string
	country_id: string
	employee_id: string
	designation: { uuid: uuid; first_name: string; last_name: string }
	work_location: { uuid: uuid; id: string; name: string }
	work_location_id: string
	salary: string
	pay_frequency: string
	currency: string
	working_hours: string
	working_days: any
	time_zone: string
	job_title: string
	degree: string
	institute: string
	about: string
	address: string
	message: string
	benefit: string
	department: { uuid: uuid; name: string }
	children?: Employee
	postcode: number
}

export interface SearchRequestParams {
	department_id?: string
	name?: string
	sortDir?: string
	page: number
	per_page: number
}

export interface EmployeeFilter {
	id: string
	first_name: string
	last_name: string
	email: string
	department?: {
		id: string
	}
}
