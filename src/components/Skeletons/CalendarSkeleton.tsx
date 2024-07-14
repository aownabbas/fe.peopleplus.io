import { Box, Skeleton, Grid } from '@mui/material'

const CalendarSkeleton = () => {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	return (
		<Box p={2}>
			{/* Header skeleton */}
			<Box mb={2}>
				<Grid
					container
					spacing={1}
				>
					{days.map((day) => (
						<Grid
							item
							xs
							key={day}
						>
							<Skeleton
								variant="rectangular"
								height={40}
							/>
						</Grid>
					))}
				</Grid>
			</Box>

			{/* Calendar rows skeleton */}
			<Grid
				container
				spacing={1}
			>
				{[...Array(6)].map((_week, weekIndex) => (
					<Grid
						container
						item
						spacing={1}
						key={weekIndex}
					>
						{[...Array(7)].map((_day, dayIndex) => (
							<Grid
								item
								xs
								key={dayIndex}
							>
								<Skeleton
									variant="rectangular"
									height={100}
								/>
							</Grid>
						))}
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

export default CalendarSkeleton
