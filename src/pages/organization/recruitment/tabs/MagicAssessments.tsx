import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'

const MagicAssessment = () => {
	return (
		<>
			<Seo title="Magic Assessment" />
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
					Magic Assessment
				</Typography>
			</Box>
		</>
	)
}

export default MagicAssessment
