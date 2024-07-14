import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type {
	KanbanState,
	GetBoardAction,
	moveCandidateAction,
	AddCommentAction,
	moveCandidateFromDropDownAction,
} from 'type/kanban'
import { objFromArray } from '@utils/obj-from-array'
import { pipelineStagesListRequest } from '@service/settings'
import { createColumn, swapValue } from '@utils/factory'

import type { Candidate } from 'type/recruitment'
import { checkPoint } from '@utils/bug'
import { SHOW_INFO } from '@utils/ToastMessage'

const initialState: KanbanState = {
	pipelineStages: [],
	columns: {
		byId: {},
		allIds: [],
	},
	candidates: {
		byId: {},
		allIds: [],
	},
	members: {
		byId: {},
		allIds: [],
	},
	status: 'IDLE',
	error: null,
	cache: undefined,
}

export const prepareBoardAction = createAsyncThunk(
	'get/prepareBoard',
	async (candidate: Candidate[]) => {
		checkPoint(' prepareBoard ')
		try {
			const { data } = await pipelineStagesListRequest()

			const newCandidateList = swapValue(candidate, data.data)
			const newColumn = createColumn(data.data, newCandidateList)

			return {
				data: [newColumn, newCandidateList],
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('prepareBoardAction error: ', error)
			throw error
		}
	},
)

const reducers = {
	resetBoard(state: KanbanState) {
		return initialState
	},
	moveCandidateFromDropdown(state: KanbanState, action: moveCandidateFromDropDownAction): void {
		const { candidateId, destinationId, sourceId, stageId } = action.payload

		if (destinationId === sourceId) {
			SHOW_INFO({ msg: 'you can not move to same stage' })
			return
		}
		// Remove candidate from source column
		state.columns.byId[sourceId].candidateIds = state.columns.byId[sourceId].candidateIds.filter(
			(_candidateId) => _candidateId !== candidateId,
		)

		// If columnId exists, it means that we have to add the candidate to the new column
		if (destinationId) {
			state.candidates.byId[candidateId].columnId = destinationId // Change candidate's destination columnId reference
			state.candidates.byId[candidateId].stageId = stageId
			state.columns.byId[destinationId].candidateIds.unshift(candidateId) // Push the candidateId to the specified position
		}
	},

	moveCandidate(state: KanbanState, action: moveCandidateAction): void {
		const { candidateId, destinationId, destinationPosition, sourceId, sourcePosition, stageId } =
			action.payload

		// Remove candidate from source column
		state.columns.byId[sourceId].candidateIds = state.columns.byId[sourceId].candidateIds.filter(
			(_candidateId) => _candidateId !== candidateId,
		)

		// If columnId exists, it means that we have to add the candidate to the new column
		if (destinationId) {
			state.candidates.byId[candidateId].columnId = destinationId // Change candidate's destination columnId reference as uuid
			state.candidates.byId[candidateId].stageId = stageId // Change candidate's destination columnId reference with id
			state.columns.byId[destinationId].candidateIds.splice(destinationPosition, 0, candidateId) // Push the candidateId to the specified position
		} else {
			state.columns.byId[sourceId].candidateIds.splice(destinationPosition, 0, candidateId)
		}

		// Get ordered candidates in the column
		const candidates_order = state.columns.byId[destinationId || sourceId].candidateIds.map(
			(candidateId, index) => ({
				[index]: candidateId,
			}),
		)

		state.cache = {
			sourcePosition,
			candidates_order,
			dragged_candidate_id: candidateId,
			from_pipeline_stageId: sourceId,
			target_pipeline_stageId: destinationId as string,
		}
		// console.info(candidates_order)
	},

	revertLastMove(state: KanbanState) {
		// Retrieve the cache containing the last moveCandidate action's details
		// it need to solve blow type errors
		// if (
		// 	!state.cache ||
		// 	!('candidates_order' in state.cache) ||
		// 	!state.cache.dragged_candidate_id ||
		// 	!state.cache.sourcePosition ||
		// 	!state.cache.from_pipeline_stageId ||
		// 	!state.cache.target_pipeline_stageId
		// ) {
		// 	SHOW_INFO({ msg: 'cache is Empty' })
		// 	return
		// }
		// @ts-ignore
		const { sourcePosition, dragged_candidate_id, from_pipeline_stageId, target_pipeline_stageId } =
			state.cache

		// Find the source and destination columns based on the cache
		const sourceId = from_pipeline_stageId
		const destinationId = target_pipeline_stageId
		const candidateId = dragged_candidate_id

		// find and remove candidate from destination
		state.columns.byId[destinationId].candidateIds = state.columns.byId[
			destinationId
		].candidateIds.filter((_candidateId) => _candidateId !== candidateId)

		// If columnId exists, it means that we have to add the candidate to the new column
		if (sourceId) {
			state.candidates.byId[candidateId].columnId = sourceId // Change candidate's destination columnId reference
			state.columns.byId[sourceId].candidateIds.splice(sourcePosition, 0, candidateId) // Push the candidateId to the specified position
		} else {
			state.columns.byId[sourceId].candidateIds.splice(sourcePosition, 0, candidateId)
		}

		state.cache = undefined
	},
}

export const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers,
	extraReducers(builder) {
		builder
			.addCase(prepareBoardAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(prepareBoardAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const [columns, candidates] = data
					// console.info('getBoard :', data)

					// const board: Board = {
					// 	columns: createColumn(data),
					// 	members: [],
					// 	candidates,
					// }
					state.columns.byId = objFromArray(columns)
					state.columns.allIds = Object.keys(state.columns.byId)

					state.candidates.byId = objFromArray(candidates)
					state.candidates.allIds = Object.keys(state.candidates.byId)
					// state.members.byId = objFromArray(board.members)
					// state.members.allIds = Object.keys(state.members.byId)

					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(prepareBoardAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in prepareBoardAction'
			})
	},
})

export const kanbanActions = kanbanSlice.actions

export default kanbanSlice.reducer

export const columnsSelector = (state: RootState) => state.kanban.columns
export const kanbanSelector = (state: RootState) => state.kanban
export const candidateSelector = (state: RootState) => state.kanban.candidates
export const membersSelector = (state: RootState) => state.kanban.members
export const kanbanCacheSelector = (state: RootState) => state.kanban.cache
