import StatusWidgetCard from '@components/StatusWidgetCard'
import { Box, Card, LinearProgress, Stack, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { recruitmentSelector, recruitmentStatusSelector } from '@redux/features/recruitmentSlice'
import { useAppSelector } from '@redux/hooks'

const JobStatus = () => {
	const { jobState } = useAppSelector(recruitmentSelector)

	return (
		<Box>
			<Grid
				container
				spacing={3}
			>
				<StatusWidgetCard
					title="Active Jobs"
					value={String(jobState.activeJobs)}
				/>
				<StatusWidgetCard
					title="applicants"
					value={String(jobState.totalApplicant)}
				/>
				<StatusWidgetCard
					variant="progress"
					title="company health"
					value={100}
				/>

				<StatusWidgetCard
					title="Active in last 30 days"
					value={'N/A'}
				/>
			</Grid>
		</Box>
	)
}

export default JobStatus
