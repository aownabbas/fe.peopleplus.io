import { useEffect } from 'react'

// mui imports
import { Box, Container, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

// local imports
import { Seo } from '@components/seo'
import EmployeeDashboardWidgets from '@sections/employee/dashboard/EmployeeDashboardWidgets'
import Events from '@sections/employee/dashboard/Events'
import {
	AnnouncementSection,
	EmployeeRecognitionSection,
	HealthWellnessSection,
	TimeInOutSection,
} from '@sections/employee/dashboard'
import { dashboardStatusRequest } from '@service/employee/dashboard'
import { useAppDispatch } from '@redux/hooks'
import { dashboardStatusAction } from '@redux/features/employee/dashboardSlice'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

const recentLogs = [
	{
		date: '18 July 2023',
		day: 'Tuesday',
		time: ['02:00 - 05:00', '02:00 - 05:00'],
	},
	{
		date: '19 July 2023',
		day: 'Wednesday',
		time: ['02:00 - 05:00'],
	},
	{
		date: '20 July 2023',
		day: 'Thursday',
		time: ['02:00 - 07:00'],
	},
]

const Dashboard = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(dashboardStatusAction())
		return () => {}
	}, [])

	return (
		<>
			<Seo title={t(tokens.seo_titles.dashboard)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<EmployeeDashboardWidgets />
						<Box>
							<Grid
								container
								spacing={2}
							>
								<Grid
									xs={12}
									md={8}
								>
									<AnnouncementSection />
									<EmployeeRecognitionSection />
									<HealthWellnessSection />
									<TimeInOutSection />
								</Grid>
								<Grid
									xs={12}
									md={4}
								>
									<Events recentLogs={recentLogs} />
								</Grid>
							</Grid>
						</Box>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default Dashboard
