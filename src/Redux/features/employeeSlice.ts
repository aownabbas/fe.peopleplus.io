/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { EmployeeState } from '../../types/employee'
import {
	employeeListRequest,
	employeeDepartmentListRequest,
	employeeProfileRequest,
	employeeDocumentListRequest,
	saveEmployeeDocumentRequest,
	saveEmployeeRequest,
	employeeDocumentDeleteRequest,
	updateEmployeeDocumentRequest,
	updateEmployeeProfileRequest,
	documentCategoryListRequest,
	employeeOnBoardingListRequest,
	employeeCommentsListRequest,
	employeeAddCommentRequest,
} from '../../services/employee'
import { makeDynamicFields } from '@utils/factory'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'
import { updateSpecificObject } from '@utils/global-functions'
import { any } from 'prop-types'

export const initialState: EmployeeState = {
	list: [],
	isLoading: true,
	documentCategoryLoading: true,
	unlinkedList: [],
	tempUnLinkedList: [],
	onBoardingList: [],
	employeePagination: {
		page: 0,
		per_page: 10,
		total_records: 0,
	},
	unlinkedEmployeePagination: {
		page: 0,
		per_page: 10,
		total_records: 0,
	},
	dropDownList: [],
	tempList: [],
	documents: [],
	departments: [],
	detail: {},
	status: 'IDLE',
	isOpen: false,
	feedbackLoading:false,
	isAlertDialogOpen: false,
	selectedDocumentCategory: null,
	deletedDocumentId: null,
	error: null,
	Options: [],
	document_categories: [],
	employeeFeedbackComments: [],
	employeeFeedback:{},
	loading: true
}

