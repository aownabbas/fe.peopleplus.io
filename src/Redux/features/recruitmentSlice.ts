import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import {
	candidateActivityListRequest,
	candidateNoteListRequest,
	createCandidateNoteRequest,
	createJobRequest,
	deleteJobRequest,
	getJobRequest,
	jobListRequest,
	updateJobRequest,
} from '@service/recruitment'
import type { JobStatus, NewJob, NewJobForm, NewNote, RecruitmentState } from 'type/recruitment'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'
import { arrayToCSV } from '@blackfiredev/utils'
import { table } from '@config/index'
import { transformCandidates } from '@utils/factory'
import { STATUS } from 'type/config'

export const initialState: RecruitmentState = {
	jobList: [],
	job: {
		id: 0,
		uuid: '',
		title: '',
		end_date: null,
		start_date: null,
		status: 'Open',
		created_at: '',
		description: '',
		salary_range: '',
		department: null,
		candidatesCount: 0,
		short_description: '',
		candidate_stages_count: {},
		employment_type: 'full-time',
		hiring_managers: [],
		experience_level: 'entry_level',
		travel_requirement: 'None',
		application_email: '',
		job_id: '',
		dead_line: '',
		location: null,
		pipelines: {},
		skill_sets: [],
		organization: null,
	},

	Candidate: [],
	status: 'IDLE',
	error: null,
	jobState: {
		total: 0,
		totalApplicant: 0,
		activeJobs: 0,
	},
	jobPaginateData: {
		page: table.pageStartFrom,
		per_page: table.rowsPerPage,
	},
	activityList: [],
	noteList: [],
	noteStatus: 'IDLE',
	jobStatus: 'IDLE',
	jobSearchStatus: 'IDLE',
}

