import type { ChangeEvent } from 'react'
import { useEffect } from 'react'
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
	SvgIcon,
	Tooltip,
} from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { Seo } from '@components/seo'
import {
	candidateSelector,
	getJobAction,
	recruitmentSelector,
} from '@redux/features/recruitmentSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

import { pipelineStagesListAction } from '@redux/features/settingsSlice'
import CandidateListing from './CandidateListing'
import { kanbanActions, kanbanCacheSelector, prepareBoardAction } from '@redux/features/kanbanSlice'
import { dragDropCandidateRequest } from '@service/recruitment'
import { SHOW_ERROR } from '@utils/ToastMessage'
import { employmentType } from '@config/index'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { createTheme } from '@mui/system'
import { RecruitmentPageLoading } from '@loading/recruitment'

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

const JobDetail = () => {
	const { t } = useTranslation()
	const { nav, recruitment } = tokens
	const { job_detail } = recruitment
	const { uuid } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { job, jobStatus: status } = useAppSelector(recruitmentSelector)
	const candidateList = useAppSelector(candidateSelector)
	const cache = useAppSelector(kanbanCacheSelector)
	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.nav.dashboard, url: '/' }, // Set color for this link
		{ label: tokens.nav.recruitment, url: '/recruitment' }, // Concatenate first_name and last_name
		{ label: tokens.recruitment.job_detail.tabs.candidates, color: 'black' },
	]

	useEffect(() => {
		if (uuid) {
			Promise.all([
				// dispatch(departmentListAction()),
				// dispatch(skillSetListAction()),
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

	if (status === 'LOADING') {
		return <RecruitmentPageLoading />
	}

	return (
		<>
			<Seo title={t(tokens.seo_titles.recruitment.detail_job)} />

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
											fontSize: { xs: '18px', sm: '24px' },
											fontweight: 700,
											color: '#111927',
											textWrap: 'nowrap',
											overflow: 'hidden',
											maxWidth: '260px',
											textOverflow: 'ellipsis',
										}}
									>
										{job.title}
									</Typography>
								</Tooltip>
								{/* <Typography
									sx={{
										fontWeight: 400,
										fontSize: 14,
										color: 'gray',
									}}
								>
									{job.location?.name ? `${job.location?.name} . ` : ''}
									{employmentType.find((type) => type.value === job?.employment_type)?.label}
								</Typography> */}
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
						</Box>
						<CandidateListing candidateList={candidateList} />
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default JobDetail
