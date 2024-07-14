import type { FC } from 'react'

// mui imports
import {
	Stack,
	Card,
	Box,
	Typography,
	CardContent,
	Divider,
	TableCell,
	TableRow,
	Tooltip,
} from '@mui/material'
import type { CandidateStageCount } from 'type/recruitment'
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

export const HelperRow: FC<{ stages: CandidateStageCount }> = ({ stages }) => {
	return (
		<TableRow
			sx={{
				backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
			}}
		>
			<TableCell></TableCell>
			<TableCell
				colSpan={7}
				sx={{
					p: 0,
					// position: 'relative',
					// '&:after': {
					// 	position: 'absolute',
					// 	content: '" "',
					// 	top: 0,
					// 	left: 0,
					// 	backgroundColor: 'primary.main',
					// 	width: 3,
					// 	height: 'calc(100% + 1px)',
					// },
				}}
			>
				{/* <CardContent> */}
				<Box
					sx={{
						p: 1,
						display: 'flex',
						gap: 2,
						py: '20px',
					}}
				>
					{Object.keys(stages).map((stage) => (
						<Card
							key={stage}
							sx={{
								boxShadow: 'none !important',
								width: '175px',
								height: '70px',
								borderRadius: '10px',
								px: '10px',
								py: '7px',
								backgroundColor: '#FCFDFD',
								border: '1px solid #E0E0E0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'background-color 0.3s', // Add transition for smoother effect
								'&:hover': {
									// backgroundImage: 'linear-gradient(135deg, #357DBC, #B591DB)', // Gradient colors
									background: theme.palette.background.default,
									// Change the color of Typography text to white on hover
									'& .MuiTypography-root': {
										// Assuming you are using Material-UI v5
										color: 'white',
									},
								},
							}}
						>
							<Stack
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Typography
									sx={{
										color: '#111927',
										fontWeight: 500,
										fontSize: 14,
									}}
								>
									{stage}
								</Typography>
								<Tooltip title={stages[stage]}>
									<Typography
										sx={{
											color: '#6C737F',
											fontWeight: 400,
											fontSize: 12,
											overflow: 'hidden',
											maxWidth: '110px',
											textOverflow: 'ellipsis',
										}}
									>
										{stages[stage] > 999
											? '999+ Applicants'
											: stages[stage] > 1
												? `${stages[stage]} Applicants`
												: `${stages[stage]} Applicant`}
									</Typography>
								</Tooltip>
							</Stack>
						</Card>
					))}
				</Box>
				{/* </CardContent> */}
				<Divider />
			</TableCell>
		</TableRow>
	)
}

export default HelperRow
