import { z } from 'zod'
import {
	DefaultInputList,
	DropdownOption,
	id,
	STATUS,
	StatusSetting,
	TabOption,
	uuid,
} from './config'
import { PayloadAction } from '@reduxjs/toolkit'

export type policiesTabs = { label: string; value: string }

// export type policyStatus = 'deleted' | 'draft' | 'published'
export enum PolicyStatus {
	Deleted = 'deleted',
	Draft = 'draft',
	Published = 'published',
}

export interface Document {
	id: id
	uuid: uuid
	title: string
	created_by: id
	organization_id: id
	category_name: string
	status: PolicyStatus
	summary: string
	content: string
	icon: string
	created_at: string
	updated_at: string
}

export type Documents = Document[]

export type drawerVariant = 'form' | 'details'

export type drawerPayloadAction = PayloadAction<{ variant: drawerVariant; payload?: any }>
export interface PoliciesState extends StatusSetting {
	policyCategoriesStatus: STATUS
	documents: Documents
	selectedDocument: Document | null
	policyCategoryOptions: DropdownOption[]
	selectedTabs: {
		published: DropdownOption[]
		draft: DropdownOption[]
	}
	policyDrawer: {
		isOpen: boolean
		variant: drawerVariant
		payload?: any
	}
	listStatus: STATUS
}

export enum PoliciesFilterTabValues {
	'all',
	'fundamentals',
	'people',
	'engineering',
	'recruitment',
	'performance',
	'other',
}

type policiesFilterTabLabel =
	| 'All'
	| 'Fundamentals'
	| 'People'
	| 'Engineering'
	| 'Recruitment'
	| 'Performance'
	| 'Other'

export type policiesFilterTabs = TabOption<policiesFilterTabLabel, PoliciesFilterTabValues>[]
export type policiesFilterTab = TabOption<policiesFilterTabLabel, PoliciesFilterTabValues>

// export type policiesFilterTabs = TabOption<policiesFilterTabLabel, PoliciesFilterTabValues>[]
// export type policiesFilterTab = TabOption<policiesFilterTabLabel, PoliciesFilterTabValues>

export enum DetailTabsValues {
	'Content',
	'Edit',
}

export interface DetailTab {
	label: keyof typeof DetailTabsValues
	value: DetailTabsValues
}

// export type Filters = {
//     [key in Exclude<PoliciesFilterTabValues, 'all'>]?: boolean;
//     query?: string;
//   }

export type FilterKey = `${PoliciesFilterTabValues}`
export type Filters = {
	[key in FilterKey]?: boolean
}
// 'Box' = '',
// 'Payroll' = '',
// 'Time' = '',
// 'Trophy' = '',

export enum DocumentIconListValues {
	'Star' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedStar_wmBzG-eLA.png?updatedAt=1714571148847',
	'Diamond' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedDiamond_EWl1tYJ6t.png?updatedAt=1714570894341',
	'Car' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedCar_CXGNkCB7o.png?updatedAt=1714570873084',
	'Error' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedError_IN27hYpM-.png?updatedAt=1714570925718',
	'Gift' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedGift_xGhGWApnf.png?updatedAt=1714570950301',
	'Health' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedHealth_dY9_kWAvg.png?updatedAt=1714570970882',
	'Law' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedLaw_6AIHalIc-.png?updatedAt=1714570999877',
	'Lock' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedLock_rRhaxCyO7.png?updatedAt=1714571021798',
	'Magic' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedMagic_HZDDwe_mN.png?updatedAt=1714571049415',
	'Music' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedMusic_KGZI1VY6E1.png?updatedAt=1714571073131',
	'Note' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedNote_GrZ2xLx_E.png?updatedAt=1714571096776',
	'Rocket' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedRocket_iKlrm4svX.png?updatedAt=1714571124302',
	'Success' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedSuccess_tbjYpU5sD.png?updatedAt=1714571190682',
	'Temperature' = 'https://ik.imagekit.io/peopleplus/tr:w-100,h-100/themedTemperature_dq-t-YVZw.png?updatedAt=1714571214889',
}

export const documentValidationSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	summary: z.string().min(1, 'Short Description is required'),
	content: z.string().min(1, 'Document Content is required'),
	category_name: z.string().min(1, 'Document Category is required'),
	icon: z.string().min(1, 'Icon is required'),
	// status: z.enum(['deleted', 'draft', 'published']).optional(),
})

export interface DocumentData extends z.infer<typeof documentValidationSchema> {
	status?: 'deleted' | 'draft' | 'published'
}

export type updateDocumentData = z.infer<typeof documentValidationSchema> & Document
export type documentFrom = DocumentData
