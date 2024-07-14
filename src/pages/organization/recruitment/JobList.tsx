import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// mui imports
import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	Container,
	Divider,
	Input,
	Stack,
	SvgIcon,
	Tab,
	Tabs,
	Typography,
} from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { Seo } from '@components/seo'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	handleJobListSearchStatus,
	jobListAction,
	recruitmentSelector,
	recruitmentStatusSelector,
} from '@redux/features/recruitmentSlice'
import { JobStatusSection, JobListSection } from '@sections/organization/recruitment/dashboard'
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { createTheme } from '@mui/system'
import { useDebounce } from '@uidotdev/usehooks'
import { PageLoading } from '@loading/recruitment'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink, TabOption } from 'type/config'
import { departListingRequest } from '@service/recruitment'
import { DepartmentTabs } from 'type/recruitment'
import { tabInitialization } from '@config/index'

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

const Dashboard = () => {
	const { t } = useTranslation()
	const { dashboard } = tokens.recruitment

	// please do not remove code related to tabs , contact Saad and uamir before uncommenting it or removing it
	// const [tabs, setTabs] = useState<TabOption<string, string>[]>([tabInitialization])

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { jobPaginateData } = useAppSelector(recruitmentSelector)
	const [search, setSearch] = useState<string>('')
	// const [currentTab, setCurrentTab] = useState<string>('all')
	const jobStatus = useAppSelector(recruitmentStatusSelector)

	const debouncedSearch = useDebounce(search, 500)

	const onFiltersChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value.toLowerCase())
	}
	// const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
	// 	setCurrentTab(value)
	// }, [])

	useEffect(() => {
		dispatch(jobListAction({ paginationData: jobPaginateData, search: debouncedSearch }))
		if (debouncedSearch.length > 0) {
			dispatch(handleJobListSearchStatus('LOADING'))
		}

		return () => {}
	}, [debouncedSearch])

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.nav.dashboard, url: '/' },
		{ label: tokens.nav.recruitment, color: 'black' },
	]

	// const handleDepartTabs = async () => {
	// 	const { data } = await departListingRequest()
	// 	const currentTabs: TabOption<string, string>[] = data.departments.map(
	// 		({ name, uuid }: DepartmentTabs) => ({ label: name, value: uuid }),
	// 	)

	// 	currentTabs.unshift(tabInitialization)
	// 	setTabs(currentTabs)
	// }

	// useEffect(() => {
	// 	handleDepartTabs()
	// }, [])

	return (
		<>
			<Seo title={t(tokens.seo_titles.recruitment.list_job)} />

			{jobStatus === 'LOADING' ? (
				<PageLoading />
			) : (
				<Box
					component="main"
					sx={{
						flexGrow: 1,
					}}
				>
					<Container maxWidth="xl">
						<Stack spacing={3}>
							<CustomBreadcrumbs links={breadcrumbsLinks} />

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
											fontSize: '28px',
											fontWeight: 600,
											color: '#111927',

											'@media (min-width:600px)': {
												fontSize: '32px',
												fontWeight: 700,
											},
										}}
									>
										{t(dashboard.main_heading)}
									</Typography>
								</Box>

								<Box>
									<Button
										sx={{
											background: theme.palette.background.default,
											color: 'white',
											gap: 1,
										}}
										onClick={() => navigate('/recruitment/job')}
									>
										<SvgIcon
											sx={{
												margin: '0px',
												width: '25px',
											}}
										>
											<PlusIcon />
										</SvgIcon>
										<Typography
											sx={{
												display: { xs: 'none', md: 'block' },
												fontWeight: 600,
												fontSize: 14,
												lineHeight: '24px',
											}}
										>
											{t(dashboard.add_job)}
										</Typography>
									</Button>
								</Box>
							</Box>
							<JobStatusSection />

							<Card>
								<Stack spacing={2}>
									{/* <Tabs
										indicatorColor="primary"
										onChange={handleTabsChange}
										scrollButtons="auto"
										textColor="primary"
										value={currentTab}
										variant="scrollable"
										sx={{
											px: 3,
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
											/>
										))}
									</Tabs> */}
									<Stack
										alignItems="center"
										component="form"
										direction="row"
										spacing={2}
										sx={{ p: 2 }}
									>
										<SvgIcon>
											<SearchMdIcon />
										</SvgIcon>
										<Input
											value={search}
											disableUnderline
											fullWidth
											placeholder={t(dashboard.search)}
											sx={{ flexGrow: 1 }}
											onChange={onFiltersChange}
										/>
									</Stack>
									<Divider />
								</Stack>
								<JobListSection />
							</Card>
						</Stack>
					</Container>
				</Box>
			)}
		</>
	)
}

export default Dashboard
