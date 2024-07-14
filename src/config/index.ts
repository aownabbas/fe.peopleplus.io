import { tokens } from '@locales/tokens'
import { giveMeManag } from '@utils/index'
import { DropdownOption, Language, LanguageOptions } from 'type/config'
import { DocumentIconListValues } from 'type/policies'

export { default as COUNTRIES } from './countries.json'
export { default as TIMEZONE } from './timeZone.json'
import { addDays, endOfDay, setHours, setMinutes, startOfDay, subDays } from 'date-fns'

import type { CalendarEvent } from 'type/upcomingevents'

//######################################## MiCS. config ########################################

const now = new Date()
export const enableDevTools = import.meta.env.VITE_ENABLE_REDUX_DEV_TOOLS === 'true'
export type ROLE = 'employee' | 'organization'
export const TOP_NAV_HEIGHT = 64
export const SIDE_NAV_WIDTH = 280 // px
export const prefix = {
	job: {
		id: 'PP',
	},
}

export const version = '0.0.1'

export const tabInitialization = {
	label: 'All',
	value: 'all',
}

//######################################## ENV config ########################################
export const mapboxConfig = {
	apiKey: import.meta.env.VITE_MAPBOX_API_KEY,
}

export const AWSConfig = {
	bucket: import.meta.env.VITE_AWS_BUCKET,
	defaultRegion: import.meta.env.VITE_AWS_DEFAULT_REGION,
	accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
	secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
	fileLink: `https://s3.${import.meta.env.VITE_AWS_DEFAULT_REGION}.amazonaws.com/${import.meta.env.VITE_AWS_BUCKET}`,
}

export const server = {
	url: import.meta.env.VITE_BASE_URL,
	api: `${import.meta.env.VITE_BASE_URL}/api/v1/`,
}

export const gptConfig = {
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	apiUrl: import.meta.env.VITE_OPENAI_API_URL,
}
export const urlPreFix = {
	employee: 'employees',
}
//######################################## table config ########################################
export const table = {
	rowsPerPageOptions: [5, 10, 25],
	rowsPerPage: 10,
	pageStartFrom: 0,
}

//######################################## internationalization ########################################

export const languages: Record<Language, string> = {
	en: '/images/flags/flag-uk.svg',
	de: '/images/flags/flag-de.svg',
	es: '/images/flags/flag-es.svg',
	ar: '/images/flags/flag-qa.svg',
}

export const languageOptions: LanguageOptions = {
	en: {
		icon: '/images/flags/flag-uk.svg',
		label: 'English',
		direction: 'ltr',
	},
	ar: {
		icon: '/images/flags/flag-qa.svg',
		label: 'Arabic',
		direction: 'rtl',
	},
	de: {
		icon: '/images/flags/flag-de.svg',
		label: 'German',
		direction: 'ltr',
	},
	es: {
		icon: '/images/flags/flag-es.svg',
		label: 'Spanish',
		direction: 'ltr',
	},
}

export const viewOptions: DropdownOption[] = [
	{
		label: 'Month',
		value: 'dayGridMonth',
	},
	{
		label: 'Week',
		value: 'timeGridWeek',
	},
	{
		label: 'Day',
		value: 'timeGridDay',
	},
	{
		label: 'Agenda',
		value: 'listWeek',
	},
]

//######################################## settings: onboarding ########################################

export const mandatory: DropdownOption[] = [
	// {
	// 	label: tokens.settings.onboarding.form.mandatory.placeHolder,
	// 	value: '',
	// },
	{
		label: 'Yes',
		value: 'yes',
	},
	{
		label: 'No',
		value: 'no',
	},
]

export const priority: DropdownOption[] = [
	// {
	// 	label: tokens.settings.onboarding.form.priority.placeHolder,
	// 	value: '',
	// },
	{
		label: 'High',
		value: 'high',
	},
	{
		label: 'Low',
		value: 'low',
	},
]

//######################################## recruitment ########################################

export const employmentType: DropdownOption[] = [
	{ label: 'Full time', value: 'full-time' },
	{ label: 'Part time', value: 'part-time' },
	{ label: 'Internship', value: 'internship' },
	{ label: 'Temporary', value: 'temporary' },
	{ label: 'Contract', value: 'contract' },
]

export const experienceLevel: DropdownOption[] = [
	{ value: 'entry_level', label: 'Entry Level' },
	{ value: 'mid_level', label: 'Mid Level' },
	{ value: 'senior_level', label: 'Senior Level' },
]
export const travelRequirement: DropdownOption[] = [
	{ value: 'none', label: 'None' },
	{ value: 'occasional', label: 'Occasional' },
	{ value: 'frequent', label: 'Frequent' },
]

//######################################## policies ########################################
export const iconList = giveMeManag(DocumentIconListValues)
