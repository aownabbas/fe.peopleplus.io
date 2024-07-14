/* eslint-disable prettier/prettier */
import type { FC } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { createTheme } from '@mui/system'
import { Tooltip } from '@mui/material'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

interface EmpListWidgetProps {
	employeeCount: number
}
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

export const EmpListWidget: FC<EmpListWidgetProps> = ({ employeeCount }) => {
	return (
		<Box>
			<Grid
				container
				spacing={3}
			>
				<Grid
					xs={12}
					md={6}
					lg={3}
					xl={3}
				>
					<Card
						sx={{
							transition: 'background-color 0.3s', // Add transition for smoother effect
							'&:hover': {
								backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)', // Gradient colors
							},
						}}
					>
						<Stack
							alignItems="center"
							direction="row"
							spacing={2}
							sx={{ p: 2 }}
						>
							<Stack
								spacing={1}
								sx={{ flexGrow: 1 }}
							>
								<Typography
									color="text.secondary"
									variant="overline"
								>
									{t(tokens.employee.listing.Widgets.total_emp)}
								</Typography>
								<Stack
									alignItems="center"
									direction="row"
									spacing={1}
								>
									<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 24 }}>
										{employeeCount ?? 0}
									</Typography>
									{/* <SeverityPill color="success">+4% from Dec 2023</SeverityPill> */}
								</Stack>
							</Stack>
						</Stack>
					</Card>
					{/* Your Card content here */}
				</Grid>
				<Grid
					xs={12}
					md={6}
					lg={3}
					xl={3}
				>
					<Card
						sx={{
							transition: 'background-color 0.3s', // Add transition for smoother effect
							'&:hover': {
								backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)', // Gradient colors
							},
						}}
					>
						<Stack
							alignItems="center"
							direction="row"
							spacing={2}
							sx={{ p: 2 }}
						>
							<Stack
								spacing={1}
								sx={{ flexGrow: 1 }}
							>
								<Typography
									color="text.secondary"
									variant="overline"
								>
									{t(tokens.employee.listing.Widgets.logged_in_emp)}
								</Typography>
								<Stack
									alignItems="center"
									direction="row"
									spacing={1}
								>
									<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 24 }}>
										N/A
									</Typography>
									{/* <SeverityPill color="success">+4% from Dec 2023</SeverityPill> */}
								</Stack>
							</Stack>
						</Stack>
					</Card>
					{/* Your Card content here */}
				</Grid>
				<Grid
					xs={12}
					md={6}
					lg={3}
					xl={3}
				>
					<Card
						sx={{
							transition: 'background-color 0.3s', // Add transition for smoother effect
							'&:hover': {
								backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)', // Gradient colors
							},
						}}
					>
						<Stack
							spacing={1}
							sx={{ p: 2 }}
						>
							<Typography
								color="text.secondary"
								variant="overline"
							>
								{t(tokens.employee.listing.Widgets.company_health)}
							</Typography>
							<Stack
								alignItems="center"
								direction="row"
								spacing={1}
							>
								<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 24 }}>
									100%
								</Typography>
								<LinearProgress
									color="primary"
									sx={{ flexGrow: 1 }}
									value={100}
									variant="determinate"
								/>
							</Stack>
						</Stack>
					</Card>
					{/* Your Card content here */}
				</Grid>

				<Grid
					xs={12}
					md={6}
					lg={3}
					xl={3}
				>
					<Card
						sx={{
							transition: 'background-color 0.3s', // Add transition for smoother effect
							'&:hover': {
								backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)', // Gradient colors
							},
						}}
					>
						<Stack
							spacing={1}
							sx={{ p: 2 }}
						>
							<Typography
								color="text.secondary"
								variant="overline"
							>
								{t(tokens.employee.listing.Widgets.active_last)}
							</Typography>
							<Stack
								alignItems="center"
								direction="row"
								spacing={1}
							>
								<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 24 }}>
									N/A
								</Typography>
								<LinearProgress
									color="primary"
									sx={{ flexGrow: 1 }}
									value={100}
									variant="determinate"
								/>
							</Stack>
						</Stack>
					</Card>
					{/* Your Card content here */}
				</Grid>
			</Grid>
		</Box>
	)
}
