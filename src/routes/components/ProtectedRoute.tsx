import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getAuth } from '@utils/AuthHelpers'
import { checkPoint } from '@utils/bug'

type ProtectedRoute = {
	children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRoute) => {
	const token = getAuth()
	const location = useLocation()

	if (!token) {
		checkPoint(location.pathname)

		return (
			<Navigate
				to="auth/login"
				replace
				state={{ from: location.pathname }}
			/>
		)
	}
	return children ? (
		children
	) : (
		<Navigate
			to="/"
			replace
		/>
	)
}

export default ProtectedRoute
