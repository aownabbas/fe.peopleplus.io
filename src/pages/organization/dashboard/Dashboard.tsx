import { useEffect, useState } from 'react'

// mui imports
import { Box, Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

// local imports
import { Seo } from '@components/seo'
import { EventsSection, ManagementSection, StatusSection } from '@sections/organization/dashboard'
import { useAppDispatch } from '@redux/hooks'
import { dashboardStatusAction } from '@redux/features/dashboardSlice'
import { employeeListAction } from '@redux/features/employeeSlice'
import { eventListAction } from '@redux/features/eventsSlice'
import { dateFormatMilliSeconds } from '@utils/date-format'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

const Dashboard = () => {
	const currentDate = Date.now()
	const formattedDate = dateFormatMilliSeconds(currentDate, 'yyyy-MM-dd')
	const dispatch = useAppDispatch()

	useEffect(() => {
		Promise.all([
			dispatch(dashboardStatusAction()),
			dispatch(employeeListAction()),
			dispatch(eventListAction({ date: formattedDate, type: 'month' })),
		])
	}, [])

	return (
		<>
			<Seo title={t(tokens.seo_titles.dashboard)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					backgroundColor: '#F2F3F7',
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<StatusSection />

						<Box>
							<Grid
								container
								spacing={2}
							>
								<EventsSection />
								<ManagementSection />
							</Grid>
						</Box>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default Dashboard
