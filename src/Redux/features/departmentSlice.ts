/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getDepartmentRequest } from '@service/department'

interface DocumentState {
	data: []
	loading: 'idle' | 'pending' | 'succeeded' | 'failed'
	error: string | null
}

export const initialState: DocumentState = {
	data: [],
	loading: 'idle',
	error: null,
}

export const fetchDepartment = createAsyncThunk('document/listing', async () => {
	try {
		const response = await getDepartmentRequest() // Invoke the function to get the Promise
		const data = response.data // Assuming your API response has a 'data' property

		return {
			data: data.departments,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('An error occurred while login :', error)
		throw error // Rethrow the error to be caught by the rejected action
	}
})

const departmentSlice = createSlice({
	name: 'document',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDepartment.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(fetchDepartment.fulfilled, (state, action) => {
				const { code, success, data } = action.payload
				if (code === 200 && success) {
					state.data = data
					state.loading = 'succeeded'
				} else {
					state.loading = 'failed'
				}
			})
			.addCase(fetchDepartment.rejected, (state, action) => {
				state.loading = 'failed'
				state.error = action.error.message ?? 'An error occurred'
			})
	},
})

export const documentSelector = (state: RootState) => state.department

export default departmentSlice.reducer