export const candidateActivityListAction = createAsyncThunk(
	'get/ActivityList',
	async (uuid: string) => {
		try {
			const { data } = await candidateActivityListRequest(uuid)

			console.info('data=> ', data)

			return {
				data: data.data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('candidateActivityListAction ', error)
			throw error
		}
	},
)
export const candidateNoteListAction = createAsyncThunk('get/NoteList', async (uuid: string) => {
	try {
		const { data } = await candidateNoteListRequest(uuid)

		console.info('data=> ', data)

		return {
			data: data.data,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('candidateNoteListAction ', error)
		throw error
	}
})

export const createCandidateNoteAction = createAsyncThunk('post/note', async (newNote: NewNote) => {
	try {
		const { data } = await createCandidateNoteRequest(newNote)

		// console.log('note :', data.data)
		return {
			data: data.data,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('createCandidateNoteAction ', error)
		throw error
	}
})

export const jobListAction = createAsyncThunk(
	'get/jobList',
	async ({ paginationData, search }: { paginationData: any; search?: string }) => {
		try {
			// console.info('paginationData :', paginationData)
			const { data } = await jobListRequest({
				...paginationData,
				page: paginationData.page + 1,
				search,
			})
			const { jobs, page, per_page, total, totalApplicant, activeJobs } = data.data
			// console.info('data : ')

			const jobPaginateData = { page: paginationData.page, per_page }
			const jobState = { total, totalApplicant, activeJobs }
			return {
				search,
				data: [jobs, jobState, jobPaginateData],
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('jobListAction ', error)
			throw error
		}
	},
)

export const getJobAction = createAsyncThunk('get/job', async (uuid: string) => {
	try {
		const { data } = await getJobRequest(uuid)

		const job = data.data

		const candidate = transformCandidates(job.pipelines)

		return {
			data: [candidate, job],
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('getJobAction ', error)
		throw error
	}
})

export const createJobAction = createAsyncThunk(
	'post/Job',
	async (form: { values: NewJobForm; reset: () => void }) => {
		const { reset, values } = form
		try {
			const newJob: NewJob = {
				...values,
				skill_sets: arrayToCSV(values.skill_sets),
				hiring_managers: arrayToCSV(values.hiring_managers),
			}
			const { data } = await createJobRequest(newJob)
			// console.log('add job data  :  ', data)
			SHOW_SUCCESS({ state: data?.message, msg: data?.message })

			reset()
			return {
				data: data.job,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('createJobAction error:', error)
			SHOW_ERROR({ msg: error.response.data.message || 'An error occurred while submitting Data ' })
			throw error
		}
	},
)

export const deleteJobAction = createAsyncThunk('delete/Job', async (uuid: string) => {
	try {
		const { data } = await deleteJobRequest(uuid)

		SHOW_SUCCESS({ msg: data.message })

		return {
			data: uuid,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('createJobAction error:', error)
		SHOW_ERROR({ msg: error.response.data.message || 'An error occurred while submitting Data ' })
		throw error
	}
})

export const updateJobAction = createAsyncThunk(
	'update/Job',
	async (form: { values: NewJobForm; reset: () => void }) => {
		const { values } = form
		try {
			const updatedJob = {
				...values,
				skill_sets: arrayToCSV(values.skill_sets),
				hiring_managers: arrayToCSV(values.hiring_managers),
			}
			const { data } = await updateJobRequest(updatedJob)
			console.log('add job data  :  ', data)
			SHOW_SUCCESS({ msg: Object.keys(data)[0] })

			return {
				data: data[Object.keys(data)[0]],
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('updateJobAction error:', error)
			SHOW_ERROR({ msg: error.response.data.message || 'An error occurred while submitting Data ' })
			throw error
		}
	},
)
const recruitmentSlice = createSlice({
	name: 'recruitment',
	initialState,
	reducers: {
		handleJobListPagination: (
			state,
			{ payload }: PayloadAction<{ key: 'page' | 'per_page'; value: number }>,
		) => {
			const { key, value } = payload
			state.jobPaginateData[key] = value
		},
		handleJobStatus: (state, { payload }: PayloadAction<JobStatus>) => {
			state.job.status = payload
		},
		handleJobListSearchStatus: (state: RecruitmentState, { payload }: PayloadAction<STATUS>) => {
			state.jobSearchStatus = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(jobListAction.pending, (state) => {
				if (state.jobList.length > 0) {
					state.status = 'IDLE'
				} else {
					state.status = 'LOADING'
				}
			})
			.addCase(jobListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const [jobs, jobState, jobPaginateData] = data

					state.jobPaginateData = jobPaginateData
					state.jobState = jobState
					state.jobList = jobs

					state.status = 'SUCCESS'
					state.jobSearchStatus = 'SUCCESS'
				} else {
					state.status = 'FAIL'
					state.jobSearchStatus = 'FAIL'
				}
			})
			.addCase(jobListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred in jobListAction'
			})

		builder
			.addCase(createJobAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(createJobAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					// state.jobList.push(data)

					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(createJobAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred createJobAction redux'
			})

		builder
			.addCase(getJobAction.pending, (state) => {
				state.jobStatus = 'LOADING'
			})
			.addCase(getJobAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const [candidate, job] = data
					state.job = job
					state.Candidate = candidate
					state.jobStatus = 'SUCCESS'
				} else {
					state.jobStatus = 'FAIL'
				}
			})
			.addCase(getJobAction.rejected, (state, action) => {
				state.jobStatus = 'FAIL'
				state.error = action.error.message ?? 'An error occurred getJobAction redux'
			})

		builder
			.addCase(candidateActivityListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(candidateActivityListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.activityList = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(candidateActivityListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred candidateActivityListAction redux'
			})

		builder
			.addCase(candidateNoteListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(candidateNoteListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.noteList = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(candidateNoteListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred candidateNoteListAction redux'
			})

		builder
			.addCase(createCandidateNoteAction.pending, (state) => {
				state.noteStatus = 'LOADING'
			})
			.addCase(createCandidateNoteAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.noteList.push(data)
					state.noteStatus = 'SUCCESS'
				} else {
					state.noteStatus = 'FAIL'
				}
			})
			.addCase(createCandidateNoteAction.rejected, (state, action) => {
				state.noteStatus = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in createCandidateNoteAction'
			})

		builder
			.addCase(deleteJobAction.pending, (state) => {
				state.jobStatus = 'LOADING'
			})
			.addCase(deleteJobAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.jobList.filter((job) => job.uuid !== data)
					state.jobStatus = 'SUCCESS'
				} else {
					state.jobStatus = 'FAIL'
				}
			})
			.addCase(deleteJobAction.rejected, (state, action) => {
				state.jobStatus = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in deleteJobAction'
			})

		builder
			.addCase(updateJobAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(updateJobAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.job = data

					state.jobList = state.jobList.map((job) => {
						if (job.id === data.id) {
							return data
						} else {
							return job
						}
					})
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(updateJobAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in updateJobAction'
			})
	},
})

export const { handleJobListPagination, handleJobStatus, handleJobListSearchStatus } =
	recruitmentSlice.actions

export const recruitmentSelector = (state: RootState) => state.recruitment
export const candidateSelector = (state: RootState) => state.recruitment.Candidate
export const noteListSelector = (state: RootState) => state.recruitment.noteList
export const activityListSelector = (state: RootState) => state.recruitment.activityList
export const noteStatusSelector = (state: RootState) => state.recruitment.noteStatus
export const recruitmentStatusSelector = (state: RootState) => state.recruitment.status
export const jobSelector = (state: RootState) => state.recruitment.job
export const jobSearchStatusSelector = (state: RootState) => state.recruitment.jobSearchStatus

export default recruitmentSlice.reducer
