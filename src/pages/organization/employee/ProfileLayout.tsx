/* eslint-disable prettier/prettier */
import { useState, useCallback, useEffect } from 'react'
import { useNavigate, Outlet, useParams, Link } from 'react-router-dom' // Import useNavigate
import BackdropLoader from '@components/BackdropLoader'
import {
	Box,
	Container,
	Divider,
	Stack,
	Tab,
	Tabs,
	Typography,
	Breadcrumbs,
	MenuItem,
	Menu,
	Avatar,
	IconButton,
	Tooltip,
} from '@mui/material'

import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { Seo } from '@components/seo'
import { getEmployeeProfileAction, employeeSelector } from '@redux/features/employeeSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { SeverityPill } from '@components/severity-pill'
import SvgIcon from '@mui/material/SvgIcon'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { createTheme } from '@mui/system'
import { Employee } from 'type/employee'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import { useTranslation } from 'react-i18next'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { tokens } from '@locales/tokens'
import useMediaQuery from '@mui/material/useMediaQuery'
import { urlPreFix } from '@config/index'
import { EmployeeProfileLoading } from '@loading/employees'

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
const tabs = [
	{
		label: tokens.employee.profile_layout.tabs.profile.label,
		value: `/${urlPreFix.employee}/profile/`,
	},
	{
		label: tokens.employee.profile_layout.tabs.documents.label,
		value: `/${urlPreFix.employee}/document/`,
	},
	{
		label: tokens.employee.profile_layout.tabs.onboarding.label,
		value: `/${urlPreFix.employee}/onboarding/`,
	},
	{
		label: tokens.employee.profile_layout.tabs.assets.label,
		value: `/${urlPreFix.employee}/asset/`,
	},
	{
		label: tokens.employee.profile_layout.tabs.comments.label,
		value: `/${urlPreFix.employee}/comments/`,
	},
	{
		label: tokens.employee.profile_layout.tabs.preferences.label,
		value: `/${urlPreFix.employee}/preference/`,
	},
]
const ProfileLayout = () => {
	const isSmallScreen = useMediaQuery('(max-width:600px)')

	const { t } = useTranslation()
	const { uuid } = useParams()

	const dispatch = useAppDispatch()
	const { detail } = useAppSelector(employeeSelector)
	const empProfile: Employee = detail as Employee

	const [currentTab, setCurrentTab] = useState(`/employee/profile/`)
	const [pageLoading, setPageLoading] = useState(true)
	const [anchorEl, setAnchorEl] = useState(null)

	const navigate = useNavigate()

	const handleTabsChange = useCallback(
		(event: any, value: string) => {
			const concatenatedValue = value + uuid
			setCurrentTab(value)
			navigate(concatenatedValue)
		},
		[uuid],
	)

	const currentPageUrl = window.location.href

	const path = new URL(currentPageUrl).pathname
	const extractedPart = path.split('/').slice(0, -1).join('/')

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.employee.profile_layout.breadcrumbs.dashboard, url: '/' },
		{ label: tokens.employee.profile_layout.breadcrumbs.employee, url: `/${urlPreFix.employee}` },
		{ label: empProfile.first_name + ' ' + empProfile.last_name, color: 'black' },
	]

	useEffect(() => {
		const isProfileTab = currentTab.includes('/profile/')
		// const isPreferenceTab = currentTab.includes('/preference/');

		if (isProfileTab) {
			setPageLoading(true)
			dispatch(getEmployeeProfileAction(uuid as string))
				.then(() => {
					setPageLoading(false)
				})
				.catch((error: any) => {
					console.error('Error fetching employee profile:', error)
				})
		}
		setCurrentTab(`${extractedPart}/`)
		navigate(`${extractedPart}/${uuid}`)
	}, [uuid, currentTab])

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleOpenApp = (app: any) => {
		switch (app) {
			case 'whatsapp':
				window.open('https://wa.me/' + empProfile.phone_number, '_blank')
				break
			case 'phone':
				window.open('tel:+' + empProfile.phone_number, '_blank')
				break
			case 'email':
				window.open('mailto:#email', '_blank')
				break
			default:
				break
		}
		handleClose()
	}

	if (pageLoading) {
		// Show loader while page is loading
		// return <BackdropLoader />
		return <EmployeeProfileLoading />
	}
	return (
		<>
			<Seo title="Dashboard: Account" />
			<Box
				component="main"
				sx={{ flexGrow: 1 }}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<CustomBreadcrumbs links={breadcrumbsLinks} />

						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								width: '100%',
								justifyContent: 'space-between',
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<Avatar
									src={empProfile.photo}
									sx={{
										width: { xs: '50px', sm: '70px' },
										height: { xs: '50px', sm: '70px' },
										objectFit: 'cover',
										border: '2px solid #357DBC',
									}}
								></Avatar>
								<Stack>
									<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
										<Tooltip title={`${empProfile.first_name} ${empProfile.last_name}`}>
											<Typography
												sx={{
													fontSize: { xs: '18px', sm: '24px' },
													fontWeight: '700',
													color: '#111927',
													textWrap: 'nowrap',
													overflow: 'hidden',
													maxWidth: '350px',
													textOverflow: 'ellipsis',
												}}
											>
												{isSmallScreen
													? `${empProfile.first_name}. ${empProfile.last_name[0]}`
													: `${empProfile.first_name} ${empProfile.last_name}`}
											</Typography>
										</Tooltip>
									</Box>
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center',
											gap: 1,
										}}
									>
										<Typography sx={{ fontWeight: 500, fontSize: 14, color: '#111927' }}>
											{t(tokens.employee.profile_layout.header.id_heading)}:
										</Typography>
										<SeverityPill
											color="info"
											sx={{
												fontSize: 13,
												fontWeight: 500,
												lineHeight: '18px',
												px: '6px',
											}}
										>
											{t(tokens.employee.profile_layout.header.id_code)}
											{empProfile.employee_id}
										</SeverityPill>
									</Box>
								</Stack>
							</Box>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 1,
								}}
							>
								{/* <IconButton
									sx={{
										background: '#00D95F',
										color: 'white',
										gap: 1,
									}}
									onClick={() => handleOpenApp('whatsapp')}
								>
									<Typography
										sx={{
											display: { xs: 'none', md: 'block' },
											fontWeight: 600,
											fontSize: 14,
											lineHeight: '24px',
										}}
									>
										{t(tokens.employee.profile_layout.button.action)}
									</Typography>
									<SvgIcon
										sx={{
											margin: '0px',
											width: '24px',
										}}
									>
										<KeyboardArrowDownOutlinedIcon />
									</SvgIcon>
								</IconButton> */}

								<IconButton
									onClick={() => handleOpenApp('whatsapp')}
									sx={{
										backgroundColor: '#00D95F',
										width: { xs: '30px', sm: '40px' },
										height: { xs: '30px', sm: '40px' },
										'&:hover': {
											backgroundColor: '#00c556',
										},
									}}
								>
									<WhatsAppIcon sx={{ color: 'white', width: { xs: '20px', sm: '40px' } }} />
								</IconButton>
								<IconButton
									onClick={() => handleOpenApp('phone')}
									sx={{
										backgroundColor: '#00D95F',
										width: { xs: '30px', sm: '40px' },
										height: { xs: '30px', sm: '40px' },

										'&:hover': {
											backgroundColor: '#00c556',
										},
									}}
								>
									<PhoneIcon sx={{ color: 'white', width: { xs: '20px', sm: '40px' } }} />
								</IconButton>

								{/* <Menu
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={() => handleOpenApp('whatsapp')}>
										<WhatsAppIcon />
										<Typography sx={{ marginLeft: '10px' }}>
											{t(tokens.employee.profile_layout.button.whatsapp)}
										</Typography>{' '}
									</MenuItem>
									<MenuItem onClick={() => handleOpenApp('phone')}>
										<PhoneIcon />{' '}
										<Typography sx={{ marginLeft: '10px' }}>
											{t(tokens.employee.profile_layout.button.phone)}
										</Typography>
									</MenuItem>
									<MenuItem onClick={() => handleOpenApp('email')}>
										<EmailIcon />{' '}
										<Typography sx={{ marginLeft: '10px' }}>
											{t(tokens.employee.profile_layout.button.gmail)}
										</Typography>
									</MenuItem>
								</Menu> */}
							</Box>
						</Box>
						<Stack
							spacing={3}
							sx={{ mb: 3 }}
						>
							<Tabs
								indicatorColor="primary"
								onChange={handleTabsChange}
								scrollButtons="auto"
								textColor="primary"
								value={currentTab}
								variant="scrollable"
								sx={{
									'& .MuiTabs-indicator': {
										background: theme.palette.background.default,
									},
									'& .MuiTab-root': {
										color: '#6C737F',
										'&.Mui-selected': {
											background: theme.palette.background.default,
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent',
											MozBackgroundClip: 'text',
											MozTextFillColor: 'transparent',
										},
									},
								}}
							>
								{tabs.map((tab) => (
									<Tab
										key={tab.value}
										label={t(tab.label)}
										value={tab.value}
									/>
								))}
							</Tabs>
							<Divider />
						</Stack>
						<Outlet />
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default ProfileLayout
