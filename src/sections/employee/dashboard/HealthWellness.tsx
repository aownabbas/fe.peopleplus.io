import type { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Unstable_Grid2'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Scrollbar } from '@components/scrollbar'
import SectionWithHeader from '@components/SectionWithHeader'

interface Applicant {
	id: string
	title: string
	subtext: string
}

const applicants: Applicant[] = [
	{
		id: 'bp-0001',
		title: 'Fitness and Wellness:',
		subtext:
			'Stay active with fitness classes, gym access, and wellness programsStay active with fitness classes, gym access, and wellness programs.',
	},
	{
		id: 'bp-0002',
		title: 'Employee Assistance Program (EAP):',
		subtext: 'Access confidential counseling and support for mental and emotional wellbeing .',
	},

	{
		id: 'bp-0003',
		title: 'Health Benefits:',
		subtext: 'Explore comprehensive health insurance plans and wellness incentives.',
	},
	{
		id: 'bp-0001',
		title: 'Fitness and Wellness:',
		subtext:
			'Stay active with fitness classes, gym access, and wellness programsStay active with fitness classes, gym access, and wellness programs.',
	},
	{
		id: 'bp-0002',
		title: 'Employee Assistance Program (EAP):',
		subtext: 'Access confidential counseling and support for mental and emotional wellbeing .',
	},
]

const HealthWellness: FC = () => (
	<>
		<SectionWithHeader
			heading={'🌿 Health and Wellness'}
			subHeading={''}
			link={{ text: 'View All', path: '/' }}
		>
			<Scrollbar>
				<Box sx={{ p: 2, maxHeight: '300px' }}>
					{applicants.map((applicant) => (
						<Box
							key={applicant.id}
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
							}}
						>
							<Typography>✅</Typography>
							<Typography
								sx={{
									fontWeight: 600,
									color: '#2E394B',
									fontSize: 14,
									py: 1,
								}}
							>
								{applicant.title}
							</Typography>
							<Typography
								sx={{
									fontWeight: 400,
									color: '#697688',
									fontSize: 14,
									width: '550px',
									py: 1,
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									textOverflow: 'ellipsis',
								}}
							>
								{applicant.subtext}
							</Typography>
						</Box>
					))}
				</Box>
			</Scrollbar>
		</SectionWithHeader>
	</>
)

export default HealthWellness
