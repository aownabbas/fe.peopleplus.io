import React, { FC } from 'react' // Ensure React is imported
import { Scrollbar } from '@components/scrollbar'
import { Stack, Card, Typography, Box, Tooltip } from '@mui/material'
import { useAppSelector } from '@redux/hooks'
import { dashboardJobsSelector } from '@redux/features/dashboardSlice'
import NoRecordFound from '@components/NoRecordFound'
import { useNavigate } from 'react-router-dom'
import { ActivePipelineSkeleton } from '@components/Skeletons'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

export const ActivePipeline: FC = () => {
	const { jobs, status } = useAppSelector(dashboardJobsSelector)

	const navigate = useNavigate()

	if (status === 'LOADING') {
		return <ActivePipelineSkeleton />
	}
	// Check if there are no jobs
	if (!jobs || jobs.length === 0) {
		return <NoRecordFound />
	}

	return (
		<Stack>
			{jobs.map((job) => (
				<Box
					key={job.id}
					sx={{
						width: '100%',
						p: 2,
					}}
				>
					<Tooltip title={job.title}>
						<Typography
							sx={{
								color: '#111927',
								fontWeight: 500,
								fontSize: 16,
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: '400px',
								textOverflow: 'ellipsis',
							}}
						>
							{job.title}
						</Typography>
					</Tooltip>

					<Typography
						sx={{
							fontSize: 16,
							fontWeight: 500,
							color: '#101323',
							mb: 2,
						}}
					></Typography>
					<Scrollbar>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 3,
							}}
						>
							{Object.keys(job.candidate_stages_count).map((stage, idx) => (
								<Card
									key={idx}
									sx={{
										minWidth: '200px !important',
										border: '1px solid #f6f6f6',
										boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
										transition: 'background-color 0.3s',
										'&:hover': {
											backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
										},
									}}
									onClick={() => navigate(`/recruitment/job/${job.uuid}`)}
								>
									<Stack
										sx={{
											cursor: 'pointer',
											padding: 4,
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
										}}
									>
										<Typography variant="subtitle2">{stage}</Typography>
										{/* <Typography
											color="text.secondary"
											variant="body2"
										>
											{job.candidate_stages_count[stage]}
										</Typography> */}

										<Typography
											sx={{
												color: '#6C737F',
												fontWeight: 400,
												fontSize: 12,
											}}
										>
											{/* {job.candidate_stages_count[stage] > 999
												? t(tokens.org_dashboard.management.active_pipeline.max_applicants)
												: job.candidate_stages_count[stage] > 1
													? `${job.candidate_stages_count[stage]} Applicants`
													: `${job.candidate_stages_count[stage]} Applicant`} */}

											{job.candidate_stages_count[stage] > 999
												? t(tokens.org_dashboard.management.active_pipeline.max_applicants)
												: job.candidate_stages_count[stage] > 1
													? `${job.candidate_stages_count[stage]} ${t(tokens.org_dashboard.management.active_pipeline.applicants)}`
													: `${job.candidate_stages_count[stage]} ${t(tokens.org_dashboard.management.active_pipeline.applicant)}`}
										</Typography>
									</Stack>
								</Card>
							))}
						</Box>
					</Scrollbar>
				</Box>
			))}
		</Stack>
	)
}

export default ActivePipeline
