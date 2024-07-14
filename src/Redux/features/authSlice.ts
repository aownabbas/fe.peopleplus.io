import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthState } from 'type/auth'
import { removeAuth, setAuth } from '@utils/AuthHelpers'
import { logoutRequest } from '@service/auth'
import { generalRequest } from '@service/settings'

export const initialState: AuthState = {
	user: {
		id: 0,
		uuid: '',
		type: 'organization',
		email: '',
		email_verified_at: null,
		password_changed_at: null,
		active: 0,
		timezone: 'select',
		last_login_at: null,
		last_login_ip: null,
		to_be_logged_out: 0,
		provider: null,
		provider_id: null,
		created_at: '',
		updated_at: '',
		deleted_at: null,
		organization: {
			id: 0,
			uuid: '',
			user_id: 0,
			first_name: '',
			last_name: '',
			company_logo: '',
			organization_name: '',
			description: '',
			phone: '',
			website: '',
			is_remote: null,
			is_multiple_office: null,
			address: '',
			city: '',
			zipcode: '',
			country: null,
			office_name: null,
			created_at: '',
			updated_at: '',
			time_zone: '',
		},
		token: '',
		employee: {
			id: 0,
			uuid: '',
			organization_id: 0,
			designation: 0,
			parent_id: 0,
			first_name: '',
			last_name: '',
			photo: '',
			dob: '',
			gender: '',
			cnic: '',
			email: '',
			phone_number: '',
			street_address: '',
			city: '',
			state: '',
			postcode: '',
			country_id: 0,
			user_id: '',
			employee_id: '',
			employee_status: '',
			employee_type: '',
			probation_end_date: '',
			joining_date: '',
			termination_date: null,
			job_title: '',
			department_id: 0,
			role: null,
			work_location_id: null,
			salary: '',
			pay_frequency: '',
			currency: '',
			degree: '',
			institute: '',
			about: '',
			working_hours: '',
			working_days: [],
			time_zone: null,
			custom_fields: null,
			created_at: '',
			updated_at: '',
			is_top_level: 0,
		},
	},
	isAuthenticated: false,
	status: 'IDLE',
	error: null,
}

export const logoutAction = createAsyncThunk('Auth/logout', async () => {
	try {
		const { data } = await logoutRequest()
		if (data) {
			return { data, code: 200, success: true }
		}
	} catch (error) {
		console.log('error')
	}
})

export const generalFormAction = createAsyncThunk('post/generalForm', async (formData) => {
	try {
		const generalFrom = await generalRequest(formData)

		const generalFromData = generalFrom.data.data
		const updatedUserData = {
			organization: {
				company_logo: generalFromData?.company_logo,
				organization_name: generalFromData?.organization_name,
				description: generalFromData?.description,
				phone: generalFromData?.phone,
				website: generalFromData?.website,
				address: generalFromData?.address,
				city: generalFromData?.city,
				zipcode: generalFromData?.zipcode,
				country: generalFromData?.country,
				updated_at: generalFromData?.updated_at,
				first_name: generalFromData?.first_name,
				last_name: generalFromData?.last_name,
				is_remote: generalFromData?.is_remote,
				is_multiple_office: generalFromData?.is_multiple_office,
				office_name: generalFromData?.office_name,
				time_zone: generalFromData?.time_zone,
			},
			timezone: generalFromData.time_zone,
		}

		return {
			data: updatedUserData,
			code: 204,
			success: true,
		}
	} catch (error: any) {
		// const formErrors = formateErrors(error);
		// formik.setErrors(formErrors);
		console.error(' countriesListAction ', error)
		throw error
	}
})

const reducers = {
	updateUserAction: (state: AuthState, { payload }: PayloadAction<any>) => {
		const { newUserData } = payload
		state.user = { ...state.user, ...newUserData }
		setAuth({ access_token: state.user.token, user: state.user })
	},

	signUp: (state: AuthState, { payload }: PayloadAction<any>) => {
		const { code, success, data } = payload
		if (code === 200 && success) {
			setAuth({ access_token: data?.token, user: data })
			state.user = data
			state.isAuthenticated = true
			state.status = 'SUCCESS'
		} else {
			state.status = 'FAIL'
		}
	},

	signIn: (state: AuthState, { payload }: PayloadAction<any>) => {
		const { code, success, data } = payload
		if (code === 200 && success) {
			setAuth({ access_token: data?.token, user: data })
			state.user = data
			state.isAuthenticated = true
			state.status = 'SUCCESS'
		} else {
			state.status = 'FAIL'
		}
	},

	authenticate: (state: AuthState, { payload }: PayloadAction<any>) => {
		state.user = payload
		state.isAuthenticated = true
	},
	unAuthenticate: (state: AuthState) => {
		state.isAuthenticated = false
	},

	setLogOut: (state: AuthState) => {},
}

const authSlice = createSlice({
	name: 'Auth',
	initialState,
	reducers,
	extraReducers(builder) {
		builder.addCase(logoutAction.pending, (state) => {
			state.status = 'LOADING'
		})
		builder.addCase(logoutAction.fulfilled, (state) => {
			removeAuth()
			state = { ...initialState }
		})
		builder.addCase(logoutAction.rejected, (state) => {
			state.status = 'FAIL'
			state.error = 'Unable to logout'
		})

		builder
			.addCase(generalFormAction.pending, (state) => {
				state.status = 'LOADING'
			})
			.addCase(generalFormAction.fulfilled, (state, { payload }) => {
				const { code, success, data }: any = payload
				if (code === 204 && success) {
					state.user = { ...state.user, ...data }
					setAuth({ access_token: state.user.token, user: state.user })
					state.status = 'SUCCESS'
				} else {
					state.status = 'FAIL'
				}
			})
			.addCase(generalFormAction.rejected, (state, action) => {
				state.status = 'FAIL'
				state.error = action?.error?.message ?? 'An error occurred in generalFormAction'
			})
	},
})

export const { authenticate, setLogOut, unAuthenticate, signIn, signUp, updateUserAction } =
	authSlice.actions
export default authSlice.reducer

export const authUserSelector = (state: RootState) => state.auth
export const currentUserSelector = (state: RootState) => state.auth.user
export const currentUserTypeSelector = (state: RootState) => state.auth.user.type
