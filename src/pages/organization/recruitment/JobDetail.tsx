import type { ChangeEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

// mui imports
import {
	Box,
	Container,
	Divider,
	Stack,
	Tab,
	Tabs,
	Typography,
	Breadcrumbs,
	Button,
	createTheme,
	SvgIcon,
	useMediaQuery,
	Tooltip,
} from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'

import { Seo } from '@components/seo'
import { JobDetailTab, CandidateListingTab, MagicAssessmentsTab, TimelineTab } from './tabs'
import {
	candidateSelector,
	getJobAction,
	recruitmentSelector,
} from '@redux/features/recruitmentSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import CustomTabPanel from '@components/CustomTabPanel'
import { JobDetailTabs } from 'type/recruitment'
import { a11yProps } from '@utils/index'
import {
	departmentListAction,
	pipelineStagesListAction,
	skillSetListAction,
	workLocationListAction,
} from '@redux/features/settingsSlice'
import { employeeListAction } from '@redux/features/employeeSlice'
import {
	kanbanActions,
	kanbanCacheSelector,
	kanbanSelector,
	prepareBoardAction,
} from '@redux/features/kanbanSlice'
import { dragDropCandidateRequest } from '@service/recruitment'
import { SHOW_ERROR } from '@utils/ToastMessage'
import { employmentType } from '@config/index'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { RecruitmentPageLoading } from '@loading/recruitment'

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

const jobDetailA11yProps = a11yProps('jobDetail')

const tabs: JobDetailTabs[] = [
	{ label: tokens.recruitment.job_detail.tabs.candidates, value: 0 },
	{ label: tokens.recruitment.job_detail.tabs.job_details, value: 1 },
	// { label: tokens.recruitment.job_detail.tabs.magicAssessment, value: 2 },
	// { label: tokens.recruitment.job_detail.tabs.timeline, value: 3 },
]

const JobDetail = () => {
	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.nav.dashboard, url: '/' },
		{ label: tokens.nav.recruitment, url: '/recruitment' },
		{ label: tokens.recruitment.job_detail.tabs.candidates, color: 'black' },
	]
	const { t } = useTranslation()
	const { nav, recruitment } = tokens
	const { job_detail } = recruitment

	const { uuid } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { job, jobStatus: status } = useAppSelector(recruitmentSelector)

	const candidateList = useAppSelector(candidateSelector)
	const cache = useAppSelector(kanbanCacheSelector)

	const [currentTab, setCurrentTab] = useState<JobDetailTabs>({
		label: tokens.recruitment.job_detail.tabs.candidates,
		value: 0,
	})

	// @ts-ignore
	const handleTabsChange = (event: React.SyntheticEvent, value: number) => {
		const cTab = tabs.find((tab) => tab.value === value) || {
			label: tokens.recruitment.job_detail.tabs.candidates,
			value: 0,
		}
		setCurrentTab(cTab)
	}
	const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'))

	useEffect(() => {
		if (uuid) {
			Promise.all([
				dispatch(departmentListAction()),
				dispatch(employeeListAction()),
				dispatch(skillSetListAction()),
				dispatch(workLocationListAction()),
				dispatch(pipelineStagesListAction()),
			])
		}
	}, [uuid])

	useEffect(() => {
		if (uuid)
			dispatch(getJobAction(uuid)).then(({ payload }) => {
				const { code, success, data }: any = payload
				if (code === 200 && success) {
					const [candidate, job] = data
					dispatch(prepareBoardAction(candidate))
				}
			})
	}, [uuid])

	useEffect(() => {
		if (cache) {
			dragDropCandidateRequest(cache)
				.then(() => {
					console.info('SUCCESSFUL_MOVE')
				})
				.catch((error) => {
					SHOW_ERROR({})
					console.error('DnD : ', error)
					dispatch(kanbanActions.revertLastMove()) // Dispatch function to revert changes
				})
		}

		return () => {
			// dispatch(kanbanActions.resetBoard()) DO not uncomment this line
		}
	}, [cache])

	return (
		<>
			<Seo title={t(tokens.seo_titles.recruitment.detail_job)} />
			{status === 'LOADING' ? (
				<RecruitmentPageLoading />
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
								<Stack spacing={1}>
									<Tooltip title={job.title}>
										<Typography
											sx={{
												// fontSize: { xs: '18px', sm: '24px' },
												fontSize: { xs: 18, sm: 24 },
												fontWeight: 700,
												color: '#111927',
												textWrap: 'nowrap',
												overflow: 'hidden',
												maxWidth: {
													xs: '260px',
													md: '400px',
												},
												textOverflow: 'ellipsis',
											}}
										>
											{job.title}
										</Typography>
									</Tooltip>

									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<Tooltip title={job.location?.name ? `${job.location?.name}` : ''}>
											<Typography
												sx={{
													color: '#6C737F',
													fontWeight: 500,
													fontSize: 14,
													textWrap: 'nowrap',
													overflow: 'hidden',
													maxWidth: '230px',
													textOverflow: 'ellipsis',
												}}
											>
												{job.location?.name ? `${job.location?.name}` : ''}
											</Typography>
										</Tooltip>

										<img
											src="/dot.svg"
											alt=""
										/>

										<Tooltip
											title={
												employmentType.find((type) => type.value === job?.employment_type)?.label
											}
										>
											<Typography
												sx={{
													color: '#6C737F',
													fontWeight: 500,
													fontSize: 14,
													textWrap: 'nowrap',
													overflow: 'hidden',
													maxWidth: '230px',
													textOverflow: 'ellipsis',
												}}
											>
												{employmentType.find((type) => type.value === job?.employment_type)?.label}
											</Typography>
										</Tooltip>
									</Box>
								</Stack>

								<Box>
									<Button
										sx={{
											background: theme.palette.background.default,
											color: 'white',
											gap: 1,
										}}
										onClick={() => navigate(`/recruitment/${uuid}/candidate`)}
									>
										<SvgIcon
											sx={{
												margin: '0px',
												width: '24px',
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
											{t(job_detail.add_candidate)}
										</Typography>
									</Button>
								</Box>
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
											{...jobDetailA11yProps(tab.value)}
										/>
									))}
								</Tabs>

								<Divider />
							</Box>

							<CustomTabPanel
								value={currentTab.value}
								index={0}
							>
								<CandidateListingTab candidateList={candidateList} />
							</CustomTabPanel>

							<CustomTabPanel
								value={currentTab.value}
								index={1}
							>
								<JobDetailTab />
							</CustomTabPanel>
						</Stack>
					</Container>
				</Box>
			)}
		</>
	)
}

export default JobDetail
