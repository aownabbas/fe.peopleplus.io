import { Box, Skeleton } from '@mui/material'

const PageHeader = () => {
	return (
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
	)
}

export default PageHeader
