import { Box, Card, LinearProgress, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import StatusWidgetCard from '@components/StatusWidgetCard'
import { useAppSelector } from '@redux/hooks'
import { statisticsSelector } from '@redux/features/employee/dashboardSlice'

const EmployeeDashboardWidgets = () => {
	const { candidateCount } = useAppSelector(statisticsSelector)

	return (
		<Box
			sx={{
				p: 1,
			}}
		>
			<Grid
				container
				spacing={3}
			>
				<StatusWidgetCard
					title="Logged this week"
					value="52:39 hrs"
				/>
				<StatusWidgetCard
					title="Emails"
					value="52"
				/>
				<StatusWidgetCard
					title="Candidates"
					value={`${candidateCount}`}
				/>
				<StatusWidgetCard
					title="Last Payroll"
					value="PKR 80,420"
				/>
			</Grid>
		</Box>
	)
}
export default EmployeeDashboardWidgets