export const employeeListAction = createAsyncThunk('get/employees', async () => {
	try {
		const {
			data: { employees },
		} = await employeeListRequest()

		const employee = employees.data.map((em: { first_name: any; last_name: any }) => ({
			...em,
			fullName: `${em.first_name} ${em.last_name}`,
		}))

		const activeEmployees = employee.filter((em: { status: string }) => em.status === 'active')

		const employeesOption = makeDynamicFields({
			rawData: activeEmployees,
			pick: ['fullName', 'id'],
			drop: ['label', 'value'],
			path: 'employees',
		}) as any

		return {
			data: [employee, employeesOption],
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error(' employeeListAction ', error)
		throw error
	}
})

export const employeeDepartmentListAction = createAsyncThunk(
	'get/employees/departments',
	async () => {
		try {
			const {
				data: { departments },
			} = await employeeDepartmentListRequest()
			return {
				data: departments,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error(' employeeListAction ', error)
			throw error
		}
	},
)

export const employeeDocumentStoreAction = createAsyncThunk(
	'post/employee/document',
	async (formData: any) => {
		try {
			const { data } = await saveEmployeeDocumentRequest(formData)
			SHOW_SUCCESS({ msg: 'Record Added Successfully' })
			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			SHOW_ERROR({ msg: 'Something Went Wrong' })
			console.error('employeeDocumentStoreAction ', error)
			throw error
		}
	},
)

export const employeeStoreAction = createAsyncThunk('employee/store', async (formData: any) => {
	try {
		const { data } = await saveEmployeeRequest(formData)
		return {
			data: data,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		SHOW_ERROR({ msg: error.response.data.message })
		console.error('employeeDocumentStoreAction ', error)
		throw error
	}
})

export const getEmployeeDocumentAction = createAsyncThunk(
	'get/employee/documents',
	async (params?: any) => {
		try {
			const { data } = await employeeDocumentListRequest(params)

			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error(' getEmployeeDocumentAction ', error)
			throw error
		}
	},
)

export const updateEmployeeProfileAction = createAsyncThunk(
	'update/employee/profile',
	async ({ uuid, formData }: { uuid: string; formData: FormData }) => {
		try {
			const { data } = await updateEmployeeProfileRequest(uuid, formData)

			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			SHOW_ERROR({ msg: error.response.data.message })
			console.error('updateEmployeeProfileAction ', error)
			throw error
		}
	},
)

export const getEmployeeProfileAction: any = createAsyncThunk(
	'get/employee/profile',
	async (uuid?: string) => {
		try {
			const { data } = await employeeProfileRequest(uuid)
			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('getEmployeeProfileAction ', error)
			throw error
		}
	},
)

export const updateEmployeeDocumentAction = createAsyncThunk(
	'update/employee/document',
	async ({ uuid, formData }: { uuid: string; formData: FormData }) => {
		try {
			const { data } = await updateEmployeeDocumentRequest(uuid, formData)
			SHOW_SUCCESS({ msg: 'Record Updated Successfully' })
			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			SHOW_SUCCESS({ msg: 'Something Went Wrong' })
			console.error('updateEmployeeDocumentAction ', error)
			throw error
		}
	},
)

export const deleteEmployeeDocumentAction = createAsyncThunk(
	'trash/employee/document',
	async ({ uuid, documentUuid }: { uuid: string; documentUuid?: string }) => {
		try {
			const { data } = await employeeDocumentDeleteRequest(uuid)
			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('deleteEmployeeDocumentAction ', error)
			throw error
		}
	},
)

export const getEmployeeProfileCategoriesAction = createAsyncThunk(
	'get/employee/profile/categories',
	async (uuid?: string) => {
		try {
			const { data } = await documentCategoryListRequest({ uuid })
			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('getEmployeeProfileAction ', error)
			throw error
		}
	},
)

export const getEmployeeOnboardingAction: any = createAsyncThunk(
	'get/employee/onboardings',
	async (uuid?: string) => {
		try {
			const { data } = await employeeOnBoardingListRequest({ uuid })

			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('getEmployeeOnboardingAction ', error)
			throw error
		}
	},
)

export const getEmployeeCommentsAction: any = createAsyncThunk(
	'get/employee/comments/list',
	async (uuid?: string) => {
		try {
			const { data } = await employeeCommentsListRequest(uuid)
			return {
				data: data?.data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('getEmployeeCommentsAction ', error)
			throw error
		}
	},
)

export const addEmployeeFeedbackAction: any = createAsyncThunk(
	'add/employee/feedback',
	async (comment) => {
			return {
				data: comment,
				success: true,
				code: 200,
			}
	},
)

const employeeSlice = createSlice({
	name: 'employee',
	initialState,
	reducers: {
		filterEmployee: (state, action) => {
			const { items, filters, listPropertyKey, paginationStateKey } = action.payload
			const { page, per_page } = filters
			let filteredEmployees = items.filter((item: any) => {
				for (const key in filters) {
					const filterValue = filters[key]
					if (filterValue) {
						if (key === 'department_id' && item.department?.id !== filterValue) {
							return false
						}
						if (key === 'name') {
							const filterLower = filterValue.toLowerCase()
							const emailLower = item.email.toLowerCase()
							const firstNameLower = item.first_name.toLowerCase()
							const lastNameLower = item.last_name.toLowerCase()

							// Combine first name and last name with a space in between
							const fullNameLower = `${firstNameLower} ${lastNameLower}`

							if (
								!emailLower.includes(filterLower) &&
								!firstNameLower.includes(filterLower) &&
								!lastNameLower.includes(filterLower) &&
								!fullNameLower.includes(filterLower)
							) {
								return false
							}
						}
					}
				}
				return true
			})

			const totalRecords = filteredEmployees.length

			const updatedPagination = {
				...(state as any)[paginationStateKey],
				page: page,
				per_page: per_page,
				total_records: totalRecords,
			}

			const startIndex = page * per_page
			const endIndex = Math.min(startIndex + per_page, totalRecords)
			filteredEmployees = filteredEmployees.slice(startIndex, endIndex)

			return {
				...state,
				[listPropertyKey]: filteredEmployees,
				[paginationStateKey]: updatedPagination,
			}
		},
		openAlertDialogModal: (state) => {
			state.isAlertDialogOpen = true
		},

		closeAlertDialogModal: (state) => {
			state.isAlertDialogOpen = false
		},

		openModal: (state, action) => {
			state.isOpen = true
			state.selectedDocumentCategory = action.payload.categoryId
			state.deletedDocumentId = action.payload.documentId
		},

		editDocument: (state, action) => {
			state.selectedDocumentCategory = action.payload
		},

		closeModal: (state) => {
			state.isOpen = false
			state.selectedDocumentCategory = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(deleteEmployeeDocumentAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(deleteEmployeeDocumentAction.fulfilled, (state, { payload, meta }) => {
				const { code, success, data } = payload
				const { uuid } = meta.arg
				if (code === 200 && success) {
					state.documents.data = state.documents.data.filter((item: any) => item.uuid !== uuid)
					const totalDocuments = state.documents.data.length
					state.documents.total = totalDocuments
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(deleteEmployeeDocumentAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in deleteEmployeeDocumentAction'
			})

		builder
			.addCase(updateEmployeeDocumentAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(updateEmployeeDocumentAction.fulfilled, (state, { payload, meta }) => {
				const { code, success, data } = payload
				const newObject = data?.document
				if (code === 200 && success) {
					// updateSpecificObject(state.documents, state.deletedDocumentId, newObject)
					const documentIndex = state.documents.data.findIndex(
						(item: any) => item.uuid == state.deletedDocumentId,
					)
					if (documentIndex !== -1) {
						state.documents.data[documentIndex] = {
							...state.documents.data[documentIndex],
							...newObject,
						}
					}
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(updateEmployeeDocumentAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in updateEmployeeDocumentAction'
			})

		builder
			.addCase(employeeDocumentStoreAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(employeeDocumentStoreAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.documents.data.unshift(data.employee_document)
					const totalDocuments = state.documents.data.length
					state.documents.total = totalDocuments
					state.status = 'SUCCESS'
					state.isOpen = false
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(employeeStoreAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in employeeDocumentStoreAction'
			})

		builder
			.addCase(employeeStoreAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(employeeStoreAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.tempList.unshift(data.employee)
					const filteredEmployees = state.tempList.slice(0, 10)
					state.list = filteredEmployees
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(employeeDocumentStoreAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in employeeDocumentStoreAction'
			})

		builder
			.addCase(getEmployeeProfileAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(getEmployeeProfileAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.detail = data?.employee
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(getEmployeeProfileAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in getEmployeeProfileAction'
			})

		builder
			.addCase(updateEmployeeProfileAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(updateEmployeeProfileAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const newObject = data?.employee
					state.detail = newObject
					const documentIndex = state.list.findIndex((item: any) => item.uuid == newObject.uuid)

					if (documentIndex !== -1) {
						state.tempList[documentIndex] = { ...state.tempList[documentIndex], ...newObject }
						state.list = [...state.tempList]
					}
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(updateEmployeeProfileAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in getEmployeeProfileAction'
			})

		builder
			.addCase(employeeDepartmentListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(employeeDepartmentListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.departments = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(employeeDepartmentListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in getEmployeeProfileAction'
			})

		builder
			.addCase(getEmployeeDocumentAction.pending, (state) => {
				state.status = 'LOADING'
				state.isLoading = true
			})
			.addCase(getEmployeeDocumentAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.documents = data?.employee_document
					state.status = 'SUCCESS'
					state.isLoading = false
				} else {
					state.status = 'FAIL'
					state.isLoading = false
				}
			})
			.addCase(getEmployeeDocumentAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in getEmployeeDocumentAction'
			})

		builder
			.addCase(employeeListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(employeeListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const [emList, emOpt] = data
					state.Options = emOpt
					const filteredEmployees = emList.slice(0, 10)
					state.list = filteredEmployees
					state.employeePagination.total_records = emList.length
					const unlinked = emList.filter(
						(item: { parent_id: null; is_top_level: number; status: string }) =>
							item.parent_id === null && item.is_top_level === 0 && item.status === 'active',
					)
					state.unlinkedEmployeePagination.total_records = unlinked.length
					state.tempUnLinkedList = unlinked
					state.unlinkedList = unlinked.slice(0, 10)
					state.dropDownList = emList
					state.tempList = emList
					state.status = 'SUCCESS'
					state.isLoading = false
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(employeeListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in employeeListAction'
			})

		builder
			.addCase(getEmployeeProfileCategoriesAction.pending, (state) => {
				state.status = 'LOADING'
				state.documentCategoryLoading = true
			})
			.addCase(getEmployeeProfileCategoriesAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.document_categories = data.document_categories
					state.status = 'SUCCESS'
					state.documentCategoryLoading = false
					state.isOpen = false
				} else {
					state.documentCategoryLoading = false
					state.status = 'FAIL'
				}
			})
			.addCase(getEmployeeProfileCategoriesAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.documentCategoryLoading = false
				state.error = action?.error?.message ?? 'An error occurred in employeeDocumentStoreAction'
			})

		builder
			.addCase(getEmployeeOnboardingAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(getEmployeeOnboardingAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.onBoardingList = data.onboardings
					state.status = 'SUCCESS'
					state.isOpen = false
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(getEmployeeOnboardingAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in getEmployeeOnboardingAction'
			})

		builder
			.addCase(getEmployeeCommentsAction.pending, (state) => {
				state.status = 'LOADING'
				state.loading=true
				state.feedbackLoading=true
			})
			.addCase(getEmployeeCommentsAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					
					state.employeeFeedbackComments = data
					state.status = 'SUCCESS'
					state.feedbackLoading=false
					state.loading=false
				} else {
					state.status = 'FAIL'
					state.loading=false
					state.feedbackLoading=false

				}
			})
			.addCase(getEmployeeCommentsAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in getEmployeefeedbackAction'
				state.loading=false
				state.feedbackLoading=false
			})

		builder
			.addCase(addEmployeeFeedbackAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(addEmployeeFeedbackAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.employeeFeedback = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(addEmployeeFeedbackAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in addEmployeeFeedbackAction'
			})
	},
})
export const {
	openAlertDialogModal,
	closeAlertDialogModal,
	openModal,
	closeModal,
	editDocument,
	filterEmployee,
} = employeeSlice.actions

export const employeeSelector = (state: RootState) => state.employee
export const employeeSelectorStatus = (state: RootState) => state.employee
export const employeefeedbackLoading = (state: RootState) => state.employee.feedbackLoading

export default employeeSlice.reducer
