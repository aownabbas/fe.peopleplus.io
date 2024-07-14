/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getChatBotDataRequest } from '@service/general'

interface DocumentState {
	data: {
		employees: any[]
		assets: any[]
	}
	loading: 'idle' | 'pending' | 'succeeded' | 'failed'
	error: string | null
}

export const initialState: DocumentState = {
	data: {
		employees: [],
		assets: [],
	},
	loading: 'idle',
	error: null,
}

export const getChatBotAllDataAction = createAsyncThunk('chatbot/listing', async () => {
	try {
		const response = await getChatBotDataRequest()
		const data = response.data

		return {
			data: data.details,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('An error occurred while login :', error)
		throw error
	}
})

const generalSlice = createSlice({
	name: 'general',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getChatBotAllDataAction.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(getChatBotAllDataAction.fulfilled, (state, action) => {
				const { code, success, data } = action.payload
				if (code === 200 && success) {
					state.data = data
					state.loading = 'succeeded'
				} else {
					state.loading = 'failed'
				}
			})
			.addCase(getChatBotAllDataAction.rejected, (state, action) => {
				state.loading = 'failed'
				state.error = action.error.message ?? 'An error occurred'
			})
	},
})

export const generalSelector = (state: RootState) => state.general

export default generalSlice.reducer
