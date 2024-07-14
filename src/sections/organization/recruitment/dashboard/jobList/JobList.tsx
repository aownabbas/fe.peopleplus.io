import { Fragment, useCallback, useState } from 'react'
import type { FC } from 'react'

// mui imports
import {
	Avatar,
	AvatarGroup,
	Box,
	IconButton,
	SvgIcon,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight'
import ArrowIcon from '@untitled-ui/icons-react/build/esm/ArrowNarrowRight'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { Scrollbar } from '@components/scrollbar'
import { SeverityPill } from '@components/severity-pill'
import {
	handleJobListPagination,
	jobListAction,
	jobSearchStatusSelector,
	recruitmentSelector,
} from '@redux/features/recruitmentSlice'
import { HiringManager, RecruitmentState } from 'type/recruitment'
import { table } from '@config/index'
import HelperRow from './HelperRow'

import { formatTime } from '@utils/times'
import { useNavigate } from 'react-router-dom'
import NoRecordFound from '@components/NoRecordFound'
import Loading from '@components/Loading'
import { createTheme } from '@mui/system'
import { TableSkeleton } from '@components/Skeletons'

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

const JobList: FC = () => {
	const { t } = useTranslation()
	const { dashboard } = tokens.recruitment
	const { by } = tokens.common

	const [isOpen, setIsOpen] = useState<number>(0)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const {
		jobList,
		jobPaginateData,
		jobState,
		status: jobListStatus,
	}: RecruitmentState = useAppSelector(recruitmentSelector)
	const jobSearchStatus = useAppSelector(jobSearchStatusSelector)

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(event.target.value, 10)
		dispatch(handleJobListPagination({ key: 'per_page', value: newValue }))
		dispatch(
			jobListAction({
				paginationData: { ...jobPaginateData, per_page: newValue },
			}),
		)
	}

	// @ts-ignore
	const handleChangePage = (event: unknown, newPage: number) => {
		dispatch(handleJobListPagination({ key: 'page', value: newPage }))
		dispatch(jobListAction({ paginationData: { ...jobPaginateData, page: newPage } }))
	}

	const handleToggle = useCallback((productId: number): void => {
		setIsOpen((prevProductId) => {
			if (prevProductId === productId) {
				return 0
			}
			return productId
		})
	}, [])

	return (
		<div>
			<Scrollbar>
				<Table sx={{ minWidth: 1200 }}>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell width="15%">{t(dashboard.job_list_heading.name)}</TableCell>
							<TableCell width="20%">{t(dashboard.job_list_heading.pipeline)}</TableCell>
							<TableCell width="20%">{t(dashboard.job_list_heading.posted)}</TableCell>
							<TableCell>{t(dashboard.job_list_heading.hiring)}</TableCell>
							<TableCell>{t(dashboard.job_list_heading.status)}</TableCell>
							<TableCell align="right">{t(dashboard.job_list_heading.actions)}</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{jobSearchStatus === 'LOADING' ? (
							<TableSkeleton
								columns={7}
								rows={10}
								avatarColumn={4}
							/>
						) : jobList.length === 0 &&
						  jobListStatus === 'SUCCESS' &&
						  jobSearchStatus === 'SUCCESS' ? (
							<TableRow>
								<TableCell colSpan={7}>
									<NoRecordFound />
								</TableCell>
							</TableRow>
						) : (
							<>
								{jobList?.map((job) => {
									return (
										<Fragment key={job.id}>
											<TableRow
												hover
												key={job.id}
											>
												<TableCell
													padding="checkbox"
													sx={{
														...(job.id === isOpen && {
															position: 'relative',
															'&:after': {
																position: 'absolute',
																content: '" "',
																top: 0,
																left: 0,
																background: theme.palette.background.default,
																width: 3,
																height: 'calc(100% + 1px)',
															},
														}),
													}}
													width="25%"
												>
													<IconButton
														disabled={job.candidatesCount === 0}
														onClick={() => handleToggle(job.id)}
													>
														<SvgIcon>
															{job.id === isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
														</SvgIcon>
													</IconButton>
												</TableCell>
												<TableCell width="15%">
													<Box
														sx={{
															cursor: 'pointer',
														}}
													>
														<Tooltip title={job.title}>
															<Typography
																onClick={() => navigate(`/recruitment/job/${job.uuid}`)}
																sx={{
																	color: '#111927',
																	fontWeight: 500,
																	fontSize: 14,
																	lineHeight: '22px',
																	textWrap: 'nowrap',
																	overflow: 'hidden',
																	maxWidth: '260px',
																	textOverflow: 'ellipsis',
																}}
															>
																{job.title}
															</Typography>
														</Tooltip>
														<Typography
															color="text.secondary"
															sx={{
																color: '#6C737F',
																fontWeight: 400,
																fontSize: 14,
																lineHeight: '22px',
															}}
														>
															{typeof job.candidatesCount === 'number' && job.candidatesCount > 999
																? '999+ Applicants'
																: `${job.candidatesCount} Applicant${job.candidatesCount === 1 ? '' : 's'}`}
														</Typography>
													</Box>
												</TableCell>
												<TableCell width="20%">
													<Box
													// sx={{
													//   cursor: 'pointer',
													// }}
													>
														<Tooltip title={job.department?.name}>
															<Typography
																sx={{
																	color: '#111927',
																	fontWeight: 500,
																	fontSize: 14,
																	lineHeight: '22px',
																	textWrap: 'nowrap',
																	overflow: 'hidden',
																	maxWidth: '240px',
																	textOverflow: 'ellipsis',
																}}
															>
																{job.department?.name}
															</Typography>
														</Tooltip>

														<Tooltip title={job.organization?.name}>
															<Typography
																onClick={() => navigate(`/recruitment/job/${job.uuid}`)}
																sx={{
																	color: '#6C737F',
																	fontWeight: 400,
																	fontSize: 14,
																	lineHeight: '22px',
																	textWrap: 'nowrap',
																	overflow: 'hidden',
																	maxWidth: '240px',
																	textOverflow: 'ellipsis',
																}}
															>
																{t(by)} {job.organization?.name}
															</Typography>
														</Tooltip>
													</Box>
												</TableCell>
												<TableCell>
													<Typography
														sx={{
															color: '#111927',
															fontWeight: 500,
															fontSize: 14,
															lineHeight: '22px',
														}}
													>
														{formatTime(job.created_at, 'MMM dd yyyy')}
													</Typography>

													<Tooltip title={job.organization?.name}>
														<Typography
															onClick={() => navigate(`/recruitment/job/${job.uuid}`)}
															sx={{
																color: '#6C737F',
																fontWeight: 400,
																fontSize: 14,
																lineHeight: '22px',
																textWrap: 'nowrap',
																overflow: 'hidden',
																maxWidth: '170px',
																textOverflow: 'ellipsis',
															}}
														>
															{t(by)} {job.organization?.name}
														</Typography>
													</Tooltip>
												</TableCell>
												<TableCell>
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
														}}
													>
														<AvatarGroup max={5}>
															{job?.hiring_managers?.map(
																({ id, photo, first_name, last_name }: HiringManager) => (
																	<Avatar
																		key={id}
																		alt={`${first_name} ${last_name}`}
																		src={photo}
																	/>
																),
															)}
														</AvatarGroup>
													</Box>
												</TableCell>
												<TableCell>
													<SeverityPill
														color={job.status.toLowerCase() === 'open' ? 'success' : 'error'}
													>
														{job.status.charAt(0).toUpperCase() + job.status.slice(1).toLowerCase()}
													</SeverityPill>
												</TableCell>
												<TableCell
													sx={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
														justifyContent: 'end',
													}}
												>
													<IconButton onClick={() => navigate(`/recruitment/job/${job.uuid}`)}>
														<ArrowIcon />
													</IconButton>
												</TableCell>
											</TableRow>
											{job.id === isOpen && <HelperRow stages={job.candidate_stages_count} />}
										</Fragment>
									)
								})}
							</>
						)}
					</TableBody>
				</Table>
			</Scrollbar>
			<TablePagination
				component="div"
				count={jobState.total}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				page={jobPaginateData.page}
				rowsPerPage={jobPaginateData.per_page}
				rowsPerPageOptions={table.rowsPerPageOptions}
			/>
		</div>
	)
}

export default JobList
