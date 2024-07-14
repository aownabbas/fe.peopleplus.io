import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SettingsState, DeleteSettingsFields, deleteStatePayload } from 'type/settings'
import {
	departmentListRequest,
	departmentModifyRequest,
	assetListRequest,
	skillSetListRequest,
	workLocationListRequest,
	pipelineStagesListRequest,
	settingsDeleteRequest,
	benefitPackageListRequest,
} from '@service/settings'
import { makeDynamicFields } from '@utils/factory'
import { DefaultInputList, DropdownOption } from 'type/config'
import { COUNTRIES, TIMEZONE } from '@config/index'

export const initialState: SettingsState = {
	countriesOptions: COUNTRIES.map(({ name, id }) => ({
		value: id as unknown as string,
		label: name.common,
	})),
	timezoneOptions: TIMEZONE.map((zone) => ({ value: zone, label: zone })),
	departmentsOptions: [],
	skillSetOptions: [],
	workLocationOptions: [],
	assetCategories: [],
	PipelineStageOptions: [],
	PipelineStage: [],
	departments: [{ name: '', details: '' }],
	benefitsPackagesOption: [{ name: '', details: '' }],
	status: 'IDLE',
	deleteStatus: {
		state: {
			uuid: undefined,
		},
		stats: 'IDLE',
	},
	error: null,
}

