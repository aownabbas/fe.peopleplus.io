import { Navigate, Route, Routes } from 'react-router-dom'

import ForgotPasswordPage from '@pages/auth/ForgetPassword'
import LoginPage from '@pages/auth/Login'
import RegisterPage from '@pages/auth/Register'
import ResetPasswordPage from '@pages/auth/ResetPassword'
import VerifyCodePage from '@pages/auth/VerifyCode'

const publicRoutes = () => {
	return (
		<Routes>
			{/* Redirect to Dashboard after success login/registration */}
			<Route
				path="auth/*"
				element={<Navigate to="/" />}
			/>

			{/* Pages */}
			<Route
				path="/register"
				element={<RegisterPage />}
			/>
			<Route
				path="/login"
				element={<LoginPage />}
			/>
			<Route
				path="/forgot"
				element={<ForgotPasswordPage />}
			/>
			<Route
				path="/verify-code"
				element={<VerifyCodePage />}
			/>
			<Route
				path="/reset-password"
				element={<ResetPasswordPage />}
			/>
		</Routes>
	)
}

export default publicRoutes
