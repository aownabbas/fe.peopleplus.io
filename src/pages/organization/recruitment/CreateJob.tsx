import { useEffect, useLayoutEffect, useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { generateRandomIntegerInRange } from '@blackfiredev/utils'

// mui imports
import {
	createTheme,
	Button,
	Stack,
	Card,
	CardContent,
	Link as MUILink,
	Typography,
	Box,
	Container,
	Breadcrumbs,
	Grid,
} from '@mui/material'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import type { AddJobTabs, NewJob, NewJobForm } from 'type/recruitment'
import {
	departmentListAction,
	skillSetListAction,
	workLocationListAction,
} from '@redux/features/settingsSlice'
import {
	AdditionalInfoSection,
	JobDetailsSection,
} from '@sections/organization/recruitment/createJob'
import { authUserSelector } from '@redux/features/authSlice'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'
import { createJobAction, recruitmentSelector, jobSelector } from '@redux/features/recruitmentSlice'
import { employeeListAction } from '@redux/features/employeeSlice'
import { myTimeZone } from '@utils/index'
import Loading from '@components/Loading'
import { getJobIDRequest } from '@service/recruitment'
import { Seo } from '@components/seo'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { t } from 'i18next'

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

interface Detail {
	managerId: string
	avatar: string
	job: string
	name: string
}

const CreateJob = () => {
	const dispatch = useAppDispatch()
	const job = useAppSelector(jobSelector)
	const { status } = useAppSelector(recruitmentSelector)
	const navigate = useNavigate()
	const [jobID, setJobID] = useState<string>('')

	const formHook = useForm<NewJobForm>({
		defaultValues: {
			title: '',
			short_description: '',
			job_id: jobID,
			employment_type: 'full-time',
			salary_range: '',
			currency: '',
			dead_line: new Date(),
			experience_level: 'entry_level',
			travel_requirement: 'None',
			time_zone: myTimeZone(),
			application_email: '',
		},
	})
	const onSubmit: SubmitHandler<NewJobForm> = async (values) => {
		// console.log('CreateJob : ', values)
		try {
			const { code, data, success } = await dispatch(
				createJobAction({ values, reset: formHook.reset }),
			).unwrap()

			if (code === 200 && success) {
				navigate(`/recruitment/job/${data.uuid}`)
			}
		} catch (error) {
			console.error('ERROR : CreateJob ', error)
		}
	}

	const generateID = async () => {
		try {
			const { data } = await getJobIDRequest()
			if (data.job_id) {
				setJobID(data.job_id)
				formHook.setValue('job_id', data.job_id)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useLayoutEffect(() => {
		generateID()
		return () => {}
	}, [])

	useEffect(() => {
		Promise.all([
			dispatch(departmentListAction()),
			dispatch(employeeListAction()),
			dispatch(skillSetListAction()),
			dispatch(workLocationListAction()),
		])
	}, [])

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.nav.dashboard, url: '/' },
		{ label: tokens.nav.recruitment, url: '/recruitment' },
		{ label: tokens.recruitment.job_detail.tabs.add_new, color: 'black' },
	]

	return (
		<>
			<Seo title={t(tokens.seo_titles.recruitment.create_job)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<CustomBreadcrumbs links={breadcrumbsLinks} />

						{/* <Breadcrumbs
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
								color="text.primary"
								variant="subtitle2"
							>
								<Link
									to={'/recruitment'}
									style={{
										textDecoration: 'none',
										background: theme.palette.background.default,
										color: 'transparent',
										WebkitBackgroundClip: 'text',
										fontWeight: 500,
										fontSize: 14,
									}}
								>
									Recruitment
								</Link>
							</Typography>
							<Typography
								sx={{
									color: '#6C737F',
									fontWeight: '500',
									fontSize: '14px',
								}}
							>
								Add Job
							</Typography>
						</Breadcrumbs> */}

						<Typography
							sx={{
								fontSize: '24px',
								fontWeight: 600,
								color: '#111927',

								'@media (min-width:600px)': {
									fontSize: '32px',
									fontWeight: 700,
									pt: 1,
								},
							}}
						>
							{t(tokens.recruitment.add_job.post)}
						</Typography>
						<Grid container>
							<Grid
								xs={12}
								md={12}
								sx={{ pb: 3 }}
							>
								<FormProvider {...formHook}>
									<form onSubmit={formHook.handleSubmit(onSubmit)}>
										<Card
											sx={{
												boxShadow: 'none !important',
												border: '1px solid #EAECF0',
												padding: '5px',
												'@media (min-width: 600px)': {
													padding: '20px',
												},
											}}
										>
											<Stack spacing={3}>
												<JobDetailsSection />
												<AdditionalInfoSection />
											</Stack>

											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													gap: 2,
													width: '100%',
													justifyContent: 'end',
												}}
											>
												{status === 'LOADING' ? (
													<Loading />
												) : (
													<>
														<Button
															type="button"
															color="inherit"
															onClick={() => {
																formHook.reset()
																navigate(-1)
															}}
														>
															{t(tokens.recruitment.add_job.buttons.cancel)}
														</Button>

														<Button
															type="submit"
															sx={{ background: theme.palette.background.default, color: 'white' }}
														>
															{t(tokens.recruitment.add_job.buttons.publish)}
														</Button>
													</>
												)}
											</Box>
										</Card>
									</form>
								</FormProvider>
							</Grid>

							{/* <Grid
								xs={12}
								md={4}
							> */}
							{/* <Box>
									<Card
										sx={{
											'@media (min-width: 768px)': {
												ml: 2,
											},
										}}
									>
										<CardContent>
											<Stack
												spacing={1}
												sx={{
													pb: 3,
												}}
											>
												<Typography
													sx={{
														background: theme.palette.background.default,
														color: 'transparent',
														WebkitBackgroundClip: 'text',
														display: 'flex',
														alignItems: 'center',
														fontSize: 13,
														fontWeight: 500,
														lineHeight: '20px',
													}}
												>
													{job.job_id}
												</Typography>
												<Typography
													sx={{
														color: 'black',
														fontSize: 14,
														fontWeight: 500,
													}}
												>
													{job?.title}
												</Typography>
												<Box>
													<Typography
														sx={{
															color: '#475467',
															fontSize: '14px',
															fontWeight: 400,
														}}
													>
														{job?.location?.name}
													</Typography>
													<Typography
														sx={{
															color: '#475467',
															fontSize: '14px',
															fontWeight: 400,
														}}
													>
														{
															employmentType.find((type) => type.value === job?.employment_type)
																?.label
														}
													</Typography>
													<Typography
														sx={{
															color: '#475467',
															fontSize: '14px',
															fontWeight: 400,
														}}
													>
														{job?.application_email}
													</Typography>
												</Box>
											</Stack>
										</CardContent>
									</Card>
								</Box> */}
							{/* </Grid> */}
						</Grid>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default CreateJob
