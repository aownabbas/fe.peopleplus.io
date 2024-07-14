import { Navigate, Route, Routes } from 'react-router-dom'

// pages
import BlankPage from '@pages/blank'
import { DashboardPage } from '@pages/employee/dashboard'
import { JobDetailPage, RecruitmentJobListPage } from '@pages/employee/recruitment'
import {
	EmployeeProfileLayout,
	Document,
	OnBoarding,
	Asset,
	Preference,
	About,
	AssetDetail,
} from '@pages/employee/profile'
import Policy from '@pages/employee/policies/Policy'
import UpcomingEvent from '@pages/employee/upcomingEvents/UpcomingEvents'

const EmployeeRoutes = () => {
	return (
		<Routes>
			<Route>
				{/* Redirect to Dashboard after success login/registration */}
				<Route
					path="auth/*"
					element={<Navigate to="/" />}
				/>

				{/* Pages */}
				<Route
					path="/"
					index
					element={<DashboardPage />}
				/>

				<Route
					path="blank"
					element={<BlankPage />}
				/>

				{/* recruitment  */}
				<Route
					path="recruitment"
					element={<RecruitmentJobListPage />}
				/>

				<Route
					path="recruitment/job/:uuid"
					element={<JobDetailPage />}
				/>

				<Route
					path="profile"
					element={<EmployeeProfileLayout />}
				>
					<Route
						path="document"
						element={<Document />}
					/>

					<Route
						path="onboarding"
						element={<OnBoarding />}
					/>

					<Route
						path="assets"
						element={<Asset />}
					/>

					<Route
						path="asset/detail/:uuid"
						element={<AssetDetail />}
					/>

					<Route
						path="preference"
						element={<Preference />}
					/>

					<Route
						path="detail"
						element={<About />}
					/>
				</Route>

				<Route
					path="/policy"
					element={<Policy />}
				/>
			</Route>

			<Route
				path="/events"
				element={<UpcomingEvent />}
			/>

			{/* Page Not Found */}
			<Route
				path="*"
				element={<Navigate to="/error/404" />}
			/>
		</Routes>
	)
}

export default EmployeeRoutes
