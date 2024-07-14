import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'
import SvgIcon from '@mui/material/SvgIcon'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Seo } from '@components/seo'
// import { usePageView } from '@hooks/use-page-view';
// import { paths } from 'src/paths';
import { createTheme } from '@mui/system'

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
const EmptyState = () => {
	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	//   usePageView();

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
				}}
			>
				<Container maxWidth="lg">
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							mb: 6,
						}}
					>
						<img
							src="./no-data.png"
							style={{
								height: '200px',
								width: '200px',
							}}
						/>
					</Box>
					<Typography
						align="center"
						variant="h1"
						sx={{
							fontSize: '20px',
							'@media (min-width: 600px)': {
								fontSize: '32px',
							},
						}}
					>
						There are no jobs yet.
					</Typography>
					<Typography
						align="center"
						color="text.secondary"
						sx={{
							mt: 0.5,
							'@media (max-width: 960px)': {
								fontSize: '16px',
							},
						}}
					></Typography>
				</Container>
			</Box>
		</>
	)
}

export default EmptyState
