/* eslint-disable prettier/prettier */
import { useCallback, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

// mui imports
import { Box, Breadcrumbs, Container, Divider, Stack, Tab, Tabs, Typography } from '@mui/material'

import { Seo } from '@components/seo'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { SettingTabs } from 'type/settings'
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
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

const tabs: SettingTabs[] = [
	{ label: tokens.settings.tabs.general, value: '/settings/general' },
	{ label: tokens.settings.tabs.department, value: '/settings/department' },
	{ label: tokens.settings.tabs.asset, value: '/settings/asset' },
	{ label: tokens.settings.tabs.work_location, value: '/settings/work-location' },
	{ label: tokens.settings.tabs.skill_set, value: '/settings/skill-set' },
	{ label: tokens.settings.tabs.benefit_package, value: '/settings/benefit-package' },
	{ label: tokens.settings.tabs.onboarding, value: '/settings/onboarding' },
	{ label: tokens.settings.tabs.document_policy, value: '/settings/document-policy' },
	{ label: tokens.settings.tabs.pipeline_stages, value: '/settings/pipeline-stages' },

	// coming soon
	// { label: tokens.settings.tabs.modules, value: '/settings/modules' },
	// { label: tokens.settings.tabs.expenses, value: '/settings/expenses' },
	// { label: tokens.settings.tabs.localization, value: '/settings/localization' },
	// { label: tokens.settings.tabs.roles_Permissions, value: '/settings/roles-permissions' },
	// { label: tokens.settings.tabs.personalization, value: '/settings/personalization' },
	// { label: tokens.settings.tabs.notifications, value: '/settings/notifications' },
	// { label: tokens.settings.tabs.communication, value: '/settings/communication' },
	// { label: tokens.settings.tabs.backup_Recovery, value: '/settings/backup-recovery' },
	// { label: tokens.settings.tabs.advanced, value: '/settings/advanced' },
]

const Settings = () => {
	const { t } = useTranslation()
	// const user = useMockedUser();

	const location = useLocation()
	const navigate = useNavigate()
	const [currentTab, setCurrentTab] = useState<SettingTabs>({
		label: tokens.settings.tabs.general,
		value: '/settings/general',
	})

	const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
		const cTab = tabs.find((tab) => tab.value === value) || { label: '', value: '' }
		setCurrentTab(cTab)
		navigate(value)
	}, [])

	useEffect(() => {
		const cTab = tabs.find((tab) => tab.value === location.pathname) || {
			label: '',
			value: '',
		}
		setCurrentTab(cTab)
		return () => {}
	}, [location])

	return (
		<>
			<Seo title={`${t(tokens.nav.settings)} : ${t(currentTab.label)} `} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack
						spacing={3}
						sx={{
							pb: 3,
						}}
					>
						<Breadcrumbs
							separator={<BreadcrumbsSeparator />}
							sx={{
								mt: '6px',
							}}
						>
							<Typography
								color="text.primary"
								variant="subtitle2"
							>
								<Link
									to={'/'}
									style={{
										textDecoration: 'none',
										background: theme.palette.background.default,
										color: 'transparent',
										WebkitBackgroundClip: 'text',
										fontWeight: 500,
										fontSize: 14,
									}}
								>
									Dashboard
								</Link>
							</Typography>
							<Typography
								sx={{
									color: '#6C737F',
									fontWeight: '500',
									fontSize: '14px',
								}}
							>
								Settings
							</Typography>
						</Breadcrumbs>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Box>
								<Typography
									sx={{
										fontSize: '24px',
										fontWeight: 600,
										color: '#111927',

										'@media (min-width:600px)': {
											fontSize: '32px',
											fontWeight: 700,
										},
									}}
								>
									{t(tokens.nav.settings)}
								</Typography>
							</Box>

							{/* <Box>
								<Button
									sx={{ mt: 2, background: theme.palette.background.default, color: 'white' }}
									startIcon={
										<SvgIcon>
											<PlusIcon />
										</SvgIcon>
									}
									onClick={() => navigate('/recruitment/job')}
								>
									{t(dashboard.add_job)}
								</Button>
							</Box> */}
						</Box>
						<Box>
							<Tabs
								indicatorColor="primary"
								onChange={handleTabsChange}
								scrollButtons="auto"
								textColor="primary"
								value={currentTab.value}
								variant="scrollable"
								sx={{
									'& .MuiTabs-indicator': {
										background: theme.palette.background.default,
									},
									'& .MuiTab-root': {
										color: '#667085', // Default text color for inactive tabs
										'&.Mui-selected': {
											// Styles for the active tab
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
						</Box>
						<Outlet />
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default Settings
