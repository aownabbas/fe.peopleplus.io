import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import type { organizationalChartState } from 'type/organizationalChart'
import { getOrganizationalChartRequest } from '@service/organizationalChart'

export const initialState: organizationalChartState = {
	orgChartList: [],
	status: 'IDLE',
	error: null,
}

export const getOrganizationalChartAction = createAsyncThunk(
	'get/org/chart',
	async (uuid?: string) => {
		try {
			const { data } = await getOrganizationalChartRequest(uuid)

			return {
				data: data?.data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('getOrganizationalChartAction ', error)
			throw error
		}
	},
)

const orgChartSlice = createSlice({
	name: 'orgChart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getOrganizationalChartAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(getOrganizationalChartAction.fulfilled, (state, action) => {
				const { code, success, data } = action.payload
				if (code === 200 && success) {
					state.orgChartList = data?.employee
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(getOrganizationalChartAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred'
			})
	},
})

export const orgChartSelector = (state: RootState) => state.orgChart

export default orgChartSlice.reducer
