import { useCallback, useState } from 'react'

// mui imports
import CustomTabPanel from '@components/CustomTabPanel'
import {
	Tab,
	Drawer,
	IconButton,
	SvgIcon,
	Box,
	Typography,
	Stack,
	Tabs,
	createTheme,
	Tooltip,
} from '@mui/material'
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock'
import { a11yProps, giveMeManag } from '@utils/index'
import { DetailTab, DetailTabsValues } from 'type/policies'
import { useAppSelector } from '@redux/hooks'
import { selectedDocumentSelector } from '@redux/features/policiesSlice'
import { formatTime } from '@utils/times'
import AddForm from '../AddForm'
import UpdateDocument from './tabs/UpdateDocument'
import { currentUserTypeSelector } from '@redux/features/authSlice'
import { ROLE } from '@config/index'
import { Scrollbar } from '@components/scrollbar'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

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
	{ label: 'Content', value: 0 },
	{ label: 'Edit', value: 1 },
]

const DocumentDetail = () => {
	const { t } = useTranslation()

	const selectedDocument = useAppSelector(selectedDocumentSelector)
	const userType: ROLE = useAppSelector(currentUserTypeSelector)

	const [currentTab, setCurrentTab] = useState<number>(0)

	const handleTabsChange = useCallback(
		// eslint-disable-next-line @typescript-eslint/ban-types
		(event: React.ChangeEvent<{}>, value: number): void => {
			setCurrentTab(value)
		},
		[],
	)

	return (
		<Stack
			spacing={2}
			sx={{ py: '40px' }}
			onClick={(event) => event.stopPropagation()} // Prevent the drawer from closing when clicking inside
		>
			<Box sx={{ px: '20px', display: 'flex', alignItems: 'center', gap: 2 }}>
				<Box>
					<img
						src={selectedDocument?.icon}
						alt="policy icon"
						style={{ borderRadius: '100%', width: '70px', height: '70px' }}
					/>
				</Box>
				<Stack>
					<Tooltip title={selectedDocument?.title}>
						<Typography
							sx={{
								color: '#111927',
								fontWeight: 700,
								fontSize: {
									xs: 20,
									md: 24,
								},
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: {
									xs: '200px',
									md: '400px',
								},
								textOverflow: 'ellipsis',
							}}
						>
							{selectedDocument?.title}
						</Typography>
					</Tooltip>
					<Stack
						alignItems="center"
						direction="row"
						spacing={1}
					>
						<SvgIcon>
							<ClockIcon
								style={{
									color: '#6C737F',
								}}
							/>
						</SvgIcon>
						<Typography
							sx={{
								color: '#6C737F',
								fontWeight: 500,
								fontSize: 12,
								lineHeight: '19px',
							}}
						>
							{t(tokens.policy.last_updated)}{' '}
							{formatTime(
								selectedDocument?.updated_at || new Date().toISOString(),
								'YYY MMM dd, h:mm a',
							)}
						</Typography>
					</Stack>
				</Stack>
			</Box>

			<Box sx={{ width: '100%' }}>
				{userType === 'organization' && (
					<Box sx={{ borderBottom: 1, borderColor: 'divider', px: '20px' }}>
						<Tabs
							value={currentTab}
							onChange={handleTabsChange}
							aria-label="basic tabs example"
							indicatorColor="primary"
							scrollButtons="auto"
							textColor="primary"
							variant="scrollable"
							defaultValue={0}
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
									label={tab.label}
									value={tab.value}
									{...a11yProps('documentDetail')(Number(tab.value))}
								/>
							))}
						</Tabs>
					</Box>
				)}
				<CustomTabPanel
					value={currentTab}
					index={0}
					style={{ width: '100%' }}
				>
					<Box sx={{ px: '20px', wordBreak: 'break-word', width: '100%' }}>
						<Typography
							sx={{
								width: '100%',
								'& img': {
									maxWidth: '100%',
									height: 'auto',
								},
							}}
							variant="body1"
							dangerouslySetInnerHTML={{ __html: selectedDocument?.content || '' }}
						/>
					</Box>
				</CustomTabPanel>
				{userType === 'organization' && (
					<CustomTabPanel
						value={currentTab}
						index={1}
					>
						<Box sx={{ px: 2, pb: 0 }}>
							<UpdateDocument />
						</Box>
					</CustomTabPanel>
				)}
			</Box>
		</Stack>
	)
}

export default DocumentDetail
