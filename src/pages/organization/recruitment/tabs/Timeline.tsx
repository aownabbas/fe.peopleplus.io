import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'

const Timeline = () => {
	//   usePageView();

	return (
		<>
			<Seo title="Timeline & Notes" />
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
					Timeline & Notes
				</Typography>
			</Box>
		</>
	)
}

export default Timeline
