import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'

const Activity = () => {
	//   usePageView();

	return (
		<>
			<Seo title="Employee Activity" />
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
					Employee Activity
				</Typography>
			</Box>
		</>
	)
}

export default Activity
