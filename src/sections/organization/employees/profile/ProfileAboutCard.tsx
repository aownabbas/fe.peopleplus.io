/* eslint-disable prettier/prettier */
import { useEffect, useState, type FC } from 'react'
import Briefcase01Icon from '@untitled-ui/icons-react/build/esm/Briefcase01'
import Home02Icon from '@untitled-ui/icons-react/build/esm/Home02'
import Mail01Icon from '@untitled-ui/icons-react/build/esm/Mail01'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	employeeSelector,
	getEmployeeOnboardingAction,
	updateEmployeeProfileAction,
} from '@redux/features/employeeSlice'
import { Employee } from 'type/employee'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { Button, Tooltip } from '@mui/material'
import { createTheme } from '@mui/system'
import { assetsSelector } from '@redux/features/assetsSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { saveEmployeeOnBoardingRequest, updateEmployeeProfileRequest } from '@service/employee'
import toast from 'react-hot-toast'
import Loading from '@components/Loading'
import { gptConfig } from '@config/index'
import { aiAssessmentOnUserData } from '@service/GptApi'

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

export const ProfileAboutCard: FC = () => {
	const { t } = useTranslation()
	const { detail } = useAppSelector(employeeSelector)
	const empProfile: Employee = detail as Employee

	const members: Employee[] = (detail as any).children
	const [isReadMore, setIsReadMore] = useState(true)
	const dispatch = useDispatch()
	const { uuid }: any = useParams()
	const [employee, setEmployee] = useState<Employee | null>(null)
	const appDispatch = useAppDispatch()

	const aboutText = empProfile?.about?.trim()
	const MAX_LENGTH = 115

	const toggleReadMore = () => {
		setIsReadMore(!isReadMore)
	}

	useEffect(() => {
		dispatch(getEmployeeOnboardingAction({ uuid }))
		setEmployee(detail as Employee)
	}, [])

	const shouldShowButton = aboutText && aboutText.length > MAX_LENGTH
	const data = useAppSelector(employeeSelector)
	const { employeeAssets } = useAppSelector(assetsSelector)
	const completedOnboardingList = data?.onBoardingList.filter((item) => item.is_completed === 1)

	const [query, setQuery] = useState(
		'Create about for this employee into 8 lines just.show only text. do not show any number such as,country No, UUID, ID,employee ID, or photo.',
	)

	const [loading, setLoading] = useState(false)

	const objectToFormData = (obj: any) => {
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
		const aboutContent = await aiAssessmentOnUserData(
			data?.detail,
			employeeAssets,
			data?.documents,
			completedOnboardingList,
			query,
		)
		const initialValues = {
			first_name: employee?.first_name ?? '',
			last_name: employee?.last_name ?? '',
			gender: employee?.gender ?? '',
			cnic: employee?.cnic ?? '',
			dob: employee?.dob ? new Date(employee.dob) : null,
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
			employee_type: employee?.employee_type ?? '',
			employee_status: employee?.employee_status ?? '',
			designation: employee?.designation?.uuid ?? '',
			department_id: employee?.department?.uuid ?? '',
			pay_frequency: employee?.pay_frequency ?? '',
			currency: employee?.currency ?? 'pkr',
			working_hours: employee?.working_hours ?? '',
			uuid: employee?.uuid ?? '',
			degree: employee?.degree ?? '',
			institute: employee?.institute ?? '',
			about: aboutContent ?? '',
			time_zone: employee?.time_zone ?? '',
			work_location_id: employee?.work_location?.id ?? '',
			country_id: employee?.country_id ?? '25',
			working_days: employee?.working_days ? JSON.parse(employee.working_days) : [],
			salary: employee?.salary ?? '',
			job_title: employee?.job_title ?? '',
			benefit: employee?.benefit ?? [],
			// is_top_level: employee?.is_top_level ?? 0,
			...(employee?.is_top_level === 1 && { is_top_level: employee.is_top_level }),
		}
		try {
			const formData = objectToFormData(initialValues)

			appDispatch(updateEmployeeProfileAction({ uuid, formData })).then(({ type }) => {
				if (type.includes('fulfilled')) {
					toast.success('Profile Updated Successfully')
					setLoading(false)
				}
			})
		} catch (error: any) {
			console.error('Error updating onboarding stats', error)
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
							{!empProfile.about ? (
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
												'Generate About'
											)}
										</Button>
									</Box>
								</Box>
							) : (
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
									<Box>
										<Typography
											sx={{
												fontWeight: 400,
												fontSize: 14,
												lineHeight: '21px',
												color: '#6C737F',
												maxWidth: '400px',
												wordBreak: 'break-word',
											}}
										>
											{isReadMore
												? aboutText.length > MAX_LENGTH
													? `${aboutText.slice(0, MAX_LENGTH)}...`
													: aboutText
												: aboutText}
										</Typography>
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
								</Box>
							)}

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
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<Typography
											sx={{
												fontWeight: 400,
												fontSize: '14px',
												lineHeight: '21px',
												color: '#6C737F',
												textTransform: 'uppercase',
											}}
										>
											{empProfile.currency}
										</Typography>
										<Typography
											sx={{
												fontWeight: 400,
												fontSize: '14px',
												lineHeight: '21px',
												color: '#6C737F',
											}}
										>
											{empProfile.salary}
										</Typography>
									</Box>
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
															maxHeight: '42px',
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
									{t(tokens.employee.profile.about_card.team_title)}
								</Typography>
								{members.map((member, index) => (
									<ListItem
										disableGutters
										key={index}
									>
										<ListItemAvatar>
											<Avatar
												src={member.photo}
												sx={{ objectFit: 'cover' }}
											/>
										</ListItemAvatar>
										<ListItemText
											primary={
												<Typography
													sx={{
														fontWeight: 500,
														fontSize: 14,
														lineHeight: '21px',
														color: '#111927',
													}}
												>
													{member.first_name} {member.last_name}
												</Typography>
											}
											secondary={
												<Typography
													sx={{
														fontWeight: 400,
														fontSize: 14,
														lineHeight: '21px',
														color: '#6C737F',
													}}
												>
													{member.email}
												</Typography>
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
