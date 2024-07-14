import { FC } from 'react'

// mui imports
import { Box, Card, LinearProgress, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useNavigate } from 'react-router-dom'
import { CardSkeleton } from './Skeletons'

type progressVariant = {
	title: string
	value: number
	link?: string
	isLoading?: boolean
	variant?: 'progress'
}

type valueVariant = {
	title: string
	value: string
	link?: string
	variant?: 'value'
}

type StatusWidgetCardProps = valueVariant | progressVariant

const StatusWidgetCard: FC<StatusWidgetCardProps> = ({ title, value, link, variant = 'value' }) => {
	const navigate = useNavigate()
	return (
		<Grid
			xs={12}
			md={6}
			lg={3}
			xl={3}
		>
			<Card
				onClick={() => (link ? navigate(link) : console.log('No redirect'))}
				sx={{
					transition: 'background-color 0.3s',
					cursor: link ? 'pointer' : 'default',

					'&:hover': {
						backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
					},
				}}
			>
				<Stack
					alignItems="center"
					direction="row"
					spacing={2}
					sx={{ p: 2 }}
				>
					<Stack
						spacing={1}
						sx={{ flexGrow: 1 }}
					>
						<Typography
							sx={{
								color: '#6C737F',
								fontWeight: 600,
								fontSize: 12,
								lineHeight: '24px',
								textTransform: 'uppercase',
							}}
						>
							{title}
						</Typography>

						{variant === 'progress' && (
							<Stack
								alignItems="center"
								direction="row"
								spacing={1}
							>
								<Typography variant="h5">{value}%</Typography>
								<LinearProgress
									color="primary"
									sx={{ flexGrow: 1 }}
									value={Number(value)}
									variant="determinate"
								/>
							</Stack>
						)}
						{variant === 'value' && (
							<Stack
								alignItems="center"
								direction="row"
								spacing={1}
							>
								<Typography
									sx={{
										color: '#111927',
										fontWeight: 700,
										fontSize: 24,
										lineHeight: '28px',
									}}
								>
									{value}
								</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Card>
		</Grid>
	)
}

export default StatusWidgetCard
