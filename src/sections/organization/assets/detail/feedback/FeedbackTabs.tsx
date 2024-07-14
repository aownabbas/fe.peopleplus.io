import { FC, useState } from 'react'

// mui imports
import { Tabs, Tab, Typography, Box, Container, Stack, Divider } from '@mui/material'

// internalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import type { FeedbackTabs } from 'type/asset'
import CustomTabPanel from '@components/CustomTabPanel'
import { a11yProps } from '@utils/index'
import { ActivityTabSection, DocumentTabSection, CommentsTabSection } from '.'
import { createTheme } from '@mui/system'

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

const tabs: FeedbackTabs[] = [
	{ label: tokens.asset.feedback.comment.label, value: 0 },
	{ label: tokens.asset.feedback.tabs.activity, value: 1 },
	{ label: tokens.asset.feedback.tabs.documents, value: 2 },
]

const feedbackA11yProps = a11yProps('feedback')

const FeedbackTabs: FC = () => {
	const { t } = useTranslation()

	// const location = useLocation()
	// const navigate = useNavigate()

	const [currentTab, setCurrentTab] = useState<FeedbackTabs>({
		label: tokens.asset.feedback.comment.label,
		value: 0,
	})

	const handleTabsChange = (event: React.SyntheticEvent, value: number) => {
		const cTab = tabs.find((tab) => tab.value === value) || {
			label: tokens.asset.feedback.comment.label,
			value: 0,
		}
		setCurrentTab(cTab)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Stack
				spacing={3}
				sx={{ mb: 3 }}
			>
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
								color: '#6C737F', // Default text color for inactive tabs
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
								{...feedbackA11yProps(tab.value)}
							/>
						))}
					</Tabs>
					<Divider />
				</Box>
			</Stack>
			<CustomTabPanel
				value={currentTab.value}
				index={0}
			>
				<CommentsTabSection />
			</CustomTabPanel>
			<CustomTabPanel
				value={currentTab.value}
				index={1}
			>
				<ActivityTabSection />
			</CustomTabPanel>
			<CustomTabPanel
				value={currentTab.value}
				index={2}
			>
				<DocumentTabSection />
			</CustomTabPanel>
		</Box>
	)
}
export default FeedbackTabs
