import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { arrayToCSV } from '@blackfiredev/utils'

// mui imports
import { createTheme } from '@mui/system'
import { Box, Button, Card, CardContent, Grid, Stack } from '@mui/material'

// Internationalization
// import { useTranslation } from 'react-i18next'
// import { tokens } from '@locales/tokens'

// local imports
import {
	AdditionalInfoSection,
	JobDetailsSection,
} from '@sections/organization/recruitment/createJob'
import { DetailCard } from '@sections/organization/recruitment/detailsJobCard'
import { Job, NewJob, NewJobForm } from 'type/recruitment'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	jobSelector,
	recruitmentSelector,
	recruitmentStatusSelector,
	updateJobAction,
} from '@redux/features/recruitmentSlice'
import { updateJobRequest } from '@service/recruitment'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'
import Loading from '@components/Loading'
import { Seo } from '@components/seo'
import { JobDetailLoading } from '@loading/recruitment'
import { useState } from 'react'

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
	const dispatch = useAppDispatch()
	const job = useAppSelector(jobSelector)
	const jobStatus = useAppSelector(recruitmentStatusSelector)

	const formHook = useForm<NewJob>({
		defaultValues: {
			...job,
			job_id: job.job_id,
			hiring_managers: job?.hiring_managers?.map(({ id }) => id),
			department_id: job?.department?.uuid,
			skill_sets: job.skill_sets?.map(({ id }) => id),
			work_location_id: job?.location?.id,
			dead_line: new Date(job.dead_line),
		},
	})
	const onSubmit: SubmitHandler<NewJob> = async (values) => {
		dispatch(updateJobAction({ values: values as NewJobForm, reset: formHook.reset }))
	}

	return (
		<>
			<Seo title="Job Details" />
			{jobStatus === 'LOADING' ? (
				<JobDetailLoading />
			) : (
				<Box
					component="main"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						ml: 1,
					}}
				>
					<Grid
						container
						spacing={1}
					>
						<Grid
							xs={12}
							md={8}
							sx={{ pb: 3 }}
						>
							<FormProvider {...formHook}>
								<form onSubmit={formHook.handleSubmit(onSubmit)}>
									<Card
										sx={{
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
												alignContent: 'center',
												gap: 2,
												width: '100%',
												justifyContent: 'end',
												p: 2,
											}}
										>
											<Button
												// disabled={jobStatus === 'LOADING'}
												type="submit"
												sx={{ mt: 2, background: theme.palette.background.default, color: 'white' }}
											>
												{/* {jobStatus === 'LOADING' ? <Loading /> : 'Save Changes'} */}
												{'Save Changes'}
											</Button>
										</Box>
									</Card>
								</form>
							</FormProvider>
						</Grid>

						<Grid
							xs={12}
							md={4}
						>
							<Box>
								<DetailCard />
							</Box>
						</Grid>
					</Grid>
				</Box>
			)}
		</>
	)
}

export default JobDetail
