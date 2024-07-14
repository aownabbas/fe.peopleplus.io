import React from 'react'
import {
	Box,
	Container,
	Stack,
	Avatar,
	Typography,
	IconButton,
	Tooltip,
	Divider,
	Tab,
	Tabs,
	Skeleton,
	Grid,
} from '@mui/material'
import { WhatsApp as WhatsAppIcon, Phone as PhoneIcon } from '@mui/icons-material'
import { CardSkeleton, PolicyCardSkeleton } from '@components/Skeletons'
// Import other necessary components and hooks

const ProfileSkeleton = () => {
	return (
		<Box
			component="main"
			sx={{ flexGrow: 1 }}
		>
			<Container maxWidth="xl">
				<Stack spacing={2}>
					<Skeleton
						variant="rectangular"
						height={30}
						width="40%"
					/>{' '}
					{/* Breadcrumbs Skeleton */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							justifyContent: 'space-between',
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Stack>
								<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
									<Skeleton
										sx={{ alignItems: 'center', gap: 1, borderRadius: '50%' }}
										width={75}
										height={125}
									/>
									<Stack>
										<Box
											sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
										>
											<Skeleton
												width={70}
												height={24}
											/>
										</Box>
										<Box
											sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
										>
											<Skeleton
												width={60}
												height={24}
											/>
											<Skeleton
												width={70}
												height={24}
											/>
										</Box>
									</Stack>
								</Box>
							</Stack>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<Skeleton
								variant="circular"
								width={50}
								height={50}
							/>
							<Skeleton
								variant="circular"
								width={50}
								height={50}
							/>
						</Box>
					</Box>
					<Stack
						spacing={2}
						sx={{ mb: 2 }}
					>
						<Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
							{Array.from({ length: 5 }).map((_, index) => (
								<Skeleton
									key={index}
									width={80}
									height={40}
								/>
							))}
						</Box>
						<Divider />
					</Stack>
					<Stack
						direction="row"
						sx={{ display: 'flex', gap: 4, width: '100%' }}
					>
						<Grid
							container
							spacing={4}
						>
							<Grid
								item
								xs={12}
								md={4}
							>
								<Typography component="div">
									<PolicyCardSkeleton />
								</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								md={8}
							>
								<Stack width="100%">
									<CardSkeleton />
									<Stack sx={{ marginTop: '20px' }}>
										<CardSkeleton />
									</Stack>
								</Stack>
							</Grid>
						</Grid>
					</Stack>
				</Stack>
			</Container>
		</Box>
	)
}

export default ProfileSkeleton
