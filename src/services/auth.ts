import { Login, Register, ResetPassword } from '../types/auth'
import APIClient from '../api/apiClient'

export const loginRequest = (loginData: Login) => APIClient.post('/login', loginData)

export const registerRequest = (registerData: Register) => APIClient.post('/register', registerData)

export const forgotPasswordRequest = (email: { email: string }) =>
	APIClient.post('/send-link', email)

export const verifyCodeRequest = (token: string) =>
	APIClient.get('/verify-otp', {
		headers: {
			'ngrok-skip-browser-warning': '6024',
		},
		params: { token },
	})

export const resetPasswordRequest = (newPasswords: ResetPassword) =>
	APIClient.post(`/reset-password`, newPasswords)

export const logoutRequest = () => APIClient.post(`/logout`)
