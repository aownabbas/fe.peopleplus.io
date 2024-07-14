// "email" : "admin@admin.com",
// "password" : "!2AdminT",

import { ROLE } from '@config/index'
import { STATUS, thunkPayload } from './config'

export interface Organization {
	id: number
	uuid: string
	user_id: number
	first_name: string
	last_name: string
	company_logo: string
	organization_name: string
	description: string
	phone: string
	website: string
	is_remote: boolean | null
	is_multiple_office: boolean | null
	address: string
	city: string
	zipcode: string
	country: number | null
	office_name: string | null
	created_at: string
	updated_at: string
	time_zone: string
}

interface Employee {
	id: number
	uuid: string
	organization_id: number
	designation: number
	parent_id: number
	first_name: string
	last_name: string
	photo: string
	dob: string
	gender: string
	cnic: string
	email: string
	phone_number: string
	street_address: string
	city: string
	state: string
	postcode: string
	country_id: number
	user_id: string
	employee_id: string
	employee_status: string
	employee_type: string
	probation_end_date: string
	joining_date: string
	termination_date: string | null
	job_title: string
	department_id: number
	role: string | null
	work_location_id: string | null
	salary: string
	pay_frequency: string
	currency: string
	degree: string
	institute: string
	about: string
	working_hours: string
	working_days: string[]
	time_zone: string | null
	custom_fields: string | null
	created_at: string
	updated_at: string
	is_top_level: number
}

export interface AuthUser {
	id: number
	uuid: string
	type: ROLE
	email: string
	email_verified_at: string | null
	password_changed_at: string | null
	active: number
	timezone: string | null
	last_login_at: string | null
	last_login_ip: string | null
	to_be_logged_out: number
	provider: string | null
	provider_id: string | null
	created_at: string
	updated_at: string
	deleted_at: string | null
	organization: Organization | undefined
	employee: Employee | undefined
	token: string
}

export type Login = {
	password: string
	email: string
}
export interface Register extends Login {
	first_name: string
	last_name: string
	organization_name: string
	confirm_password: string
}

export interface ResetPassword {
	password: string
	password_confirmation: string
	email: string
	code: string
}

export interface AuthState {
	user: AuthUser
	isAuthenticated: boolean
	status: STATUS
	error: null | string
}

export interface AuthSetting {
	status: STATUS
	error: null | string
}

export interface OTP {
	code: string
}

export type AuthPayload = thunkPayload
