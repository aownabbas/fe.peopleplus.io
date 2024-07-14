import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'

const Payroll = () => {
	//   usePageView();

	return (
		<>
			<Seo title="Employee Payroll" />
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
					Employee Payroll
				</Typography>
			</Box>
		</>
	)
}

export default Payroll
