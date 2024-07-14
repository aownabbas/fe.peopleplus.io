import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { globalSearchRequest } from '@service/search'
import { getAuth } from '@utils/AuthHelpers'
import { checkPoint } from '@utils/bug'
import { createPerson } from '@utils/factory'
import type { SearchState } from 'type/search'

interface AppState {
	searchState: SearchState
}

export const initialState: AppState = {
	searchState: {
		employees: [],
		candidates: [],
		status: 'IDLE',
		error: null,
	},
}

export const globalSearchAction = createAsyncThunk('person/search', async (search: string) => {
	try {
		const { data } = await globalSearchRequest({ search })

		return {
			data: data.data,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('globalSearchAction ', error)
		checkPoint('pending error ')
		throw error
	}
})

const appSlice = createSlice({
	name: 'App',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(globalSearchAction.pending, ({ searchState }) => {
				searchState.status = 'LOADING'
				checkPoint('pending ')
			})
			.addCase(globalSearchAction.fulfilled, ({ searchState }, { payload }) => {
				const authUser = getAuth()
				const { code, success, data } = payload
				if (code === 200 && success) {
					searchState.candidates = createPerson(data.candidates)
					if (authUser?.user.type === 'organization') {
						searchState.employees = createPerson(data.employees)
					} else {
						searchState.employees = []
					}

					searchState.status = 'SUCCESS'
				} else {
					searchState.status = 'FAIL'
				}
			})
			.addCase(globalSearchAction.rejected, ({ searchState }, action) => {
				searchState.status = 'FAIL'
				searchState.error = action?.error?.message ?? 'An error occurred in globalSearchAction'
			})
	},
})
export default appSlice.reducer

export const searchStSelector = (state: RootState) => state.app.searchState
