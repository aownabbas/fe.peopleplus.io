import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'

const Performance = () => {
	//   usePageView();

	return (
		<>
			<Seo title="Employee Performance" />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Typography
					sx={{
						color: 'GrayText',
					}}
				>
					Employee Performance
				</Typography>
			</Box>
		</>
	)
}

export default Performance
