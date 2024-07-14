import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'

const Expenses = () => {
	//   usePageView();

	return (
		<>
			<Seo title="Employee Expenses" />
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
					Employee Expenses
				</Typography>
			</Box>
		</>
	)
}

export default Expenses
