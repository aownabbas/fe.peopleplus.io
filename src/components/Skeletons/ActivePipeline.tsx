import React from 'react'
import { Stack, Box, Tooltip, Typography, Card, Skeleton, Grid } from '@mui/material'

const SkeletonLoader = () => {
	const skeletonArray = new Array(2).fill(null) // Adjust the number as needed

	return (
		<Stack>
			{skeletonArray.map((_, index) => (
				<Box
					key={index}
					sx={{
						width: '100%',
						p: 2,
					}}
				>
					<Tooltip title="">
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
							<Skeleton
								variant="text"
								width="100%"
							/>
						</Typography>
					</Tooltip>

					<Typography
						sx={{
							fontSize: 16,
							fontWeight: 500,
							color: '#101323',
							mb: 2,
						}}
					>
						<Skeleton
							variant="text"
							width="60%"
						/>
					</Typography>

					<Grid
						container
						spacing={2}
						justifyContent="center"
					>
						{new Array(3).fill(null).map((_, cardIndex) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								key={cardIndex}
							>
								<Card
									sx={{
										border: '1px solid #f6f6f6',
										boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
										transition: 'background-color 0.3s',
										'&:hover': {
											backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
										},
									}}
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
										<Skeleton
											variant="text"
											width="100%"
										/>
										<Skeleton
											variant="text"
											width="70%"
										/>
									</Stack>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>
			))}
		</Stack>
	)
}

export default SkeletonLoader
