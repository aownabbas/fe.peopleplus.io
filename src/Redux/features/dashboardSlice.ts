import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { dashboardStatusRequest } from '@service/dashboard'

import type { DashboardState } from 'type/dashboard'

export const initialState: DashboardState = {
	status: 'IDLE',
	error: null,
	stats: {
		candidateCount: 0,
		employeeCount: 0,
		assetCount: 0,
		jobCount: 0,
	},
	activeEmployees: [],
	events: [],
	jobs: [],
}

export const dashboardStatusAction = createAsyncThunk('get/status', async () => {
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
					state.stats = {
						assetCount: data.assetCount,
						candidateCount: data.candidateCount,
						employeeCount: data.employeeCount,
						jobCount: data.jobCount,
					}

					state.activeEmployees = data.activeEmployees
					state.events = data.events
					state.jobs = data.jobs

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

export const statisticsSelector = (state: RootState) => state.dashboard.stats
export const statusSelector = (state: RootState) => state.dashboard.status
export const dashboardJobsSelector = (state: RootState) => state.dashboard
export const dashboardEventsSelector = (state: RootState) => state.dashboard.events
export const dashboardEmployeesSelector = (state: RootState) => state.dashboard.activeEmployees

export default dashboardSlice.reducer
