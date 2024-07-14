import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'
import { server } from '../config'
import { getAuth, removeAuth } from '@utils/AuthHelpers'
import toast from 'react-hot-toast'
import { generateStore } from '@redux/store'
import { logoutAction } from '@redux/features/authSlice'

// For Make Logger on Develop Mode
const logger = (message: string) => {
	if (import.meta.env.MODE === 'development') {
		console.log(message)
	}
}

// Request Interceptor
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	const auth = getAuth()

	const { method, url, headers } = config
	// Set Headers Here
	headers['ngrok-skip-browser-warning'] = '6024'

	if (auth && auth.access_token) {
		headers.Authorization = `Bearer ${auth.access_token}`
		headers['ngrok-skip-browser-warning'] = '69420'
	}

	// logger(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)

	return config
}

// Error Interceptor
const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
	if (axios.isAxiosError(error)) {
		const { message } = error
		const { method, url } = error.config as AxiosRequestConfig
		const { statusText, status, data } = (error.response as AxiosResponse) ?? {}

		// logger(`🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`)

		switch (status) {
			case 422: {
				// "Login required"
				// toast.error(data?.error);
				break
			}
			case 401: {
				// "Login required"
				// if (import.meta.env.DEV) {
				// 	toast.error(data?.error)
				// }
				// generateStore().dispatch(logoutAction())
				if (!window.location.href.includes('/auth')) {
					removeAuth()
					window.location.href = '/auth/login'
				}
				break
			}

			case 403: {
				// "Permission denied"
				// toast.error('Permission denied')
				window.location.href = '/error/401'

				break
			}
			case 404: {
				// "Invalid request"
				if (!window.location.href.includes('/auth')) {
					window.location.href = '/error/404'
				}
				if (import.meta.env.DEV) {
					toast.error('Invalid request')
				}

				break
			}
			case 500: {
				// "Server error"
				toast.error('Server error')

				break
			}
			default: {
				// "Unknown error occurred"
				toast.error('Something went Wrong')

				break
			}
		}

		if (status === 401) {
			// Delete Token & Go To Login Page if you required.
			sessionStorage.removeItem('token')
		}
	} else {
		logger(`🚨 [API] | Error ${error.message}`)
	}

	return Promise.reject(error)
}

// Response interceptor
const onResponse = (response: AxiosResponse): AxiosResponse => {
	// const { method, url } = response.config;
	// const { status } = response;
	// Set Loading End Here
	// Handle Response Data Here
	// Error Handling When Return Success with Error Code Here
	// logger(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

	return response
}

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
	instance.interceptors.request.use(onRequest, onErrorResponse)
	instance.interceptors.response.use(onResponse, onErrorResponse)

	return instance
}

const axiosClient = axios.create({
	baseURL: server.api,
})

export default setupInterceptors(axiosClient)
