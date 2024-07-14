// countries, country

import { Direction } from '@theme/index'

export type STATUS = 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAIL'

export type ACTION_CODE = 200 | 404 | 500 | 201

export type uuid = string
export type id = number

export type sidebarUserProp = { photo: string; name: string; email: string }

export type thunkPayload = {
	data: any
	success: boolean
	code: ACTION_CODE
}

export interface PaginationState {
	page: number
	per_page: number
	total_records: number
}

export interface DropdownOption {
	label: string
	value: string
}

export interface BreadcrumbLink {
	label: any
	url?: string
	color?: string
}

export type DefaultInputList = { name: string; details: string; uuid?: string }[]
export interface InputListValues {
	fields: { name: string; details: string; uuid?: string }[]
}

export interface StatusSetting {
	status: STATUS
	error: null | string
}

//  internationalization
export type Language = 'en' | 'de' | 'es' | 'ar'

export type LanguageOptions = {
	[key in Language]: {
		icon: string
		label: string
		direction: Direction
	}
}

type defaultValue = number

export interface TabOption<T, V = defaultValue> {
	label: T
	value?: V
}
