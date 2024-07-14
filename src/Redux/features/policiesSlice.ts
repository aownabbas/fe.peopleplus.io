import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
	Document,
	documentFrom,
	Documents,
	drawerPayloadAction,
	PoliciesState,
} from 'type/policies'
import { policyAddRequest, policyListRequest, policyModifyRequest } from '@service/policies'
import { createPolicyCategoriesTab, makeDynamicFields } from '@utils/factory'
import { policyCategoryListRequest } from '@service/settings'
import { DropdownOption } from 'type/config'

export const initialState: PoliciesState = {
	policyCategoriesStatus: 'IDLE',
	status: 'IDLE',
	error: null,
	documents: [],
	policyCategoryOptions: [],
	policyDrawer: {
		isOpen: false,
		variant: 'form',
	},
	selectedDocument: null,
	listStatus: 'IDLE',
	selectedTabs: {
		published: [],
		draft: [],
	},
}

export const policyListAction = createAsyncThunk('get/policies', async () => {
	try {
		const { data } = await policyListRequest()

		const [draftCategories, publishedCategories] = createPolicyCategoriesTab(data.document_policy)

		return {
			data: [data.document_policy, draftCategories, publishedCategories],
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('policyListAction :', error)
		throw error
	}
})

export const policyCategoryListAction = createAsyncThunk('get/policies/category', async () => {
	try {
		const {
			data: { policy_categories },
		} = await policyCategoryListRequest()

		const policyCategoryOptions = makeDynamicFields({
			rawData: policy_categories,
			pick: ['name', 'name'],
			drop: ['label', 'value'],
			path: 'policy_category',
		}) as unknown as DropdownOption[]

		// console.log('pData : ', policyCategoryOptions)
		policyCategoryOptions.unshift({ label: 'All', value: 'All' })

		return {
			data: policyCategoryOptions,
			success: true,
			code: 200,
		}
	} catch (error: any) {
		console.error('policyCategoryListAction :', error)
		throw error
	}
})

export const policyAddAction = createAsyncThunk(
	'post/policy',
	async (newDocument: documentFrom) => {
		try {
			const { data } = await policyAddRequest(newDocument)
			// console.log('added policy : ', data)

			return {
				data: data.document_policy,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error(' policyAddAction ', error)
			throw error
		}
	},
)

export const policyModifyAction = createAsyncThunk(
	'Modify/policy',
	async (newDocument: Document) => {
		try {
			const { data } = await policyModifyRequest(newDocument)
			// console.log('added policy : ', data)

			return {
				data: data.document_policy,
				success: true,
				code: 200,
			}
		} catch (error: any) {
			console.error(' policyModifyAction ', error)
			throw error
		}
	},
)

const policiesSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		reCalculateTabs: (state) => {
			// recreating tabs after deleting policy document
			const [draftCategories, publishedCategories] = createPolicyCategoriesTab(state.documents)
			state.selectedTabs.draft = draftCategories
			state.selectedTabs.published = publishedCategories
		},

		handlePolicyDrawerOpen: (state, { payload }: drawerPayloadAction) => {
			const { variant } = payload
			state.policyDrawer.isOpen = true
			state.policyDrawer.variant = variant
			state.policyDrawer.payload = payload?.payload
			if (payload?.payload?.id) {
				state.selectedDocument =
					state.documents.find(({ id }) => id === payload?.payload?.id) || null
			}
		},

		handlePolicyDrawerClose: (state) => {
			state.policyDrawer.isOpen = false
			state.selectedDocument = null
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(policyCategoryListAction.pending, (state) => {
				if (state.policyCategoryOptions.length <= 0) {
					state.policyCategoriesStatus = 'LOADING'
				}
			})
			.addCase(policyCategoryListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.policyCategoriesStatus = 'SUCCESS'
					state.policyCategoryOptions = data
				} else {
					state.policyCategoriesStatus = 'FAIL'
				}
			})
			.addCase(policyCategoryListAction.rejected, (state, action) => {
				state.policyCategoriesStatus = 'FAIL'
				state.error = action.error.message ?? 'ERROR: policyCategoryListAction'
			})

		builder
			.addCase(policyListAction.pending, (state) => {
				if (state.documents.length <= 0) {
					state.listStatus = 'LOADING'
				}
			})
			.addCase(policyListAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					const [documentPolicies, draftCategories, publishedCategories] = data
					state.listStatus = 'SUCCESS'
					state.selectedTabs.draft = draftCategories
					state.selectedTabs.published = publishedCategories
					state.documents = documentPolicies as Documents
				} else {
					state.listStatus = 'FAIL'
				}
			})
			.addCase(policyListAction.rejected, (state, action) => {
				state.listStatus = 'FAIL'
				state.error = action.error.message ?? 'ERROR: policyListAction'
			})

		builder
			.addCase(policyAddAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(policyAddAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					state.status = 'SUCCESS'
					state.documents.unshift(data as Document)
					const [draftCategories, publishedCategories] = createPolicyCategoriesTab(state.documents)
					state.selectedTabs.draft = draftCategories
					state.selectedTabs.published = publishedCategories
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(policyAddAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'ERROR: policyAddAction'
			})

		builder
			.addCase(policyModifyAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(policyModifyAction.fulfilled, (state, { payload }) => {
				const { code, success, data } = payload
				if (code === 200 && success) {
					if (data.status === 'deleted') {
						state.documents = state.documents.filter((document) => document.id !== data.id)
					} else {
						state.documents = state.documents.map((document) =>
							document.id === data.id ? data : document,
						)
					}
					// recreating tabs after deleting policy document
					const [draftCategories, publishedCategories] = createPolicyCategoriesTab(state.documents)
					state.selectedTabs.draft = draftCategories
					state.selectedTabs.published = publishedCategories
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(policyModifyAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action.error.message ?? 'ERROR: policyModifyAction'
			})
	},
})

export const policyStatusSelector = (state: RootState) => state.policies.status
export const policyListStatusSelector = (state: RootState) => state.policies.listStatus
export const selectedTabsSelector = (state: RootState) => state.policies.selectedTabs

export const documentsListSelector = (state: RootState) => state.policies.documents
export const policyDrawerSelector = (state: RootState) => state.policies.policyDrawer
export const selectedDocumentSelector = (state: RootState) => state.policies.selectedDocument
export const policyCategoryOptionsSelector = (state: RootState) =>
	state.policies.policyCategoryOptions

export const { handlePolicyDrawerClose, handlePolicyDrawerOpen, reCalculateTabs } =
	policiesSlice.actions
export default policiesSlice.reducer
