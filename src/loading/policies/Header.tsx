import { CardSkeleton } from '@components/Skeletons'
import {
	Skeleton,
	Box,
	Grid,
	useMediaQuery,
	useTheme,
	CardContent,
	Stack,
	Card,
} from '@mui/material'

const Header = () => {
	const theme = useTheme()
	const isMdScreen = useMediaQuery(theme.breakpoints.up('md'))
	return (
		<>
			{/* top header */}
			<>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '16px',
					}}
				>
					{/* Skeleton for the Heading Text */}
					{/* <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> */}
					<Box
						width={{ xs: '200px', sm: '300px' }}
						height={32}
					>
						<Skeleton
							variant="text"
							sx={{ width: '100%', height: '100%' }}
						/>
					</Box>
					{/* Conditional Skeleton for the Button, based on userType */}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Skeleton
							variant="rectangular"
							width={120}
							height={36}
							sx={{ borderRadius: '4px' }}
						/>
					</Box>
				</Box>
			</>
			{/* widget section */}
			<Grid container>
				<Grid
					xs={12}
					xl={6}
				>
					<Card
						sx={{
							boxShadow: 'none !important',
							border: '1px solid #EAECF0',
							height: 'auto',
							'@media (min-width: 900px)': {
								height: '200px',
							},
						}}
					>
						<CardContent
							sx={{
								py: '36px',
								px: '24px',
							}}
						>
							<Box
								sx={{
									display: isMdScreen ? 'flex' : 'flex',
									flexDirection: isMdScreen ? 'row' : 'column',
									alignItems: 'center',
									gap: 4,
								}}
							>
								{/* Skeleton for the Chart */}
								<Skeleton
									variant="rectangular"
									width={260}
									height={260}
									sx={{
										mx: -4,
										my: -6,
									}}
								/>

								{/* Skeletons for Text Information */}
								<Stack
									spacing={1}
									sx={{ mt: 2, ml: 2, width: '100%' }}
								>
									<Skeleton
										variant="text"
										width="60%"
										height={29}
									/>
									<Skeleton
										variant="text"
										width="80%"
										height={24}
									/>
								</Stack>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid
					xs={12}
					xl={6}
				>
					<Card
						sx={{
							boxShadow: 'none !important',
							border: '1px solid #EAECF0',
							height: 'auto',
							mt: 2,
							'@media (min-width: 1440px)': {
								ml: 2,
								mt: 0,
							},
							'@media (min-width: 900px)': {
								height: '200px',
							},
						}}
					>
						<CardContent>
							<Box
								sx={{
									gap: 2,
									justifyContent: 'space-evenly',
									display: isMdScreen ? 'flex' : 'flex',
									flexDirection: isMdScreen ? 'row' : 'column',
									// background: 'orange',
								}}
							>
								{/* Skeleton for the first section */}
								<Box sx={{ width: '100%' }}>
									<Stack
										direction="column"
										spacing={1}
									>
										{Array.from({ length: 1 }).map((_, index) => (
											<Skeleton
												key={index}
												variant="text"
												width={`${Math.random() * (80 - 60) + 60}%`}
											/>
										))}
										{Array.from({ length: 2 }).map((_, index) => (
											<Skeleton
												key={index}
												variant="text"
												width={`${Math.random() * (60 - 40) + 40}%`}
											/>
										))}

										<Skeleton
											variant="rectangular"
											height={36}
										/>
									</Stack>
								</Box>
								{/* Skeleton for the second section */}
								<Box sx={{ width: '100%' }}>
									<Stack
										direction="column"
										spacing={1}
									>
										{Array.from({ length: 1 }).map((_, index) => (
											<Skeleton
												key={index}
												variant="text"
												width={`${Math.random() * (80 - 60) + 60}%`}
											/>
										))}
										{Array.from({ length: 2 }).map((_, index) => (
											<Skeleton
												key={index}
												variant="text"
												width={`${Math.random() * (60 - 40) + 40}%`}
											/>
										))}

										<Skeleton
											variant="rectangular"
											height={36}
										/>
									</Stack>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			{/* navigation bar  */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				{/* Skeleton for the Heading */}
				<Skeleton
					width="40%"
					height={30}
				/>

				{/* Skeleton for the Button with Icon */}
				<Box
					display="flex"
					alignItems="center"
				>
					<Skeleton
						width={100}
						height={36}
					/>
					<Skeleton
						variant="circular"
						width={20}
						height={20}
						sx={{ marginLeft: 1 }}
					/>
				</Box>
			</Box>
		</>
	)
}

export default Header
