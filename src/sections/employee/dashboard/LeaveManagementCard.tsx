import React from 'react'
import { Card, CardContent, Typography, Box, Button, Stack, Tooltip } from '@mui/material'
import { createTheme } from '@mui/system'
import LeaveManagementProgressBar from '@sections/employee/dashboard/LeaveManagementProgressBar'
import { Scrollbar } from '@components/scrollbar'

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

const LeaveManagementCard = () => {
	return (
		<Card>
			<Scrollbar>
				<Box sx={{ maxHeight: 300, padding: 2 }}>
					{/* Leave Types */}
					<Stack>
						<Box>
							<LeaveManagementProgressBar
								imageSrc="./party.png"
								title="Public Holidays"
								progressValue={74}
							/>
						</Box>
						<Box>
							<LeaveManagementProgressBar
								imageSrc="./sick.png"
								title="Sick Leave"
								progressValue={74}
							/>
						</Box>
						<Box>
							<LeaveManagementProgressBar
								imageSrc="./plane.png"
								title="Annual Leave"
								progressValue={74}
							/>
						</Box>
					</Stack>
				</Box>
			</Scrollbar>

			{/* Leave Usage and Total Leaves */}
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: 2 }}>
					{/* Leave Usage Icon */}
					<Typography
						variant="body2"
						sx={{ color: 'text.secondary', fontSize: '12px', marginRight: 1 }}
					>
						Leave Usage
					</Typography>
				</Box>
				<Tooltip
					title={
						<Box
							sx={{
								color: '#fff',
							}}
						>
							<Typography variant="body2">Allocated: 3</Typography>
							<Typography variant="body2">Remaining: 7</Typography>
							<Typography variant="body2">Resets: 01 Jan, 2024</Typography>
						</Box>
					}
					arrow
				>
					<Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
						{/* Total Leaves Icon */}
						<Typography
							variant="body2"
							sx={{ color: 'text.secondary', fontSize: '12px', marginRight: 1 }}
						>
							Total Leaves
						</Typography>
					</Box>
				</Tooltip>
			</Box>
		</Card>
	)
}

export default LeaveManagementCard