export const assetListAction = createAsyncThunk('get/assetsCategories', async () => {
	try {
		const { data } = await assetListRequest()
		return {
			data: data?.asset_categories,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('An error occurred while login :', error)
		throw error
	}
})

export const pipelineStagesListAction = createAsyncThunk('get/pipelines', async () => {
	try {
		let pipelineStage: DefaultInputList = [{ name: '', details: '' }]
		const { data } = await pipelineStagesListRequest()
		// console.info('data : ', data)
		pipelineStage = makeDynamicFields({
			rawData: data.data,
			pick: ['name', 'details'],
			path: 'pipeline_stage',
		}) as DefaultInputList

		const pipelineStageOptions = makeDynamicFields({
			rawData: data.data,
			pick: ['name', 'id'],
			drop: ['label', 'value'],
			path: 'pipeline_stage',
		}) as unknown as DropdownOption[]

		return {
			data: [pipelineStage, pipelineStageOptions],
			// data: [{}, {}],
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error(' pipelineStagesListAction ', error)
		throw error
	}
})

export const departmentListAction = createAsyncThunk('get/departments', async () => {
	try {
		let depart: DefaultInputList = [{ name: '', details: '' }]
		const {
			data: { departments },
		} = await departmentListRequest()

		depart = makeDynamicFields({
			rawData: departments,
			pick: ['name', 'details'],
			path: 'department',
		}) as DefaultInputList

		const departOptions = makeDynamicFields({
			rawData: departments,
			pick: ['name', 'uuid'],
			drop: ['label', 'value'],
			path: 'department',
		}) as any

		return {
			data: [depart, departOptions],
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error(' departmentListAction ', error)
		throw error
	}
})

export const benefitPackageListAction = createAsyncThunk('get/benefits/package', async () => {
	try {
		let benefitData: DefaultInputList = [{ name: '', details: '' }]
		const {
			data: { benefit },
		} = await benefitPackageListRequest()

		benefitData = makeDynamicFields({
			rawData: benefit,
			pick: ['name', 'details'],
			path: 'department',
		}) as DefaultInputList

		const benefitOptions = makeDynamicFields({
			rawData: benefit,
			pick: ['name', 'id'],
			drop: ['label', 'value'],
			path: 'department',
		}) as any

		return {
			data: [benefitData, benefitOptions],
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error(' benefitPackageListAction ', error)
		throw error
	}
})

export const skillSetListAction = createAsyncThunk('get/skillSets', async () => {
	try {
		let skills: DropdownOption[] = [{ label: '', value: '' }]
		const {
			data: { skillSet },
		} = await skillSetListRequest()

		skills = makeDynamicFields({
			rawData: skillSet,
			pick: ['name', 'id'],
			drop: ['label', 'value'],
			path: 'skill_set',
		}) as unknown as DropdownOption[]

		return {
			data: skills,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error(' skillSetListAction ', error)
		throw error
	}
})

export const workLocationListAction = createAsyncThunk('get/workLocations', async () => {
	try {
		let workLoc: DropdownOption[] = [{ label: '', value: '' }]
		const {
			data: { WorkLocations },
		} = await workLocationListRequest()

		workLoc = makeDynamicFields({
			rawData: WorkLocations,
			pick: ['name', 'id'],
			drop: ['label', 'value'],
			path: 'work_location',
		}) as unknown as DropdownOption[]

		return {
			data: workLoc,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error(' workLocationListAction ', error)
		throw error
	}
})

export const departmentModifyAction = createAsyncThunk('post/department', async (formData) => {
	try {
		const { data } = await departmentModifyRequest(formData)

		const depart = makeDynamicFields({
			rawData: data.data,
			pick: ['name', 'details'],
			path: 'department',
		}) as DefaultInputList

		return {
			data: depart,
			success: true,
			code: 204,
		}
	} catch (error: any) {
		// const formErrors = formateErrors(error);
		// formik.setErrors(formErrors);
		console.error(' departmentModifyAction ', error)
		throw error
	}
})

export const settingsDeleteAction = createAsyncThunk(
	'delete/settings',
	async (deleteObj: DeleteSettingsFields) => {
		try {
			const { data } = await settingsDeleteRequest(deleteObj)
			return {
				data: { setting: '' },
				success: true,
				code: 204,
			}
		} catch (error: any) {
			console.error('settingsDeleteAction ', error)
			throw error
			// return rejectWithValue(error)
		}
	},
)

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		deleteState: ({ deleteStatus }, { payload }: deleteStatePayload) => {
			deleteStatus.state.uuid = payload?.uuid
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(assetListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(assetListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.assetCategories = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(assetListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred'
			})

		builder
			.addCase(pipelineStagesListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(pipelineStagesListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const [pipelineStage, pipelineStageOptions] = data
					state.PipelineStage = pipelineStage as DefaultInputList
					state.PipelineStageOptions = pipelineStageOptions as DropdownOption[]
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(pipelineStagesListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in pipelineStagesListAction'
			})

		builder
			.addCase(departmentListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(departmentListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const [depart, departOPtions] = data
					state.departments = depart
					state.departmentsOptions = departOPtions
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(departmentListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in departmentListAction'
			})

		builder
			.addCase(benefitPackageListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(benefitPackageListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const [benefitOptions] = data
					state.benefitsPackagesOption = benefitOptions
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(benefitPackageListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in benefitPackageListAction'
			})

		builder
			.addCase(departmentModifyAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(departmentModifyAction.fulfilled, (state, { payload }) => {
				const { code, success, data }: any = payload
				if (code === 204 && success) {
					state.departments = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(departmentModifyAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in departmentModifyAction'
			})

		builder
			.addCase(settingsDeleteAction.pending, (state) => {
				state.deleteStatus.stats = 'LOADING'
			})
			.addCase(settingsDeleteAction.fulfilled, (state, { payload }) => {
				const { code, success, data }: any = payload
				if (code === 204 && success) {
					// state.departments = data
					state.deleteStatus.stats = 'SUCCESS'
					state.deleteStatus.state.uuid = undefined
				} else {
					state.deleteStatus.stats = 'FAIL'
					state.deleteStatus.state.uuid = undefined
				}
			})
			.addCase(settingsDeleteAction.rejected, (state, action) => {
				state.deleteStatus.stats = 'FAIL'
				state.deleteStatus.state.uuid = undefined
				state.error = action?.error?.message ?? 'An error occurred in settingsDeleteAction'
			})

		builder
			.addCase(workLocationListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(workLocationListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					// const [depart, departOPtions] = data
					// state.departments = depart
					state.workLocationOptions = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(workLocationListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in workLocationListAction'
			})

		builder
			.addCase(skillSetListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(skillSetListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.skillSetOptions = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(skillSetListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in skillSetListAction'
			})
	},
})

export const settingsSelector = (state: RootState) => state.settings
export const PipelineStageOptionsSelector = (state: RootState) =>
	state.settings.PipelineStageOptions
export const isDeletingSelector = (state: RootState) => state.settings.deleteStatus

export const { deleteState } = settingsSlice.actions
export default settingsSlice.reducer
