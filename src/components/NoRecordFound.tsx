// mui import
import { Box, Container, Typography, useMediaQuery } from '@mui/material'

// import { Seo } from '@components/seo'
import type { Theme } from '@mui/material/styles/createTheme'

const NoRecordFound = () => {
	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return (
		<>
			{/* <Seo title="Error: Record Not Found" /> */}
			<Box
				component="main"
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexGrow: 1,
					py: '80px',
				}}
			>
				<Container maxWidth="lg">
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							mb: 1,
						}}
					>
						{/* <img
							alt="Not found"
							component="img"
							src="/noData.png"
							sx={{
								height: '200px',
								width: '200px',
							}}
						/> */}

						<img
							src="/folder.svg"
							style={{
								height: '60px',
								width: 'auto',
								opacity: '30%',
							}}
						/>
					</Box>
					<Typography
						align="center"
						sx={{
							opacity: '60%',
						}}
						variant={mdUp ? 'h4' : 'h6'}
					>
						No Record Found
					</Typography>
					{/* <Typography
						align="center"
						color="text.secondary"
						sx={{ mt: 0.5 }}
					>
						{t(tokens.common.empty_state.subheading)}
					</Typography> */}
				</Container>
			</Box>
		</>
	)
}

export default NoRecordFound
