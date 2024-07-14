import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'

import App from '../App'

import Error401Page from '@pages/401'
import Error404Page from '@pages/404'
import Error500Page from '@pages/500'

import PublicRoutes from './public'
import EmployeeRoutes from './private/Employee'
import OrganizationRoutes from './private/Organization'

import { Layout as DashboardLayout } from '@layouts/dashboard'
import { Layout as AuthLayout } from '@layouts/auth/AuthLayout'

import ProtectedRoute from './components/ProtectedRoute'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { authUserSelector, authenticate, currentUserTypeSelector } from '@redux/features/authSlice'
import { getAuth } from '@utils/AuthHelpers'
import { ROLE } from '@config/index'

const AppRoutes = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	const { isAuthenticated } = useAppSelector(authUserSelector)
	const authState = getAuth()

	useEffect(() => {
		if (getAuth()) {
			if (!isAuthenticated) {
				if (location.pathname.includes('auth')) {
					navigate('/', { replace: true })
				}
				dispatch(authenticate(authState?.user))
			}
		}
		/**
		 *TODO: the following code is commented
		 * restricted the user from redirecting to login page upon refresh from any auth page.
		 * it does need testing again
		 *
		 */
		// else {
		// 	navigate('auth/login', {
		// 		replace: true,
		// 		state:
		// 			location.pathname === '/auth/login'
		// 				? null
		// 				: {
		// 						from: location.pathname,
		// 					},
		// 	})
		// }
	}, [isAuthenticated])

	return (
		<Routes>
			<Route element={<App />}>
				<Route
					path="auth/*"
					element={
						<AuthLayout>
							<PublicRoutes />
						</AuthLayout>
					}
				/>
				<Route
					path="/*"
					element={
						<ProtectedRoute>
							<DashboardLayout role={authState?.user?.type}>
								{authState?.user?.type === 'employee' ? (
									<EmployeeRoutes />
								) : authState?.user?.type === 'organization' ? (
									<OrganizationRoutes />
								) : (
									<Navigate to="/error/401" />
								)}
							</DashboardLayout>
						</ProtectedRoute>
					}
				/>
				<Route
					path="error/404"
					element={<Error404Page />}
				/>
				<Route
					path="error/401"
					element={<Error401Page />}
				/>
				<Route
					path="error/500"
					element={<Error500Page />}
				/>
			</Route>
		</Routes>
	)
}

export { AppRoutes }

// import { Suspense } from 'react';
// import { Outlet } from 'react-router-dom';

// import type { RouteObject } from 'react-router-dom';

// import Error401Page from '@pages/401';
// import Error404Page from '@pages/404';
// import Error500Page from '@pages/500';

// import { PrivateRoutes } from './private';
// import { PublicRoutes } from './public';

// // import { Layout as DashboardLayout } from '../layouts/dashboard';
// // import HomePage from '@pages/index';
// // import BlankPage from '@pages/blank';

// export const routes: RouteObject[] = [
//     ...PrivateRoutes,
//     ...PublicRoutes,

//     {
//         path: '401',
//         element: <Error401Page />,
//     },
//     {
//         path: '404',
//         element: <Error404Page />,
//     },
//     {
//         path: '500',
//         element: <Error500Page />,
//     },
//     {
//         path: '*',
//         element: <Error404Page />,
//     },
// ];
