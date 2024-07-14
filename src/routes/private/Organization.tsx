import { Navigate, Route, Routes, Outlet } from 'react-router-dom'

// pages
import BlankPage from '@pages/blank'

import { DashboardPage } from '@pages/organization/dashboard'
import EmployeeLayout from '@pages/organization/employee/Layout.tsx'

import {
	AssetLayout,
	AssetCreatePage,
	AssetListingPage,
	AssetDetailPage,
} from '@pages/organization/assets'

import {
	AdvancedPage,
	AssetPage,
	BackupRecoveryPage,
	BenefitPackagePage,
	CommunicationPage,
	DepartmentPage,
	ExpensesPage,
	GeneralPage,
	LocalizationPage,
	ModulesPage,
	NotificationsPage,
	OnboardingPage,
	PersonalizationPage,
	RolesPermissionsPage,
	SettingLayout,
	SkillSetPage,
	WorkLocationPage,
	DocumentPolicyPage,
	PipelineStagesPage,
} from '@pages/organization/settings'

import {
	JobDetailPage,
	CreateJobPage,
	EmptyRecordPage,
	RecruitmentDashboardPage,
	CreateCandidatePage,
} from '@pages/organization/recruitment'

import {
	EmployeeListingPage,
	PreferencePage,
	DocumentPage,
	OnBoardingPage,
	CreateEmployeePage,
	ProfilePage,
	EmployeeProfileLayout,
	EmployeeAsset,
} from '@pages/organization/employee'

import TeamChart from '@pages/organization/OrganizationChart/OrganizationChart'
import Policies from '@pages/organization/policies/Policies'
import Drafts from '@pages/organization/policies/Drafts'
import UpcomingEvent from '@pages/organization/upcomingevent/UpcomingEvent'
import Comments from '@pages/organization/employee/Comments'

const OrganizationRoutes = () => {
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
					path="/chart"
					element={<TeamChart />}
				/>

				<Route
					path="blank"
					element={<BlankPage />}
				/>

				<Route
					path="assets"
					element={<AssetLayout />}
				>
					<Route
						index
						element={<AssetListingPage />}
					/>
					<Route
						path="create"
						element={<AssetCreatePage />}
					/>
					<Route
						path="edit/:uuid"
						element={<AssetCreatePage />}
					/>
					<Route
						path="detail/:uuid"
						element={<AssetDetailPage />}
					/>
				</Route>

				<Route
					path="employees"
					element={<EmployeeProfileLayout />}
				>
					<Route
						path="profile/:uuid"
						element={<ProfilePage />}
					/>

					<Route
						path="document/:uuid"
						element={<DocumentPage />}
					/>
					<Route
						path="profile/:uuid"
						element={<ProfilePage />}
					/>

					<Route
						path="onboarding/:uuid"
						element={<OnBoardingPage />}
					/>
					<Route
						path="asset/:uuid"
						element={<EmployeeAsset />}
					/>
					<Route
						path="comments/:uuid"
						element={<Comments />}
					/>
					<Route
						path="preference/:uuid"
						element={<PreferencePage />}
					/>
				</Route>

				<Route
					path="employees"
					element={<EmployeeLayout />}
				>
					<Route
						index
						element={<EmployeeListingPage />}
					/>
					<Route
						path="create"
						element={<CreateEmployeePage />}
					/>
				</Route>

				<Route
					path="employees"
					element={<EmployeeListingPage />}
				></Route>

				<Route
					path="settings"
					element={<SettingLayout />}
				>
					<Route
						path="general"
						element={<GeneralPage />}
					/>
					<Route
						path="department"
						element={<DepartmentPage />}
					/>
					<Route
						path="asset"
						element={<AssetPage />}
					/>
					<Route
						path="work-location"
						element={<WorkLocationPage />}
					/>
					<Route
						path="skill-set"
						element={<SkillSetPage />}
					/>
					<Route
						path="benefit-package"
						element={<BenefitPackagePage />}
					/>
					<Route
						path="onboarding"
						element={<OnboardingPage />}
					/>
					<Route
						path="document-policy"
						element={<DocumentPolicyPage />}
					/>
					<Route
						path="pipeline-stages"
						element={<PipelineStagesPage />}
					/>

					{/* <Route
						path="modules"
						element={<ModulesPage />}
					/>
					<Route
						path="expenses"
						element={<ExpensesPage />}
					/>
					<Route
						path="localization"
						element={<LocalizationPage />}
					/>
					<Route
						path="roles-permissions"
						element={<RolesPermissionsPage />}
					/>
					<Route
						path="personalization"
						element={<PersonalizationPage />}
					/>
					<Route
						path="notifications"
						element={<NotificationsPage />}
					/>
					<Route
						path="communication"
						element={<CommunicationPage />}
					/>
					<Route
						path="backup-recovery"
						element={<BackupRecoveryPage />}
					/>
					<Route
						path="advanced"
						element={<AdvancedPage />}
					/> */}
				</Route>

				{/* recruitment  */}
				<Route
					path="recruitment"
					element={<RecruitmentDashboardPage />}
				/>
				<Route
					path="recruitment/job"
					element={<CreateJobPage />}
				/>
				<Route
					path="recruitment/job/:uuid"
					element={<JobDetailPage />}
				/>
				<Route
					path="recruitment/:uuid/candidate"
					element={<CreateCandidatePage />}
				/>
			</Route>

			<Route
				path="/Policies"
				element={<Policies />}
			/>
			<Route
				path="/Policies/drafts"
				element={<Drafts />}
			/>
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

export default OrganizationRoutes
