import React from 'react'
import { Box, Card, Stack, Typography } from '@mui/material'
import { Scrollbar } from '@components/scrollbar'
// import { UpcomingEvents } from '@sections/dashboard/UpcomingEvents'

const UpcomingEventsCard = () => {
	return (
		<Box>
			<Card>
				<Box
					sx={{
						width: '100%',
						height: 160,
						objectFit: 'cover',
					}}
				>
					<img
						src="./upcomingEvent.png"
						style={{ height: '100%', width: '100%' }}
						alt="Upcoming Event"
					/>
				</Box>
				<Stack
					sx={{
						border: '1px solid #EAECF0',
					}}
				>
					<Box sx={{ backgroundColor: '#F9FAFB', padding: '20px 24px' }}>
						<Typography
							sx={{
								fontSize: 18,
								fontWeight: 600,
								color: '#101323',
							}}
						>
							Upcoming Events
						</Typography>
						<Typography
							sx={{
								color: '#667085',
								fontWeight: 400,
								fontSize: 13,
							}}
						>
							Birthdays to anniversaries and whatnot
						</Typography>
					</Box>

					<Scrollbar>
						<Box
							sx={{
								p: 1,
								maxHeight: 1000,
							}}
						>
							{/* <UpcomingEvents /> */}
						</Box>
					</Scrollbar>
				</Stack>
			</Card>
		</Box>
	)
}

export default UpcomingEventsCard
