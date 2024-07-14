import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'

import type { AssetsState, NewComment } from 'type/asset'
import {
	documentUploadRequest,
	getAssetRequest,
	commentPostRequest,
	assetDocumentDeleteRequest,
	getAssetCategoryRequest,
	deleteAssetRequest,
	assetListRequest,
} from '@service/asset'

export const initialState: AssetsState = {
	list: [],
	tempList: [],
	detail: null,
	isLoading: true,
	category: [],
	asset: {
		asset_images: [],
		asset_comments: [],
		activity: [],
		asset_documents: [],
		assignmentDate: new Date(),
		uploadedFiles: [],
	},
	employeeAssets: [],
	pagination: {
		page: 0,
		per_page: 10,
		total_records: 0,
	},
	status: 'IDLE',
	error: null,
	documentStatus: 'IDLE',
	commentStatus: 'IDLE',
}

export const getAssetAction = createAsyncThunk('get/asset/detail', async (uuid: string) => {
	try {
		const {
			data: { asset },
		} = await getAssetRequest({ uuid })

		return {
			data: asset,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('getAssetAction ', error)
		throw error
	}
})

export const getAssetListAction = createAsyncThunk('get/assets/listing', async (params?: any) => {
	try {
		const { data } = await assetListRequest(params)
		return {
			data: data,
			success: true,
			code: 200,
			filter: params.emp_id ? params.emp_id : 'all',
		}
	} catch (error: any) {
		console.error('getAssetAction ', error)
		throw error
	}
})

export const getAssetCategoryListAction = createAsyncThunk(
	'get/asset/category',
	async (params?: any) => {
		try {
			const { data } = await getAssetCategoryRequest(params)
			return {
				data: data,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('getAssetAction ', error)
			throw error
		}
	},
)

export const documentUploadAction = createAsyncThunk(
	'upload/documents',
	async (formData: FormData) => {
		try {
			const {
				data: { documents },
			} = await documentUploadRequest(formData)

			return {
				data: documents,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('getAssetAction ', error)
			throw error
		}
	},
)

export const commentPostAction = createAsyncThunk('post/comment', async (formData: NewComment) => {
	try {
		const {
			data: { comment },
		} = await commentPostRequest(formData)
		// console.log('comment :', comment)
		return {
			data: comment,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('commentPostAction ', error)
		throw error
	}
})

export const deleteAssetDocumentAction = createAsyncThunk(
	'trash/asset/document',
	async ({ fileId, documentUuid }: { fileId: string; documentUuid: string }) => {
		try {
			const { data } = await assetDocumentDeleteRequest(fileId)
			return {
				data: data,
				documentUuid: documentUuid,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error('deleteAssetDocumentAction ', error)
			throw error
		}
	},
)

export const deleteAssetAction = createAsyncThunk('delete/asset', async (uuid: string) => {
	try {
		const { data } = await deleteAssetRequest(uuid)
		SHOW_SUCCESS({ msg: 'Record Deleted Successfully' })
		return {
			data: uuid,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		SHOW_ERROR({ msg: error.response.data.message || 'An error occurred while Deleting  Data ' })
		throw error
	}
})

const assetsSlice = createSlice({
	name: 'assets',
	initialState,
	reducers: {
		filterAsset: (state, action) => {
			const { filters, type } = action.payload
			console.log('filters', filters)
			const { page, per_page } = filters
			let filteredEmployees = state.tempList.filter((item: any) => {
				for (const key in filters) {
					const filterValue = filters[key]
					if (filterValue) {
						if (key === 'status') {
							if (filterValue.length > 0 && !filterValue.includes(item.status)) {
								return false
							}
						}

						if (key === 'category') {
							if (filterValue.length > 0 && !filterValue.includes(item.asset_category?.name)) {
								return false
							}
						}

						if (key === 'department_id' && item.department?.id !== filterValue) {
							return false
						}

						if (key === 'employee_id' && item.employee?.uuid !== filterValue) {
							return false
						}

						if (key === 'name') {
							const filterLower = filterValue.toLowerCase()
							const nameLower = item.name.toLowerCase()
							const firstNameLower = item.employee?.first_name
								? item.employee.first_name.toLowerCase()
								: ''
							const lastNameLower = item.employee?.last_name
								? item.employee.last_name.toLowerCase()
								: ''

							console.log(filterLower, 'filterLower')
							console.log(nameLower, 'nameLower')
							console.log(firstNameLower, 'firstNameLower')
							console.log(lastNameLower, 'lastNameLower')

							// Combine first name and last name with a space in between
							const fullNameLower = `${firstNameLower} ${lastNameLower}`

							if (
								!nameLower.includes(filterLower) &&
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
				...state.pagination,
				page: page,
				per_page: per_page,
				total_records: totalRecords,
			}

			const startIndex = page * per_page
			const endIndex = Math.min(startIndex + per_page, totalRecords)

			filteredEmployees = filteredEmployees.slice(startIndex, endIndex)

			return {
				...state,
				[type === 'employee' ? 'employeeAssets' : 'list']: filteredEmployees,
				pagination: updatedPagination,
			}
		},

		resetEmployeeAssets: (state, action) => {
			const employeeId = action.payload
			state.employeeAssets = []
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(commentPostAction.pending, (state) => {
				state.commentStatus = 'LOADING'
			})
			.addCase(commentPostAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.asset.asset_comments.push(data)
					state.commentStatus = 'SUCCESS'
				} else {
					state.commentStatus = 'FAIL'
				}
			})
			.addCase(commentPostAction.rejected, (state, action) => {
				state.commentStatus = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in commentPostAction'
			})

		builder
			.addCase(deleteAssetDocumentAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(deleteAssetDocumentAction.fulfilled, (state, { payload, meta }) => {
				const { code, success, documentUuid } = payload
				console.log(payload)

				if (code === 200 && success) {
					state.asset.asset_documents = state.asset.asset_documents.filter(
						(item: any) => item.uuid !== documentUuid,
					)
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(deleteAssetDocumentAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in deleteEmployeeDocumentAction'
			})

		builder
			.addCase(deleteAssetAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(deleteAssetAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.list = state.list.filter((item: any) => item.uuid !== data)
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(deleteAssetAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in deleteEmployeeDocumentAction'
			})

		builder
			.addCase(documentUploadAction.pending, (state) => {
				state.documentStatus = 'LOADING'
			})
			.addCase(documentUploadAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.asset.asset_documents = data
					state.documentStatus = 'SUCCESS'
				} else {
					state.documentStatus = 'FAIL'
				}
			})
			.addCase(documentUploadAction.rejected, (state, action) => {
				state.documentStatus = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in documentUploadAction'
			})

		builder
			.addCase(getAssetAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(getAssetAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.asset = data
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(getAssetAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred in countriesListAction'
			})

		builder
			.addCase(getAssetCategoryListAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(getAssetCategoryListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.category = data?.asset_categories
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(getAssetCategoryListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred in countriesListAction'
			})

		builder
			.addCase(getAssetListAction.pending, (state) => {
				state.isLoading = true
				state.status = 'LOADING'
			})
			.addCase(getAssetListAction.fulfilled, (state, { payload }) => {
				const { code, success, data, filter } = payload
				if (code === 200 && success) {
					state.tempList = data?.asset
					state.pagination.total_records = state.tempList.length

					if (filter === 'all') {
						state.list = state.tempList.slice(0, 10)
					} else {
						const employeeId = filter
						const employeeAsset = state.tempList.filter(
							(asset: { employee: { uuid: string } }) => asset.employee?.uuid === employeeId,
						)
						console.log('employeeAsset', employeeAsset)
						state.employeeAssets = employeeAsset
					}
					state.isLoading = false
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(getAssetListAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'An error occurred in countriesListAction'
			})
	},
})

export const assetsSelector = (state: RootState) => state.assets

export const { filterAsset, resetEmployeeAssets } = assetsSlice.actions
export const documentStatusSelector = (state: RootState) => state.assets.documentStatus

export default assetsSlice.reducer
