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
	Tooltip,
	useMediaQuery,
} from '@mui/material'
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { Seo } from '@components/seo'
import { getEmployeeProfileAction, employeeSelector } from '@redux/features/employeeSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { SeverityPill } from '@components/severity-pill'

import { createTheme } from '@mui/system'
import { Employee } from 'type/employee'

import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
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
const ProfileLayout = () => {
	const { t } = useTranslation()

	const dispatch = useAppDispatch()
	const { detail } = useAppSelector(employeeSelector)
	const empProfile: Employee = detail as Employee

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.employee.profile_layout.breadcrumbs.dashboard, url: '/' }, // Set color for this link
		{ label: `${empProfile.first_name} ${empProfile.last_name}`, color: 'black' }, // Concatenate first_name and last_name
	]

	const tabs = [
		{ label: tokens.employee.profile_layout.tabs.profile.label, value: `/profile/detail` },
		{ label: tokens.employee.profile_layout.tabs.documents.label, value: `/profile/document` },
		{ label: tokens.employee.profile_layout.tabs.onboarding.label, value: `/profile/onboarding` },
		{ label: tokens.employee.profile_layout.tabs.assets.label, value: `/profile/assets` },
		{ label: tokens.employee.profile_layout.tabs.preferences.label, value: `/profile/preference` },
	]

	const [currentTab, setCurrentTab] = useState(`/`)
	const [pageLoading, setPageLoading] = useState(true)
	const [anchorEl, setAnchorEl] = useState(null)

	const navigate = useNavigate() // Get the navigate function

	const handleTabsChange = useCallback((event: any, value: string) => {
		console.log(value)
		setCurrentTab(value)
		navigate(value)
	}, [])

	const currentPageUrl = window.location.href
	const path = new URL(currentPageUrl).pathname
	let extractedPart = path.split('/').slice().join('/')

	if (extractedPart == '/profile') {
		extractedPart = '/profile/detail'
	}

	useEffect(() => {
		if (extractedPart.includes('profile/asset/detail')) {
			setCurrentTab(`/profile/assets`)
		} else {
			setCurrentTab(`${extractedPart}`)
		}
		navigate(`${extractedPart}`)
	}, [extractedPart])

	useEffect(() => {
		dispatch(getEmployeeProfileAction())
			.then(() => {
				setPageLoading(false) // Set pageLoading to false once the response is received
			})
			.catch((error: any) => {
				// Handle error if any
				console.error('Error fetching employee profile:', error)
			})
	}, [])

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleOpenApp = (app: any) => {
		switch (app) {
			case 'whatsapp':
				window.open('https://wa.me/#phone', '_blank')
				break
			case 'phone':
				window.open('tel:#phone', '_blank')
				break
			case 'email':
				window.open('mailto:#email', '_blank')
				break
			default:
				break
		}
		handleClose()
	}

	const isSmallScreen = useMediaQuery('(max-width:600px)')

	if (pageLoading) {
		return <EmployeeProfileLoading />
	}
	return (
		<>
			<Box
				component="main"
				sx={{ flexGrow: 1 }}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<CustomBreadcrumbs links={breadcrumbsLinks} />

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
