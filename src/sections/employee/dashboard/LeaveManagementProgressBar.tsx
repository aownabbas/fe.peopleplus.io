import React from 'react'
import { Box, Typography, LinearProgress } from '@mui/material'

interface LeaveManagementProgressBarProps {
	imageSrc: string
	title: string
	progressValue: number
}

const LeaveManagementProgressBar: React.FC<LeaveManagementProgressBarProps> = ({
	imageSrc,
	title,
	progressValue,
}) => {
	return (
		<Box sx={{ marginBottom: 3 }}>
			<Typography
				variant="subtitle1"
				sx={{ color: 'text.secondary' }}
			>
				{title}
			</Typography>
			<Box
				sx={{
					position: 'relative',
					backgroundColor: 'gray.200',
					borderRadius: 'full',
					height: 10,
					marginTop: 1,
				}}
			>
				<LinearProgress
					sx={{
						flexGrow: 1,
						height: 10,
						borderRadius: 5,
					}}
					value={progressValue}
					variant="determinate"
				/>
				<Box
					sx={{
						position: 'absolute',
						top: -15,
						right: '20%',
						borderRadius: 'full',
					}}
				>
					<img
						src={imageSrc}
						style={{ width: 50 }}
						alt={title}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default LeaveManagementProgressBar
