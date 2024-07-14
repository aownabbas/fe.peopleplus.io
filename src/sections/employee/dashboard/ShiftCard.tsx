import { Box, Button, Card, CardContent, CardMedia, Typography, SvgIcon } from '@mui/material'
import React from 'react'
import { Scrollbar } from '@components/scrollbar'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import { createTheme } from '@mui/system'

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)', // Adjust colors as needed
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

interface CardProps {
	coverImageSrc: string
	title: string
	subtitle: string
	buttontitle: string
	buttonText: string
	manualbutton: string
	recentLogs: { date: string; day: string; time: string[] }[]
}

const ShiftCard: React.FC<CardProps> = ({
	coverImageSrc,
	title,
	subtitle,
	buttontitle,
	buttonText,
	manualbutton,
	recentLogs,
}: CardProps) => {
	return (
		<Card sx={{}}>
			<CardMedia
				component="img"
				src={coverImageSrc}
				alt="Cover"
			/>
			<CardContent
				sx={{
					backgroundColor: '#F9FAFB',
					border: '1px solid #EAECF0',
				}}
			>
				<Typography
					variant="h6"
					sx={{ mb: 1 }}
				>
					{title}
				</Typography>
				<Typography
					variant="body2"
					color="textSecondary"
				>
					{subtitle}
				</Typography>
			</CardContent>
			<CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4 }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 2,
						pt: 1,
						pb: 3,
					}}
				>
					<Typography sx={{ color: '#344054', fontSize: '14', fontWeight: 500 }}>
						{buttontitle}
					</Typography>
					<Button
						variant="contained"
						sx={{
							borderRadius: 50,
							width: 200,
							height: 50,
							backgroundImage: 'linear-gradient(to right, #357dbc, #b591db)',
							color: 'white',
							display: 'flex',
							gap: '4px',
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							width="24"
							height="24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
							/>
						</svg>
						{buttonText}
					</Button>

					<Button variant="text">
						<Typography
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								cursor: 'pointer',
								background: theme.palette.background.default,
								color: 'transparent',
								WebkitBackgroundClip: 'text',
							}}
							variant="subtitle1"
						>
							<SvgIcon fontSize="small">
								<PlusIcon color={'#357DBC'} />
							</SvgIcon>
							{manualbutton}
						</Typography>
					</Button>
				</Box>

				<Box
					width="100%"
					display="flex"
					flexDirection="column"
					gap={3}
				>
					<Typography
						variant="h6"
						color="textPrimary"
						fontWeight="medium"
					>
						Recent Time Logs
					</Typography>
					<Scrollbar>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								maxHeight: '400px',
							}}
						>
							{recentLogs.map((log, index) => (
								<Box
									key={index}
									width="100%"
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									gap={2}
								>
									<Box
										display="flex"
										alignItems="center"
										gap={2}
									>
										{/* <img
										src="./tick.png"
										alt="Checkmark"
										width="24"
										height="24"
									/> */}
										<Typography>✅</Typography>
										<Box>
											<Typography
												variant="subtitle2"
												color="textPrimary"
												fontWeight="medium"
											>
												{log.date}
											</Typography>
											<Typography
												variant="body2"
												color="textSecondary"
											>
												{log.day}
											</Typography>
										</Box>
									</Box>
									<Box
										display="flex"
										flexDirection="column"
										alignItems="flex-end"
									>
										{log.time.map((time, idx) => (
											<Typography
												key={idx}
												variant="body2"
												color="textSecondary"
											>
												{time}
											</Typography>
										))}
									</Box>
								</Box>
							))}
						</Box>
					</Scrollbar>
				</Box>
			</CardContent>
		</Card>
	)
}

export default ShiftCard
