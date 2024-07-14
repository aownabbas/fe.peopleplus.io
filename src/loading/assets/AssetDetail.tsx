import React from 'react'
import { Skeleton, Box, Stack, Container, Grid, Card } from '@mui/material'
import {
	CommentsSkeleton,
	PageUpperSectionSkeleton,
	PolicyCardSkeleton,
} from '@components/Skeletons'
// Import Skeleton component

function RecruitmentPage() {
	return (
		<Box
			component="main"
			sx={{ flexGrow: 1 }}
		>
			<Container maxWidth="xl">
				<Stack spacing={1}>
					{/* Skeleton for CustomBreadcrumbs */}
					<PageUpperSectionSkeleton />

					<Box>
						<Grid container>
							<Grid
								item
								xs={12}
								md={8}
							>
								<Box
									sx={{
										mr: 0,
										mb: '32px',
										'@media (min-width: 900px)': {
											mr: '32px',
											mb: 0,
										},
									}}
								>
									<Card
										sx={{
											boxShadow: 'none !important',
											border: '1px solid #EAECF0',
											padding: '20px',
										}}
									>
										<Stack spacing={2}>
											<Box
												sx={{
													flexWrap: 'wrap',
													gap: '24px',
													justifyContent: 'center',
													display: 'flex',
													alignItems: 'center',
												}}
											>
												{Array.from(new Array(3)).map((_, index) => (
													<Skeleton
														key={index}
														variant="rectangular"
														width={236}
														height={187}
														sx={{ borderRadius: 1 }}
													/>
												))}
											</Box>

											<Box sx={{ display: 'flex', marginLeft: '10px', my: 2 }}>
												{Array.from(new Array(3)).map((_, index) => (
													<Skeleton
														key={index}
														variant="rectangular"
														width={100}
														height={40}
														sx={{ margin: index === 0 ? '0' : '0 0 0 8px' }}
													/>
												))}
											</Box>

											<CommentsSkeleton commentsCount={3}/>
										</Stack>
									</Card>
								</Box>
							</Grid>
							<Grid
								item
								xs={12}
								md={4}
							>
								<PolicyCardSkeleton />
							</Grid>
						</Grid>
					</Box>
				</Stack>
			</Container>
		</Box>
	)
}

export default RecruitmentPage
