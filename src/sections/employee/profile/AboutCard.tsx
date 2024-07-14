/* eslint-disable prettier/prettier */
import { useEffect, useState, type FC } from 'react'
import Briefcase01Icon from '@untitled-ui/icons-react/build/esm/Briefcase01'
import Home02Icon from '@untitled-ui/icons-react/build/esm/Home02'
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01'
import {
	Box,
	Stack,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	SvgIcon,
	Typography,
	Avatar,
	Button,
	Tooltip,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	employeeSelector,
	getEmployeeOnboardingAction,
	updateEmployeeProfileAction,
} from '@redux/features/employeeSlice'
import { Employee, NewEmployee } from 'type/employee'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { createTheme } from '@mui/system'
import Loading from '@components/Loading'
import toast from 'react-hot-toast'
import { authUserSelector } from '@redux/features/authSlice'
import { AuthState } from 'type/auth'
import { useParams } from 'react-router-dom'
import { aiAssessmentOnUserData } from '@service/GptApi'
import { assetsSelector } from '@redux/features/assetsSlice'
import { Asset } from 'type/asset'

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

export const AboutCard: FC = () => {
	const { t } = useTranslation()

	const { detail } = useAppSelector(employeeSelector)
	const empProfile: Employee = detail as Employee
	const dispatch = useAppDispatch()
	const { user }: AuthState = useAppSelector(authUserSelector)

	const members: Employee[] = (detail as any).children
	const [isReadMore, setIsReadMore] = useState(true)
	const aboutText = empProfile?.about?.trim()
	const MAX_LENGTH = 115
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore)
	}

	const [employee, setEmployee] = useState<Employee | null>(null)
	const data = useAppSelector(employeeSelector)
	const { asset } = useAppSelector(assetsSelector)
	const completedOnboardingList = data?.onBoardingList.filter(
		(item: any) => item.is_completed === 1,
	)
	const { list }: { list: Asset[] } = useAppSelector(assetsSelector)

	useEffect(() => {
		setEmployee(detail as Employee)
		if (user && Object.keys(user).length > 0) {
			dispatch(getEmployeeOnboardingAction(user?.employee?.uuid))
		}
	}, [detail, user])

	const [query, setQuery] = useState(
		'Create about for this employee into 8 lines just.show only text. do not show any number such as UUID,country No, ID,employee ID, or photo.',
	)
	const [loading, setLoading] = useState(false)

	const shouldShowButton = aboutText && aboutText.length > MAX_LENGTH

	const objectToFormData = (obj: any): FormData => {
		const formData = new FormData()

		Object.entries(obj).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				if (key === 'benefit' && Array.isArray(value) && value.length > 0) {
					value.forEach((uuid) => {
						formData.append('benefit[]', uuid)
					})
				} else if (key === 'working_days' && Array.isArray(value) && value.length > 0) {
					value.forEach((day) => {
						formData.append('working_days[]', day)
					})
				} else if (value instanceof FileList) {
					formData.append(key, value[0])
				} else {
					formData.append(key, String(value))
				}
			}
		})

		return formData
	}

	const updateEmployeeAbout = async () => {
		setLoading(true)
		try {
			const aboutContent = await aiAssessmentOnUserData(
				data?.detail,
				list,
				data?.documents,
				completedOnboardingList,
				query,
			)

			const initialValues = {
				first_name: employee?.first_name ?? '',
				last_name: employee?.last_name ?? '',
				// photo: employee?.photo ?? '',
				gender: employee?.gender ?? 'male',
				cnic: employee?.cnic ?? '',
				dob: employee?.dob ? new Date(employee.dob) : new Date(),
				email: employee?.email ?? '',
				password: '',
				city: employee?.city ?? '',
				state: employee?.state ?? '',
				postcode: employee?.postcode ?? 0,
				street_address: employee?.street_address ?? '',
				phone_number: employee?.phone_number ?? '',
				emergency_contact: employee?.emergency_contact ?? '',
				joining_date: employee?.joining_date ? new Date(employee.joining_date) : null,
				probation_end_date: employee?.probation_end_date
					? new Date(employee.probation_end_date)
					: null,
				termination_date: employee?.termination_date ? new Date(employee.termination_date) : null,
				employee_type: employee?.employee_type ?? 'full-time',
				employee_id: employee?.employee_id ?? '',
				employee_status: employee?.employee_status ?? 'active',
				designation:
					(employee?.designation?.first_name ?? '') +
					' ' +
					(employee?.designation?.last_name ?? ''),
				department_id: employee?.department?.name ?? '',
				pay_frequency: employee?.pay_frequency ?? '',
				currency: employee?.currency ?? 'pkr',
				working_hours: employee?.working_hours ?? '',
				uuid: employee?.uuid ?? '',
				degree: employee?.degree ?? '',
				institute: employee?.institute ?? '',
				about: aboutContent ?? '',
				time_zone: employee?.time_zone ?? '',
				work_location_id: employee?.work_location?.name ?? '',
				country_id: employee?.country_id ?? '',
				working_days: employee?.working_days ? JSON.parse(employee.working_days) : [],
				salary: employee?.salary ?? '',
				job_title: employee?.job_title ?? '',
				benefit: employee?.benefit ?? [],
				...(employee?.is_top_level === 1 && { is_top_level: employee.is_top_level }), // Conditional inclusion
			}

			const formData = objectToFormData(initialValues)
			const uuid = user?.employee?.uuid
			if (uuid) {
				const response = await dispatch(updateEmployeeProfileAction({ uuid, formData })).unwrap()
				if (response) {
					toast.success('Profile Updated Successfully')
				}
			}
		} catch (error: any) {
			console.error('Error updating onboarding stats', error)
			toast.error('Error updating onboarding stats')
		} finally {
			setLoading(false)
		}
	}
	return (
		<>
			<Card
				sx={{
					boxShadow: 'none !important',
					border: '1px solid #E5E7EB',
				}}
			>
				<CardContent>
					<Stack spacing={2}>
						<Stack spacing={2}>
							<Typography
								sx={{
									fontWeight: 600,
									fontSize: 12,
									lineHeight: '24px',
									color: '#6C737F',
									textTransform: 'uppercase',
								}}
							>
								{t(tokens.employee.profile.quick_shot.heading)}
							</Typography>

							<Box>
								<Typography
									sx={{
										fontWeight: 500,
										fontSize: '14px',
										lineHeight: '21px',
										color: '#111927',
									}}
								>
									{t(tokens.employee.profile.about_card.about_title)}
								</Typography>
								{empProfile.about ? (
									<Box>
										<Typography
											sx={{
												fontWeight: 400,
												fontSize: '14px',
												lineHeight: '21px',
												color: '#6C737F',
												maxWidth: '400px',
												wordBreak: 'break-word',
											}}
										>
											{/* Show abbreviated or full text based on isReadMore state */}
											{isReadMore
												? aboutText.length > MAX_LENGTH
													? `${aboutText.slice(0, MAX_LENGTH)}...`
													: aboutText
												: aboutText}
										</Typography>
										{/* Conditionally render the button based on text length */}
										<Box sx={{ width: '100%', display: 'flex', justifyContent: 'start' }}>
											{shouldShowButton && (
												<Button
													onClick={toggleReadMore}
													sx={{
														background: theme.palette.background.default,
														WebkitBackgroundClip: 'text',
														WebkitTextFillColor: 'transparent',
													}}
												>
													{isReadMore
														? t(tokens.employee.profile.about_card.read_more)
														: t(tokens.employee.profile.about_card.read_less)}
												</Button>
											)}
										</Box>
										<Box sx={{ width: '100%', display: 'flex', justifyContent: 'start' }}>
											<Button
												type="submit"
												onClick={updateEmployeeAbout}
												sx={{
													mt: 2,
													background: theme.palette.background.default,
													color: 'white',
													'&:disabled': {
														color: 'white',
													},
												}}
											>
												{loading === true ? (
													<Loading
														size={20}
														showMessage={true}
													/>
												) : (
													'Regenerate About'
												)}
											</Button>
										</Box>
									</Box>
								) : (
									<Box sx={{ width: '100%', justifyContent: 'start' }}>
										{/* <Typography
											sx={{
												fontWeight: 400,
												fontSize: '14px',
												lineHeight: '21px',
												color: '#6C737F',
												maxWidth: '400px',
												wordBreak: 'break-word',
												marginTop:"10px"
											}}
										>
											Generate About with Ai Assessment by clicking button below..
										</Typography> */}
										<Button
											type="submit"
											onClick={updateEmployeeAbout}
											sx={{
												mt: 2,
												background: theme.palette.background.default,
												color: 'white',
												'&:disabled': {
													color: 'white',
												},
											}}
										>
											{loading === true ? (
												<Loading
													size={20}
													showMessage={true}
												/>
											) : (
												'Generate About'
											)}
										</Button>
									</Box>
								)}
							</Box>

							{empProfile.salary && (
								<Box>
									<Typography
										sx={{
											fontWeight: 500,
											fontSize: '14px',
											lineHeight: '21px',
											color: '#111927',
										}}
									>
										{t(tokens.employee.profile.about_card.salary_title)}
									</Typography>
									<Typography
										sx={{
											fontWeight: 400,
											fontSize: '14px',
											lineHeight: '21px',
											color: '#6C737F',
										}}
									>
										{t(tokens.employee.profile.about_card.pkr)} {empProfile.salary}
									</Typography>
								</Box>
							)}

							{empProfile.department && (
								<Box>
									<Typography
										sx={{
											fontWeight: 500,
											fontSize: '14px',
											lineHeight: '21px',
											color: '#111927',
										}}
									>
										{t(tokens.employee.profile.about_card.department_title)}
									</Typography>
									<Tooltip title={empProfile?.department?.name}>
										<Typography
											sx={{
												fontWeight: 400,
												fontSize: '14px',
												lineHeight: '21px',
												color: '#6C737F',
												textWrap: 'nowrap',
												overflow: 'hidden',
												maxWidth: '300px',
												textOverflow: 'ellipsis',
											}}
										>
											{empProfile?.department?.name}
										</Typography>
									</Tooltip>
								</Box>
							)}
						</Stack>

						<List>
							{(empProfile.institute || empProfile.degree) && (
								<ListItem
									disableGutters
									divider
								>
									<ListItemAvatar>
										<SvgIcon sx={{ color: '#6C737F' }}>
											<Briefcase01Icon />
										</SvgIcon>
									</ListItemAvatar>
									<ListItemText
										disableTypography
										primary={
											<Tooltip title={empProfile.institute}>
												<Typography
													sx={{
														fontWeight: 500,
														fontSize: '14px',
														lineHeight: '21px',
														color: '#111927',
														textWrap: 'nowrap',
														overflow: 'hidden',
														maxWidth: '300px',
														textOverflow: 'ellipsis',
													}}
												>
													{empProfile.institute}
												</Typography>
											</Tooltip>
										}
										secondary={
											<Tooltip title={empProfile.degree}>
												<Typography
													sx={{
														fontWeight: 400,
														fontSize: '14px',
														lineHeight: '21px',
														color: '#111927',
														textWrap: 'nowrap',
														overflow: 'hidden',
														maxWidth: '300px',
														textOverflow: 'ellipsis',
													}}
												>
													{empProfile.degree}
												</Typography>
											</Tooltip>
										}
									/>
								</ListItem>
							)}

							{empProfile.address && (
								<>
									<ListItem
										disableGutters
										divider
									>
										<ListItemAvatar>
											<SvgIcon sx={{ color: '#6C737F' }}>
												<Home02Icon />
											</SvgIcon>
										</ListItemAvatar>
										<ListItemText
											disableTypography
											primary={
												<Tooltip title={empProfile.address}>
													<Typography
														sx={{
															fontWeight: 500,
															fontSize: '14px',
															lineHeight: '21px',
															color: '#111927',
															display: '-webkit-box',
															WebkitBoxOrient: 'vertical',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
															WebkitLineClamp: 2,
															maxHeight: '42px', // 2 lines * line-height
															maxWidth: '300px',
														}}
													>
														{empProfile.address}
													</Typography>
												</Tooltip>
											}
										/>
									</ListItem>
								</>
							)}

							<ListItem
								disableGutters
								divider
							>
								<ListItemAvatar>
									<SvgIcon sx={{ color: '#6C737F' }}>
										<Mail01Icon />
									</SvgIcon>
								</ListItemAvatar>
								<ListItemText
									disableTypography
									primary={
										<ListItemText
											disableTypography
											primary={
												<Tooltip title={empProfile.email}>
													<Typography
														sx={{
															fontWeight: 500,
															fontSize: '14px',
															lineHeight: '21px',
															color: '#111927',
															textWrap: 'nowrap',
															overflow: 'hidden',
															maxWidth: '300px',
															textOverflow: 'ellipsis',
														}}
													>
														{empProfile.email}
													</Typography>
												</Tooltip>
											}
											secondary={
												<Tooltip title={empProfile.phone_number}>
													<Typography
														sx={{
															fontWeight: 400,
															fontSize: '14px',
															lineHeight: '21px',
															color: '#111927',
															textWrap: 'nowrap',
															overflow: 'hidden',
															maxWidth: '300px',
															textOverflow: 'ellipsis',
														}}
													>
														{empProfile.phone_number}
													</Typography>
												</Tooltip>
											}
										/>
									}
								/>
							</ListItem>
						</List>

						{members?.length > 0 && (
							<List disablePadding>
								<Typography
									sx={{
										fontWeight: 600,
										fontSize: 12,
										lineHeight: '24px',
										color: '#6C737F',
										textTransform: 'uppercase',
									}}
								>
									Team
								</Typography>
								{members.map((member, index) => (
									<ListItem
										disableGutters
										key={index}
									>
										<ListItemAvatar>
											<Avatar src={member.photo} />
										</ListItemAvatar>
										<ListItemText
											primary={
												<Tooltip title={`${member.first_name} ${member.last_name}`}>
													<Typography
														sx={{
															fontWeight: 500,
															fontSize: '14px',
															lineHeight: '21px',
															color: '#111927',
															textWrap: 'nowrap',
															overflow: 'hidden',
															maxWidth: '300px',
															textOverflow: 'ellipsis',
														}}
													>
														{member.first_name} {member.last_name}
													</Typography>
												</Tooltip>
											}
											secondary={
												<Tooltip title={member.email}>
													<Typography
														sx={{
															fontWeight: 500,
															fontSize: '14px',
															lineHeight: '21px',
															color: '#111927',
															display: '-webkit-box',
															WebkitBoxOrient: 'vertical',
															overflow: 'hidden',
															textOverflow: 'ellipsis',
															WebkitLineClamp: 2,
															maxHeight: '42px', // 2 lines * line-height
															maxWidth: '300px',
														}}
													>
														{member.email}
													</Typography>
												</Tooltip>
											}
										/>
									</ListItem>
								))}
							</List>
						)}
					</Stack>
				</CardContent>
			</Card>
		</>
	)
}
