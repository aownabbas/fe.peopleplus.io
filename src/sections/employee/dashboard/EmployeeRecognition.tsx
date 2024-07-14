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

interface Applicant {
	id: string
	avatar: string
	designation: string
	cover: string
	name: string
}

const applicants: Applicant[] = [
	{
		id: 'bp-0001',
		avatar: './hamad.jpeg',
		designation: 'Product Manager',
		cover: './achievement.png',
		name: 'Hamad Pervaiz',
	},
	{
		id: 'bp-0002',
		avatar: './user.png',
		designation: 'Web Developer',
		cover: './achievement.png',
		name: 'Ibrahim Hammayun',
	},

	{
		id: 'bp-0003',
		avatar: './user.png',
		designation: 'Quality Assurance',
		cover: './achievement.png',
		name: 'Muhammad Saad',
	},

	{
		id: 'bp-0004',
		avatar: './user.png',
		designation: 'Operations Manager',
		cover: './achievement.png',
		name: 'Taimoor Imam',
	},
]

const ProjectCard: FC = () => (
	<>
		<Box>
			<Typography sx={{ fontSize: 18, fontWeight: 500 }}>Employee Recognitions</Typography>
			<Scrollbar>
				<Box sx={{ display: 'flex', p: 2 }}>
					{applicants.map((applicant) => (
						<Box
							key={applicant.id}
							sx={{
								flexShrink: 0,
								marginRight: 2,
								width: '250px',
							}}
						>
							<Card sx={{ height: '100%', p: 2 }}>
								<CardContent
									sx={{
										pt: 2,
									}}
								>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											mb: 2,
										}}
									>
										<Avatar
											alt="Applicant"
											src={applicant.avatar}
											sx={{
												border: '3px solid #FFFFFF',
												height: 60,
												width: 60,
											}}
										/>
									</Box>
									<Link
										align="center"
										color="text.primary"
										sx={{ display: 'block' }}
										underline="none"
										variant="h6"
									>
										{applicant.name}
									</Link>
									<Typography
										align="center"
										variant="body2"
										color="text.secondary"
									>
										{applicant.designation}
									</Typography>
									<Divider sx={{ my: 2 }} />
									<CardMedia
										image={applicant.cover}
										sx={{ height: 150, backgroundSize: 'contain' }}
									/>
								</CardContent>
							</Card>
						</Box>
					))}
				</Box>
			</Scrollbar>
		</Box>
	</>
)

export default ProjectCard
