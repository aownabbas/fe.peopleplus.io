import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../store'

import { dashboardStatusRequest } from '@service/employee/dashboard'

import type { DashboardState } from 'type/employee/dashboard'

export const initialState: DashboardState = {
	stats: {
		candidateCount: 0,
	},
	workinghours: {
		hours: 0,
		minutes: 0,
	},
	attendence: [],
	status: 'IDLE',
	error: null,
}

export const dashboardStatusAction = createAsyncThunk('get/emp/status', async () => {
	try {
		const { data } = await dashboardStatusRequest()
		return {
			data: data.data,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error(' dashboardStatusAction ', error)
		throw error
	}
})

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(dashboardStatusAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(dashboardStatusAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.stats = { candidateCount: data.candidateCount }
					state.workinghours = data.workinghours
					state.attendence = data.attendence
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(dashboardStatusAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in dashboardStatusAction'
			})
	},
})

export const statisticsSelector = (state: RootState) => state.empDashboard.stats
export default dashboardSlice.reducer
