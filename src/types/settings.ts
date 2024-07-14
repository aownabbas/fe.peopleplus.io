import type { ColorPreset, Contrast, Direction, PaletteMode } from '@theme/index'
import { DefaultInputList, DropdownOption, STATUS, StatusSetting } from './config'
import { PayloadAction } from '@reduxjs/toolkit'

export type Layout = 'horizontal' | 'vertical'

export type NavColor = 'blend-in' | 'discrete' | 'evident'

export interface Settings {
	colorPreset?: ColorPreset
	contrast?: Contrast
	direction?: Direction
	layout?: Layout
	navColor?: NavColor
	paletteMode?: PaletteMode
	responsiveFontSizes?: boolean
	stretch?: boolean
}

export type SettingTabs = { label: string; value: string }

export interface PipelineStage {
	id: number
	uuid: string
	organization_id: number
	name: string
	description: string
	created_at: string | null
	updated_at: string | null
}
export interface GeneralSettings {
	first_name: string
	last_name: string
	company_logo: string | FileList
	country_id: number | null
	company_name: string
	website: string
	phone: string
	description: string
	office_address: string
	city: string
	zip_code: string
	time_zone: string
	email: string
}

export interface Onboarding {
	uuid?: string
	title: string
	mandatory: string
	priority: string
	assign: string
	description: string
}

export interface OnboardingListValues {
	fields: Onboarding[]
}

export type dynamicFields =
	| 'asset_category'
	| 'benefit'
	| 'department'
	| 'skill_set'
	| 'work_location'
	| 'onboarding'
	| 'pipeline_stage'
	| 'employees'
	| 'policy_category'

export interface DeleteSettingsFields {
	deleteFrom: dynamicFields
	uuid: string
}
export interface Department {
	id: number
	uuid: string
	name: string
}

export interface SettingsState extends StatusSetting {
	countriesOptions: DropdownOption[]
	timezoneOptions: DropdownOption[]
	assetCategories: DropdownOption[]
	departments: DefaultInputList
	benefitsPackagesOption: DefaultInputList
	PipelineStageOptions: DropdownOption[]
	PipelineStage: DefaultInputList
	departmentsOptions: DropdownOption[]
	skillSetOptions: DropdownOption[]
	workLocationOptions: DropdownOption[]
	deleteStatus: { state: { uuid?: string }; stats: STATUS }
}

export type deleteStatePayload = PayloadAction<{ deleteFrom?: dynamicFields; uuid?: string }>
