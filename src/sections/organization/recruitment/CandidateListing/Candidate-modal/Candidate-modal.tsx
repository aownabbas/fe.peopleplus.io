import { useEffect, useState } from 'react'
import type { ChangeEvent, FC } from 'react'

// mui imports
import {
	Box,
	Button,
	Divider,
	Drawer,
	Stack,
	Tab,
	Tabs,
	Typography,
	useTheme,
	IconButton,
	Tooltip,
	Avatar,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import Grid from '@mui/material/Unstable_Grid2'
import TimelineDot from '@mui/lab/TimelineDot'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import type { CandidateState, Column, ColumnState } from 'type/kanban'
import type { Candidate, CandidateTabs, Note } from 'type/recruitment'
import { CandidateNote } from './Candidate-comment'
import { CandidateNoteAdd } from './Candidate-comment-add'
import { useAppSelector, useAppDispatch } from '@redux/hooks.ts'
import { columnsSelector, candidateSelector } from '@redux/features/kanbanSlice'
import {
	activityListSelector,
	candidateActivityListAction,
	candidateNoteListAction,
	jobSelector,
	noteListSelector,
} from '@redux/features/recruitmentSlice'

import PipelineStageDropdown from './PipelineStageDropdown'
import { formatTime } from '@utils/times'
import CustomTabPanel from '@components/CustomTabPanel'
import { a11yProps } from '@utils/index'
import { createTheme } from '@mui/system'
import { Scrollbar } from '@components/scrollbar'
import RecordNotFound from '@components/RecordNotFound'
import pdfToText from 'react-pdftotext'
import { gptPrompt } from '@utils/gptPrompt'
import { candidateGptAssessment, getCandidateDetailRequest } from '@service/recruitment'
import axios from 'axios'
import Loading from '@components/Loading'
import { gptConfig } from '@config/index'
import { SHOW_ERROR } from '@utils/ToastMessage'
import { handleError } from '@utils/handleError'
import { candidateResumeAssessmentPrompt } from '@utils/gptPrompt'
import {
	fetchResumeFile,
	convertPdfToText,
	gptAssessment,
	saveAssessment,
} from '@utils/gptAssessment'

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

const useCandidate = (candidateId?: string): Candidate | null => {
	const data: CandidateState = useAppSelector(candidateSelector)
	const { byId } = data
	if (!candidateId) {
		return null
	}
	return byId[candidateId] || null
}

const useColumn = (columnId?: string): Column | null => {
	const columns: ColumnState = useAppSelector(columnsSelector)
	if (!columnId) {
		return null
	}
	return columns.byId[columnId] || null
}

interface CandidateModalProps {
	onClose?: () => void
	open?: boolean
	candidateId?: string
}

const candidateA11yProps = a11yProps('candidate')

const tabs: CandidateTabs[] = [
	// { label: tokens.recruitment.job_detail.candidate.tabs.summary, value: 0 },
	{ label: tokens.recruitment.job_detail.candidate.tabs.resume, value: 0 },
	{ label: tokens.recruitment.job_detail.candidate.tabs.notes, value: 1 },
	{ label: tokens.recruitment.job_detail.candidate.tabs.activity, value: 2 },
]

export const CandidateModal: FC<CandidateModalProps> = (props) => {
	const { candidateId, onClose, open = false, ...other } = props
	const dispatch = useAppDispatch()
	const Candidate = useCandidate(candidateId)
	const column = useColumn(Candidate?.columnId)
	const notList = useAppSelector(noteListSelector)
	const activityList = useAppSelector(activityListSelector)
	const job = useAppSelector(jobSelector)

	const { t } = useTranslation()
	const { job_detail } = tokens.recruitment
	const [tooltipTitle, setTooltipTitle] = useState({ text: 'Click to copy', type: '' })
	const [buttonLoading, setButtonLoading] = useState(false)
	const [loading, setLoading] = useState(true) // Add loading state
	const [resumeHtmlContent, setResumeHtmlContent] = useState<string | null>(null)

	const handleClickToCopy = async (text: string, type: 'email' | 'phone') => {
		try {
			await navigator.clipboard.writeText(text)
			setTooltipTitle({ text: 'Copied to clipboard', type })
			setTimeout(() => setTooltipTitle({ text: 'Click to copy', type: '' }), 2000)
		} catch (error) {
			console.error('Failed to copy text: ', error)
		}
	}

	const fetchCandidateDetails = async (uuid: string) => {
		try {
			setResumeHtmlContent(null)
			const response = await getCandidateDetailRequest(uuid)
			if (response.data) {
				setResumeHtmlContent(response.data.candidate.resume_html_content)
				setLoading(false)
			}
		} catch (error) {
			console.error('Failed to fetch candidate details:', error)
		}
	}

	useEffect(() => {
		if (Candidate) {
			setLoading(true)
			fetchCandidateDetails(Candidate?.uuid)
		}
	}, [candidateId])

	const [currentTab, setCurrentTab] = useState<CandidateTabs>({
		label: tokens.recruitment.job_detail.candidate.tabs.resume,
		value: 0,
	})

	// @ts-ignore
	const handleTabsChange = (event: React.SyntheticEvent, value: number) => {
		const cTab = tabs.find((tab) => tab.value === value) || {
			label: tokens.recruitment.job_detail.candidate.tabs.resume,
			value: 0,
		}
		setCurrentTab(cTab)
	}

	// const fetchResumeFile = async (resumePath: string): Promise<Blob | null> => {
	// 	try {
	// 		const response = await axios.get(resumePath, { responseType: 'blob' });
	// 		return response.data;
	// 	} catch (error) {
	// 		handleError(error, 'Error fetching the resume file');
	// 		return null;
	// 	}
	// };

	const magicAssessment = async () => {
		try {
			if (!Candidate || !Candidate.uuid || !Candidate.resume_path) {
				console.error('Invalid Candidate data:', Candidate)
				return
			}

			setButtonLoading(true)

			const file = await fetchResumeFile(Candidate.resume_path)
			if (!file) {
				setButtonLoading(false)
				return
			}

			const text = await convertPdfToText(file)
			if (!text) {
				setButtonLoading(false)
				return
			}

			const analysis = await gptAssessment(
				candidateResumeAssessmentPrompt(text, job.title, job.description),
			)
			if (!analysis) {
				setButtonLoading(false)
				return
			}

			const resumeHtmlContent = await saveAssessment(
				Candidate.uuid,
				analysis,
				candidateGptAssessment,
			)
			setResumeHtmlContent(resumeHtmlContent)
			setButtonLoading(false)
		} catch (error) {
			handleError(error, 'Unexpected error')
			setButtonLoading(false)
		}
	}

	// Reset tab on Candidate change
	useEffect(() => {
		setCurrentTab({
			label: tokens.recruitment.job_detail.candidate.tabs.resume,
			value: 0,
		})
	}, [candidateId])

	useEffect(() => {
		if (Candidate) {
			Promise.all([
				dispatch(candidateActivityListAction(Candidate.uuid)),
				dispatch(candidateNoteListAction(Candidate.uuid)),
			])
		}
		return () => {}
	}, [candidateId])

	const content =
		Candidate && column ? (
			<Stack
				spacing={2}
				sx={{
					p: 4,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
						alignItems: 'start',
					}}
				>
					<Box>
						<PipelineStageDropdown
							candidate={Candidate}
							onClose={onClose}
							sx={{ minWidth: '200px' }}
						/>
					</Box>
					<Box sx={{ alignSelf: 'self-start', display: 'flex' }}>
						<IconButton
							sx={{ p: 0 }}
							aria-label="close candidate"
							onClick={onClose}
						>
							<ClearIcon />
						</IconButton>
					</Box>
				</Box>

				{/* <Stack
					spacing={2}
					direction={{ sm: 'row' }}
					sx={{
						justifyContent: 'space-between',
						gap: 2.5,
						'@media (min-width: 768px)': {
							gap: 0,
						},
					}}
				> */}
				<Stack
					sx={{
						width: 240,
					}}
				>
					<Tooltip title={`${Candidate?.first_name} ${Candidate?.last_name}` || ''}>
						<Typography
							sx={{
								color: '#111927',
								fontWeight: 600,
								fontSize: 16,
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: '230px',
								textOverflow: 'ellipsis',
								py: 1,
							}}
						>
							{`${Candidate?.first_name} ${Candidate?.last_name}` || ''}
						</Typography>
					</Tooltip>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Tooltip title={tooltipTitle.type === 'email' ? tooltipTitle.text : 'Click to copy'}>
							<Box
								onClick={() => handleClickToCopy(Candidate.email, 'email')}
								sx={{ cursor: 'pointer' }}
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
									{Candidate.email}
								</Typography>
							</Box>
						</Tooltip>

						<img
							src="/dot.svg"
							alt=""
						/>

						<Tooltip title={tooltipTitle.type === 'phone' ? tooltipTitle.text : 'Click to copy'}>
							<Box
								onClick={() => handleClickToCopy(Candidate.phone, 'phone')}
								sx={{ cursor: 'pointer' }}
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
									{Candidate.phone}
								</Typography>
							</Box>
						</Tooltip>
					</Box>
				</Stack>
				{/* </Stack> */}

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
							{...candidateA11yProps(tab.value)}
						/>
					))}
				</Tabs>
				<Divider />
				<Box sx={{ height: '400px', width: '100%' }}>
					<CustomTabPanel
						value={currentTab.value}
						index={0}
						style={{ height: '100%' }}
					>
						<iframe
							height="100%"
							width="100%"
							style={{
								border: 'none',
								borderRadius: '15px',
							}}
							src={Candidate.resume_path}
						/>

						{loading ? null : (
							<>
								<Box>
									<Box sx={{ mt: 2, width: '100%', justifyContent: 'end', display: 'flex' }}>
										{!resumeHtmlContent && (
											<Button
												disabled={buttonLoading}
												variant="gradient"
												onClick={() => magicAssessment()}
											>
												<Typography
													sx={{
														display: { xs: 'none', md: 'block' },
														fontWeight: 600,
														fontSize: 14,
														lineHeight: '24px',
													}}
												>
													Magic Assessment
												</Typography>

												{buttonLoading && (
													<Loading
														size={20}
														showMessage={false}
													/>
												)}
											</Button>
										)}
									</Box>

									<Box>
										{resumeHtmlContent && (
											<Typography
												sx={{
													width: '100%',
													'& img': {
														maxWidth: '100%',
														height: 'auto',
													},
													fontSize: 16,
													fontWeight: 400,
													color: '#6C737F',
												}}
												variant="body1"
												dangerouslySetInnerHTML={{
													__html: resumeHtmlContent.replace(/```html/g, '').replace(/```/g, ''),
												}}
											/>
										)}
									</Box>
								</Box>
							</>
						)}
					</CustomTabPanel>
					<CustomTabPanel
						value={currentTab.value}
						index={1}
					>
						<Stack spacing={2}>
							<Scrollbar
								sx={{
									height: 370,
								}}
							>
								<Box
									sx={{
										height: 360,
									}}
								>
									{notList && notList.length > 0 ? (
										notList.map((note: Note) => (
											<CandidateNote
												key={note.id}
												note={note}
											/>
										))
									) : (
										<RecordNotFound />
									)}
								</Box>
							</Scrollbar>

							<CandidateNoteAdd candidateId={Candidate.id} />
						</Stack>
					</CustomTabPanel>
					<CustomTabPanel
						value={currentTab.value}
						index={2}
					>
						<Grid
							container
							spacing={3}
						>
							{activityList.length === 0 ? (
								<Box
									sx={{
										width: '100%',
										mt: 5,
										'@media (min-width: 768px)': {
											mt: 15,
										},
									}}
								>
									<RecordNotFound />
								</Box>
							) : (
								<Stack
									spacing={2}
									sx={{
										width: '100%',
										m: 1,
										p: '16px',
										border: '1px solid #A6A6A6',
										borderRadius: 2,
									}}
								>
									<Typography variant="h6">
										{t(job_detail.candidate.activity.man_heading)}
									</Typography>
									<Scrollbar
										sx={{
											height: 370,
										}}
									>
										<Box sx={{ height: 360 }}>
											{activityList.map((activity, index) => (
												<Box
													key={activity.id}
													sx={{ display: 'flex', gap: 2 }}
												>
													<TimelineSeparator>
														<TimelineDot
															sx={{
																border: 0,
																p: 0,
															}}
														>
															<Box sx={{ width: 40, height: 40 }}>
																<img
																	style={{
																		width: '100%',
																		height: '100%',
																		objectFit: 'cover',
																		borderRadius: '100%',
																	}}
																	src={
																		activity?.activity_by?.company_logo ||
																		activity?.activity_by?.photo
																	}
																/>
															</Box>
														</TimelineDot>
														{index !== activityList.length - 1 && (
															<TimelineConnector sx={{ minHeight: 30 }} />
														)}
													</TimelineSeparator>

													<Box sx={{ mt: 1 }}>
														<Box
															sx={{
																display: 'flex',
																flexDirection: ['column', null, 'row'],
																alignItems: ['flex-start', 'center'],
															}}
														>
															<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
																<Tooltip
																	title={`${activity?.activity_by?.first_name} ${activity?.activity_by?.last_name}`}
																>
																	<Typography
																		sx={{
																			color: '#111927',
																			fontWeight: 600,
																			fontSize: 14,
																			whiteSpace: 'nowrap', // Use whiteSpace instead of textWrap for compatibility
																			overflow: 'hidden',
																			maxWidth: {
																				xs: '135px', // For extra-small screens and up
																				sm: '200px', // For small screens and up
																			},
																			textOverflow: 'ellipsis',
																		}}
																	>
																		{`${activity?.activity_by?.first_name} ${activity?.activity_by?.last_name}`}
																	</Typography>
																</Tooltip>
																<Typography sx={{ fontSize: 12, fontWeight: 400, color: 'gray' }}>
																	{formatTime(activity.updated_at)}
																</Typography>
															</Box>
														</Box>
														<Box
															sx={{
																display: 'flex',
																flexDirection: ['column', null, 'row'],
																alignItems: ['flex-start', 'center'],
															}}
														>
															<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
																<Typography sx={{ fontSize: 12, fontWeight: 400, color: 'gray' }}>
																	{t(job_detail.candidate.activity.helperText)}
																</Typography>
																<Tooltip title={activity?.activity_type}>
																	<Typography
																		sx={{
																			color: '#111927',
																			fontWeight: 600,
																			fontSize: 14,
																			whiteSpace: 'nowrap', // Use whiteSpace instead of textWrap for compatibility
																			overflow: 'hidden',
																			maxWidth: {
																				xs: '130px', // For extra-small screens and up
																				sm: '200px', // For small screens and up
																			},
																			textOverflow: 'ellipsis',
																		}}
																	>
																		{activity?.activity_type}
																	</Typography>
																</Tooltip>
															</Box>
														</Box>
													</Box>
												</Box>
											))}
										</Box>
									</Scrollbar>
								</Stack>
							)}
						</Grid>
					</CustomTabPanel>
				</Box>
			</Stack>
		) : null
	return (
		<Drawer
			anchor="right"
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					width: '100%',
					maxWidth: 600,
				},
			}}
			{...other}
		>
			{content}
		</Drawer>
	)
}
