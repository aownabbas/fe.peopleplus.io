/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AlertIcon from '@untitled-ui/icons-react/build/esm/AlertTriangle'
import Error from '@untitled-ui/icons-react/build/esm/AlertCircle'
import Grid from '@mui/material/Grid'
import { Seo } from '@components/seo'
import { ProfileAboutCard } from '@sections/organization/employees/profile/ProfileAboutCard'
import { Stack } from '@mui/material'
import { employeeSelector } from '@redux/features/employeeSlice'
import { useAppSelector } from '@redux/hooks'
import { Employee } from 'type/employee'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

const Profile = () => {
	const { t } = useTranslation()
	const { detail } = useAppSelector(employeeSelector)
	const empProfile: Employee = detail as Employee

	//   usePageView();
	return (
		<>
			<Seo title={t(tokens.seo_titles.employees.profile)} />
			<Grid
				container
				sx={{
					pb: 2,
				}}
			>
				<Grid
					xs={12}
					md={4}
				>
					<ProfileAboutCard />
				</Grid>
				<Grid
					xs={12}
					md={8}
					sx={{
						paddingTop: 4,
						paddingLeft: 0,
						'@media (min-width:900px)': {
							paddingTop: 0,
							paddingLeft: 4,
						},
					}}
				>
					<Stack spacing={3}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								color: '#772917',
								backgroundColor: '#FDEAD7',
								padding: 2,
								borderRadius: 2,
								'@media (min-width: 768px)': {
									flexDirection: 'row',
								},
							}}
						>
							<Box sx={{ width: ['100%', '5%'], marginBottom: [2, 0] }}>
								<AlertIcon color="#F79009" />
							</Box>
							<Box sx={{ width: ['100%', '70%'], marginBottom: [2, 0] }}>
								<Typography
									sx={{
										fontWeight: 500,
										fontSize: 16,
									}}
								>
									{empProfile.first_name}{' '}
									{t(tokens.employee.profile.unavailable_card.unavailable_heading)}
								</Typography>
								<Typography
									sx={{
										fontWeight: 400,
										fontSize: 14,
									}}
								>
									{t(tokens.employee.profile.unavailable_card.unavailable_text)}
								</Typography>
							</Box>
							<Box sx={{ width: ['100%', '25%'], textAlign: ['start', 'end'] }}>
								<Typography
									sx={{
										fontWeight: 500,
										fontSize: 14,
									}}
								>
									{t(tokens.employee.profile.unavailable_card.unavailable_date)}
								</Typography>
							</Box>
						</Box>
						{empProfile.employee_status == 'deactive' && (
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column', // Default to column layout
									color: '#7A271A',
									backgroundColor: '#FEE4E2',
									padding: 2,
									borderRadius: 2,
									'@media (min-width: 768px)': {
										// Media query for md and larger screens
										flexDirection: 'row', // Switch to row layout for md and larger screens
									},
								}}
							>
								<Box sx={{ width: ['100%', '5%'], marginBottom: [2, 0] }}>
									<Error color="#F04438" />
								</Box>
								<Box sx={{ width: ['100%', '95%'], marginBottom: [2, 0] }}>
									<Typography
										sx={{
											fontWeight: 500,
											fontSize: 16,
										}}
									>
										{t(tokens.employee.profile.suspended_card.suspended_heading)}
									</Typography>
									<Typography
										sx={{
											fontWeight: 400,
											fontSize: 14,
										}}
									>
										{t(tokens.employee.profile.suspended_card.suspended_text)}{' '}
									</Typography>
								</Box>
							</Box>
						)}
					</Stack>
				</Grid>
			</Grid>
		</>
	)
}
export default Profile
