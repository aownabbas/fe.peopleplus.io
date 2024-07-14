import React from 'react'
import { Box, Grid, Stack, Skeleton, Card } from '@mui/material'

const LoadingSkeleton = () => {
	return (
		<Card
			sx={{
				boxShadow: 'none !important',
				border: '1px solid #EAECF0',
				padding: '20px',
			}}
		>
			<Box sx={{ pr: 2 }}>
				{/* Company Info Section */}
				<Grid
					container
					spacing={2}
				>
					<Grid
						item
						xs={12}
						md={3}
					>
						<Skeleton
							variant="text"
							width={150}
							height={30}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={9}
					>
						<Stack spacing={3}>
							<Grid
								container
								spacing={2}
							>
								<Grid
									item
									xs={12}
								>
									<Stack
										direction="row"
										spacing={2}
										alignItems="center"
									>
										<Skeleton
											variant="rectangular"
											width={200}
											height={80}
										/>
										<Skeleton
											variant="text"
											width={100}
											height={20}
										/>
									</Stack>
								</Grid>
								{[...Array(5)].map((_, index) => (
									<Grid
										item
										xs={12}
										md={6}
										key={index}
									>
										<Skeleton
											variant="rectangular"
											width="100%"
											height={56}
										/>
									</Grid>
								))}
								<Grid
									item
									xs={12}
								>
									<Skeleton
										variant="text"
										width={200}
										height={20}
									/>
									<Skeleton
										variant="rectangular"
										width="100%"
										height={500}
									/>
								</Grid>
							</Grid>
						</Stack>
					</Grid>
				</Grid>

				{/* Office Info Section */}
				<Grid
					container
					spacing={2}
					sx={{ mt: 4 }}
				>
					<Grid
						item
						xs={12}
						md={3}
					>
						<Skeleton
							variant="text"
							width={150}
							height={30}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={9}
					>
						<Stack spacing={3}>
							<Grid
								container
								spacing={2}
							>
								{[...Array(4)].map((_, index) => (
									<Grid
										item
										xs={12}
										md={6}
										key={index}
									>
										<Skeleton
											variant="rectangular"
											width="100%"
											height={56}
										/>
									</Grid>
								))}
								<Grid
									item
									xs={12}
								>
									<Skeleton
										variant="rectangular"
										width="100%"
										height={56}
									/>
								</Grid>
							</Grid>
						</Stack>
					</Grid>
				</Grid>
			</Box>
			{/* Submit Button */}
			<Box sx={{ justifyContent: 'end', display: 'flex', width: '100%', mt: 2 }}>
				<Skeleton
					variant="rectangular"
					width={150}
					height={40}
				/>
			</Box>
		</Card>
	)
}

export default LoadingSkeleton
