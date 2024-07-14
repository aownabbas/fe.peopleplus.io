import { PaginationState, STATUS, StatusSetting } from './config'

export interface AssetRequestParams {
	name?: string
	category?: string[]
	status?: string[]
	page: number
	perPage: number
}

export interface AssetDetailParams {
	uuid: string
}

export interface AssetCommentParams {
	asset_id: bigint
	commented_by_id: bigint
	comment: string
}
export interface Member {
	employee_uuid: string
	duration: string
	employee_name: string
	photo: string
}
export interface Images {
	id: number
	thumbnail_url: string
}

export interface OldComment {
	commented_by_name: string
	photo: string
	comment: string
	created_at: string
}

export interface Activity {
	old_value: any
	new_value: any
	message: string
	updated_by: string
	photo: string
	created_at: string
}

export interface Document {
	asset_id: number
	created_at: Date
	file_id: string
	id: number
	mime_type: string
	name: string
	size: string
	updated_at: Date
	url: string
	uuid: string
}

export interface Image {
	id: number
	asset_id: number
	file_id: string
	url: string
	thumbnail_url: string
	created_at: Date
	updated_at: Date
}

export interface Asset {
	assignmentDate?: any
	assign_history?: Member[]
	id?: number
	name?: string
	uuid?: string
	tag_id?: string
	status?: string
	employee_id?: string
	department_id?: number
	asset_category_id?: number
	model?: string
	manufacture?: string
	description?: string
	employee?: {
		latest_asset_history: any
		id: number
		first_name: string
		last_name: string
		photo: string
		uuid: string
	}
	department?: { id: number }
	asset_category?: { id: number; name: string }
	allocation_date?: any
	purchase_date?: any
	purchase_currency?: any
	purchase_price?: number
	location?: string
	serial_number?: number
	asset_images: Image[]
	asset_comments: OldComment[]
	activity: Activity[]
	asset_documents: Document[]
	uploadedFiles: any
}

export interface AssetsState extends StatusSetting {
	list: any
	employeeAssets: any
	category: any
	detail: any
	isLoading: boolean
	tempList: any
	asset: Asset
	pagination: PaginationState
	documentStatus: STATUS
	commentStatus: STATUS
}

export interface FeedbackTabs {
	label: string
	value: 0 | 1 | 2
}

export interface NewComment {
	asset_id: number
	commented_by_id: number
	comment: string
}

export interface Comment {
	comment: string
}

export interface DocumentListValues {
	documents: FileList[]
}
