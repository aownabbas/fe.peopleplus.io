import { PolicyCardSkeleton } from '@components/Skeletons'
import { Box, createTheme, Grid, Skeleton, Stack, Tab, Tabs } from '@mui/material'

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const Documents = () => {
	// Determine the number of skeleton items based on your expected UI
	const tabSkeletonCount = 5
	const documentSkeletonCount = 8 // Adjust based on average or desired grid count

	return (
		<Stack spacing={2}>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					overflow: 'hidden',
					alignItems: 'center',
				}}
			>
				<Skeleton
					variant="rectangular"
					width="70%"
					height={30}
					sx={{ marginBottom: 2, ml: '30px' }}
				/>
			</Box>

			{/* Skeleton for Document Cards */}
			<Grid
				container
				spacing={2}
			>
				{Array.from({ length: documentSkeletonCount }).map((_, index) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						lg={3}
						key={index}
					>
						<PolicyCardSkeleton />
					</Grid>
				))}
			</Grid>
		</Stack>
	)
}

export default Documents
