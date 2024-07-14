import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { saveEventRequest, eventListRequest, deleteEventRequest } from '@service/event'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'

import type { EventsState } from 'type/event'
import type { CalendarEvent } from 'type/upcomingevents'
import { countCategoryEvents } from '@utils/countCategoryEvents'

type EventCategory = 'event' | 'holidays' | 'birthday' | 'misc'
import { getAuth } from '@utils/AuthHelpers'

export const initialState: EventsState = {
	status: 'IDLE',
	isModalOpen: false,
	event: {
		listing: [],
		stats: [],
		detail: null,
		// add the selectedDate property here
		selectedDate: new Date(),
		categoryCounts: {
			event: 0,
			holidays: 0,
			birthday: 0,
			misc: 0,
		},
	},
	error: null,
	selectedDate: undefined,
}

export const eventStoreAction = createAsyncThunk('event/store', async (formData: FormData) => {
	try {
		const { data } = await saveEventRequest(formData)
		SHOW_SUCCESS({ msg: 'Record Added Successfully' })
		return {
			data: data,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		SHOW_ERROR({ msg: 'Something Went Wrong' })
		console.error('eventStoreAction ', error)
		throw error
	}
})

export const eventListAction = createAsyncThunk('event/list', async (params?: any) => {
	try {
		const { data } = await eventListRequest(params)
		return {
			data: data,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('eventStoreAction ', error)
		throw error
	}
})

export const eventDeleteAction = createAsyncThunk(
	'trash/event',
	async ({ uuid, documentUuid }: { uuid: string; documentUuid?: string }) => {
		try {
			const { data } = await deleteEventRequest(uuid)
			SHOW_SUCCESS({ msg: 'Record Deleted Successfully' })
			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			SHOW_ERROR({ msg: 'Something Went Wrong' })
			throw error
		}
	},
)

const eventSlice = createSlice({
	name: 'App',
	initialState,
	reducers: {
		openModal: (state) => {
			state.isModalOpen = true
			state.event.detail = null
		},

		closeModal: (state) => {
			state.event.detail = null
			state.isModalOpen = false
		},

		editEvent: (state, action) => {
			const authUser = getAuth()
			const { eventId } = action.payload
			state.event.detail = state.event.listing.find((item: any) => item.id == eventId)
			const detailEvent = state.event.detail
			if (detailEvent.type == 'custom') {
				state.isModalOpen = true
			}

			if (detailEvent.type == 'employee' && authUser?.user.type === 'organization') {
				state.isModalOpen = false
			}
		},
		setSelectedDate: (state, action) => {
			state.selectedDate = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(eventStoreAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(eventStoreAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const eventData = data?.event
					const existingIndex = state.event.listing.findIndex(
						(item: { id: any }) => item.id === eventData.id,
					)
					if (existingIndex !== -1) {
						state.event.listing[existingIndex] = eventData
					} else {
						state.event.listing.push(eventData)
					}

					const eventListing = state.event.listing

					state.event.categoryCounts = countCategoryEvents(eventListing)

					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(eventStoreAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in getEmployeeProfileAction'
			})

		builder
			.addCase(eventDeleteAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(eventDeleteAction.fulfilled, (state, { payload, meta }) => {
				const { code, success, data } = payload
				const { uuid } = meta.arg
				if (code === 200 && success) {
					state.event.listing = state.event.listing.filter((item: any) => item.uuid !== uuid)
					const eventListing = state.event.listing
					state.event.categoryCounts = countCategoryEvents(eventListing)
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(eventDeleteAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in deleteEmployeeDocumentAction'
			})

		builder
			.addCase(eventListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(eventListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.event.detail = null
					const eventListing = data?.events
					state.event.listing = eventListing
					state.event.categoryCounts = countCategoryEvents(eventListing)

					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(eventListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in getEmployeeProfileAction'
			})
	},
})

export const { openModal, closeModal, editEvent, setSelectedDate } = eventSlice.actions
export default eventSlice.reducer
export const eventSelector = (state: RootState) => state.event
