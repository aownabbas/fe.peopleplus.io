import { createTheme } from '@mui/system'
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Skeleton,
	Stack,
	Typography,
	Divider,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { FieldCardSkeleton } from '@components/Skeletons'

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

const JobDetail = () => {
	const { headers, form } = tokens.recruitment.add_job
	const { t } = useTranslation()
	return (
		<Box
			component="main"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				ml: 1,
			}}
		>
			<Grid
				container
				spacing={1}
			>
				<Grid
					xs={12}
					md={8}
					sx={{ pb: 3 }}
				>
					<FieldCardSkeleton
						firstTitle={t(headers.job_details)}
						secondTitle={t(headers.additional_information)}
					/>
				</Grid>

				<Grid
					xs={12}
					md={4}
				>
					<Card
						sx={{
							'@media (min-width: 768px)': {
								ml: 2,
							},
						}}
					>
						<CardContent>
							<Stack
								spacing={1}
								sx={{ pb: 3 }}
							>
								<Skeleton
									variant="text"
									width="100%"
									height={20}
								/>
								<Skeleton
									variant="text"
									width="80%"
									height={25}
								/>
								<Box>
									<Skeleton
										variant="text"
										width="60%"
										height={20}
									/>
									<Skeleton
										variant="text"
										width="60%"
										height={20}
									/>
									<Skeleton
										variant="text"
										width="60%"
										height={20}
									/>
								</Box>
							</Stack>

							<Box sx={{ my: 1 }}>
								<Skeleton
									variant="rectangular"
									width="100%"
									height={40}
									sx={{ borderRadius: 4 }}
								/>
							</Box>
							<Divider />
							<Stack sx={{ py: 2 }}>
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Skeleton
										variant="text"
										width="50%"
										height={25}
									/>
									<Skeleton
										variant="circular"
										width={35}
										height={35}
									/>
								</Box>
								<Skeleton
									variant="text"
									width="80%"
									height={20}
								/>
							</Stack>

							<Skeleton
								variant="rectangular"
								width="160px"
								height={40}
								sx={{ borderRadius: 4, my: '2px' }}
							/>

							<Box sx={{ mt: 3 }}>
								<Skeleton
									variant="text"
									width="40%"
									height={20}
									sx={{ pb: 1 }}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	)
}

export default JobDetail
