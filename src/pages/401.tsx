import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'

import { RouterLink } from '@components/router-link'
import { Seo } from '@components/seo'
import { createTheme } from '@mui/system'
import { Stack } from '@mui/material'

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)', // Adjust colors as needed
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const Page = () => {
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<>
			<Seo title="Error: Not Found" />
			<Box
				component="main"
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexGrow: 1,
					py: '80px',
					backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)', // Gradient colors
					minHeight: '100vh',
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={4}>
						<Stack
							spacing={2}
							sx={{
								textAlign: 'center',
							}}
						>
							<Typography
								align="center"
								// variant={mdUp ? 'h3' : 'h2'}
								sx={{
									fontWeight: 800,
									background: theme.palette.background.default,
									color: 'transparent',
									WebkitBackgroundClip: 'text',
									fontSize: isSmallScreen ? '100px' : '140px',
									lineHeight: isSmallScreen ? '100px' : '140px',
								}}
							>
								401
							</Typography>
							<Typography
								align="center"
								sx={{
									color: '#111927',
									fontWeight: 600,
									fontSize: isSmallScreen ? '26px' : '52px',
									lineHeight: isSmallScreen ? '26px' : '52px',
								}}
							>
								Oops! Unauthorized Access
							</Typography>
							<Typography
								align="center"
								color="#6C737F"
								sx={{ mt: 2, fontSize: '1.1rem' }}
							>
								Access denied. Please check your credentials or log in.
							</Typography>
						</Stack>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Button
								component={RouterLink}
								href={'/'}
								sx={{
									textTransform: 'none',
									borderRadius: '10px',
									padding: '12px 24px',
									background: theme.palette.background.default,
									color: 'white',
								}}
							>
								Back to Dashboard
							</Button>
						</Box>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default Page
