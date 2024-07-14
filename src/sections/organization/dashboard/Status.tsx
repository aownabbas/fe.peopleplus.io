import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import StatusWidgetCard from '@components/StatusWidgetCard'
import { useAppSelector } from '@redux/hooks'
import { statisticsSelector, statusSelector } from '@redux/features/dashboardSlice'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

const Status = () => {
	const { t } = useTranslation()

	const statistics = useAppSelector(statisticsSelector)
	const status = useAppSelector(statusSelector)

	return (
		<Box
			sx={{
				pt: 4,
			}}
		>
			<Grid
				container
				spacing={3}
			>
				<StatusWidgetCard
					title={t(tokens.org_dashboard.status_card.active_employees.title)}
					value={String(statistics.employeeCount)}
					link="/employee"
					// isLoading={status === 'LOADING' && statistics.employeeCount===0}
				/>

				<StatusWidgetCard
					title={t(tokens.org_dashboard.status_card.active_positions.title)}
					value={String(statistics.jobCount)}
					link="/recruitment"
					// isLoading={status === 'LOADING' && statistics.jobCount===0}
				/>

				<StatusWidgetCard
					title={t(tokens.org_dashboard.status_card.candidates.title)}
					value={String(statistics.candidateCount)}
					// isLoading={status === 'LOADING' && statistics.candidateCount===0}
				/>

				<StatusWidgetCard
					title={t(tokens.org_dashboard.status_card.active_assets.title)}
					value={String(statistics.assetCount)}
					link="/assets"
					// isLoading={status === 'LOADING' && statistics.assetCount===0}
				/>
			</Grid>
		</Box>
	)
}

export default Status
