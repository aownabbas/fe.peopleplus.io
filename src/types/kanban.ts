import { PayloadAction } from '@reduxjs/toolkit'
import { StatusSetting } from './config'
import { Candidate } from './recruitment'

export interface Stage {
	id: number
	uuid: string
	organization_id: number
	name: string
	description: string
	created_at: null | Date
	updated_at: null | Date
}
export interface Attachment {
	id: string
	type: 'image' | 'file'
	url: string
}

export interface Comment {
	id: string
	authorId: string
	createdAt: Date
	message: string
}

// export interface Candidate {
// 	id: string
// 	attachments: Attachment[]
// 	columnId: string
// 	comments: Comment[]
// 	due: number | null
// 	email: string
// 	phonenumber: string
// 	name: string
// }

export interface Column {
	id: string
	candidateIds: string[]
	name: string
}

export interface Member {
	id: string
	avatar: string | null
	name: string
}

export interface Board {
	members: Member[]
	columns: Column[]
	candidates: Candidate[]
}

export interface CandidateState {
	byId: Record<string, Candidate>
	allIds: string[]
}

export interface ColumnState {
	byId: Record<string, Column>
	allIds: string[]
}

export type moveCandidateParams = {
	candidateId: string
	destinationPosition: number
	sourcePosition: number
	sourceId: string
	destinationId: string
	stageId: number
}

export type GetBoardAction = PayloadAction<Board>

export type moveCandidateAction = PayloadAction<moveCandidateParams>
export type moveCandidateFromDropDownAction = PayloadAction<{
	candidateId: string
	destinationId: string
	sourceId: string
	stageId: number
}>

export type AddCommentAction = PayloadAction<{ candidateId: string; comment: Comment }>

export interface KanbanState extends StatusSetting {
	pipelineStages: Stage[]
	columns: ColumnState
	candidates: CandidateState
	members: {
		byId: Record<string, Member>
		allIds: string[]
	}
	cache: DnDRequestData | undefined
}

export interface DnDRequestData {
	from_pipeline_stageId: string
	target_pipeline_stageId: string
	dragged_candidate_id: string
	candidates_order: { [index: number]: string }[] // exam [{ '0': '3' }, { '1': '4' }, { '2': '5' }]
	job_id?: number
	sourcePosition?: number
}
