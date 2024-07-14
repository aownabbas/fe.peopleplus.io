import React, { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Candidate, NewCandidate, NewCandidateSchema } from 'type/recruitment'
import { useAppSelector } from '@redux/hooks'
import { authUserSelector } from '@redux/features/authSlice'
import { recruitmentSelector } from '@redux/features/recruitmentSlice'
import { settingsSelector } from '@redux/features/settingsSlice'
import { addCandidateRequest, candidateGptAssessment } from '@service/recruitment'
import { formateErrors } from '@utils/errorHandler'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'
import { STATUS } from 'type/config'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import {
	TextField,
	Button,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Grid,
	Typography,
	Card,
	CardContent,
	Box,
	Container,
	IconButton,
	FormHelperText,
	Stack,
	Breadcrumbs,
	createTheme,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import Loading from '@components/Loading'
import { Seo } from '@components/seo'
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import InputSelector from '@components/InputSelector'
import PhoneNumberInput from '@components/PhoneNumberInput'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { t } from 'i18next'
import { tokens } from '@locales/tokens'
import {
	fetchResumeFile,
	convertPdfToText,
	gptAssessment,
	saveAssessment,
} from '@utils/gptAssessment'
import { handleError } from '@utils/handleError'
import { candidateResumeAssessmentPrompt } from '@utils/gptPrompt'

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

const MAX_FILE_SIZE = 3 * 1024 * 1024

const FormComponent: React.FC = () => {
	const [status, setStatus] = useState<STATUS>('IDLE')
	const [previewPdf, setPreviewPdf] = useState<string | null>(null)
	const { user } = useAppSelector(authUserSelector)
	const { job } = useAppSelector(recruitmentSelector)
	const { PipelineStageOptions } = useAppSelector(settingsSelector)

	const navigate = useNavigate()
	const methods = useForm<NewCandidate>({
		defaultValues: {
			job_id: job.uuid,
			organization_id: user?.organization?.id,
			email: '',
			first_name: '',
			last_name: '',
			address: '',
		},
		resolver: zodResolver(NewCandidateSchema),
	})
	const {
		handleSubmit,
		control,
		register,
		setValue,
		reset,
		watch,
		setError,
		clearErrors,
		resetField,
		formState: { errors },
	} = methods

	const onSubmit: SubmitHandler<NewCandidate> = async (values) => {
		// console.log(values, '1111112')

		const { resume_path, ...restForm } = values
		restForm.job_id = job.uuid
		restForm.organization_id = user?.organization?.id as number

		const formData = new FormData()
		Object.entries(restForm).forEach(([key, value]) => {
			if (value) formData.append(key, value.toString())
		})

		if (resume_path && resume_path instanceof File) {
			formData.append('resume_path', resume_path)
		}

		try {
			setStatus('LOADING')
			const { data } = await addCandidateRequest(formData)
			SHOW_SUCCESS({ msg: 'Candidate added successfully' })
			magicAssessment(data.candidate)
			navigate(`/recruitment/job/${job.uuid}`)
		} catch (error) {
			const errors = formateErrors(error as unknown as AxiosError)
			Object.keys(errors).forEach((key) => {
				setError(key as keyof NewCandidate, { message: errors[key][0] })

				if (key === '_error') {
					SHOW_ERROR({ msg: errors[key][0] })
				}
			})
			setStatus('FAIL')
		} finally {
			setStatus('IDLE')
		}
	}

	const magicAssessment = async (candidate: any) => {
		try {
			if (!candidate || !candidate.uuid || !candidate.resume_path) {
				console.error('Invalid Candidate data:', candidate)
				return
			}

			const file = await fetchResumeFile(candidate.resume_path)
			if (!file) {
				return
			}

			const text = await convertPdfToText(file)
			if (!text) {
				return
			}

			const analysis = await gptAssessment(
				candidateResumeAssessmentPrompt(text, job.title, job.description),
			)
			if (!analysis) {
				return
			}

			await saveAssessment(candidate.uuid, analysis, candidateGptAssessment)
		} catch (error) {
			handleError(error, 'Unexpected error')
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0]

		if (file) {
			if (file.size > MAX_FILE_SIZE) {
				setError('resume_path', {
					type: 'manual',
					message: 'File size exceeds the limit of 3 MB',
				})
				return
			} else {
				clearErrors('resume_path')
				setValue('resume_path', file)
				const reader = new FileReader()
				reader.onloadend = () => {
					setPreviewPdf(reader.result as string)
				}
				reader.readAsDataURL(file)
			}
		} else {
			setError('resume_path', {
				type: 'manual',
				message: 'Resume is required',
			})
		}
	}

	const handleRemove = () => {
		setPreviewPdf(null)
		resetField('resume_path')
	}

	useEffect(() => {
		if (PipelineStageOptions.length > 0)
			setValue('pipeline_stage_id', Number(PipelineStageOptions[0]?.value))

		return () => {}
	}, [PipelineStageOptions])

	useEffect(() => {
		if (errors && Object.keys(errors).length > 0 && errors?.pipeline_stage_id) {
			const pipeline_stage_idField: any = document.querySelector('[name="pipeline_stage_id"]')
			pipeline_stage_idField?.focus()
		}
	}, [errors.pipeline_stage_id])

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.nav.dashboard, url: '/' },
		{ label: tokens.nav.recruitment, url: '/recruitment' },
		{ label: tokens.recruitment.job_detail.add_candidate, color: 'black' },
	]

	return (
		<>
			<Seo title="Add Candidates" />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<CustomBreadcrumbs links={breadcrumbsLinks} />

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
							{t(tokens.recruitment.job_detail.add_candidate)}
						</Typography>
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Card
									sx={{
										boxShadow: 'none !important',
										border: '1px solid #EAECF0',
										padding: 5,
									}}
								>
									<Grid container>
										<Grid
											xs={12}
											md={3}
										>
											<Box sx={{ mb: 4 }}>
												<Typography variant="h6">
													{t(tokens.recruitment.add_candidate.title)}
												</Typography>
											</Box>
										</Grid>
										<Grid
											xs={12}
											md={9}
										>
											<Grid
												container
												spacing={2}
											>
												<Grid
													item
													xs={12}
													md={6}
												>
													<Controller
														name="first_name"
														control={control}
														render={({ field }) => (
															<TextField
																{...field}
																label={t(tokens.recruitment.add_candidate.form.first_name.label)}
																placeholder={t(
																	tokens.recruitment.add_candidate.form.first_name.place_holder,
																)}
																fullWidth
																helperText={errors.first_name?.message}
																error={!!errors.first_name}
															/>
														)}
													/>
												</Grid>
												<Grid
													item
													xs={12}
													md={6}
												>
													<Controller
														name="last_name"
														control={control}
														defaultValue=""
														render={({ field }) => (
															<TextField
																{...field}
																label={t(tokens.recruitment.add_candidate.form.last_name.label)}
																placeholder={t(
																	tokens.recruitment.add_candidate.form.last_name.place_holder,
																)}
																fullWidth
																helperText={errors.last_name?.message}
																error={!!errors.last_name}
															/>
														)}
													/>
												</Grid>
												<Grid
													item
													xs={12}
													md={6}
												>
													<Controller
														name="email"
														control={control}
														render={({ field }) => (
															<TextField
																{...field}
																label={t(tokens.recruitment.add_candidate.form.email.label)}
																placeholder={t(
																	tokens.recruitment.add_candidate.form.email.place_holder,
																)}
																fullWidth
																error={!!errors.email}
																helperText={errors.email?.message}
															/>
														)}
													/>
												</Grid>
												<Grid
													item
													xs={12}
													md={6}
												>
													<PhoneNumberInput
														control={control}
														name="phone"
														errors={errors}
														isAddMode
														placeholder={t(
															tokens.recruitment.add_candidate.form.phone_number.place_holder,
														)}
													/>
												</Grid>
												<Grid
													item
													xs={12}
													md={6}
												>
													<Controller
														name="address"
														control={control}
														render={({ field }) => (
															<TextField
																{...field}
																label={t(tokens.recruitment.add_candidate.form.location.label)}
																placeholder={t(
																	tokens.recruitment.add_candidate.form.location.place_holder,
																)}
																fullWidth
																helperText={errors.address?.message}
																error={!!errors.address}
															/>
														)}
													/>
												</Grid>
												<Grid
													item
													xs={12}
													md={6}
												>
													<InputSelector
														mainProps={{
															label: t(tokens.recruitment.add_candidate.form.Pipeline_Stage.label),
															placeholder: t(
																tokens.recruitment.add_candidate.form.Pipeline_Stage.place_holder,
															),
														}}
														name="pipeline_stage_id"
														options={PipelineStageOptions}
														searchable
														// error={!!errors.pipeline_stage_id}
														helperText={errors.pipeline_stage_id?.message}
													/>
												</Grid>

												<Grid
													item
													xs={12}
												>
													<Controller
														control={control}
														name="resume_path"
														render={({ field: { onChange, ref } }) => (
															<input
																type="file"
																ref={ref}
																onChange={(e) => {
																	onChange(e.target.files && e.target.files[0])
																	handleFileChange(e)
																}}
																accept=".doc, .docx,.pdf"
																id="pdf-upload"
																multiple={false}
																hidden
															/>
														)}
													/>

													<label htmlFor="pdf-upload">
														<Button
															variant="outlined"
															color={`${errors.resume_path ? 'error' : 'primary'}`}
															component="span"
															sx={{
																gap: 1,
																width: '100%',
																fontWeight: 500,
																pb: 3,
																pt: 6,
																display: 'flex',
																flexDirection: 'column',
																color: '#357DBC',
																fontSize: 13,
																border: `1px solid `,
																'&:hover': {
																	backgroundImage: 'linear-gradient(135deg, #357DBC2a, #B591DB2c)',
																	border: '1px solid transparent',
																},
																'@media (min-width: 600px)': {
																	fontSize: 16,
																},
															}}
														>
															<DriveFolderUploadOutlinedIcon fontSize="large" />
															{previewPdf
																? 'Chose Other File (doc, docx, pdf)'
																: 'Upload Resume (doc, docx, pdf)'}
															<Typography>File limit is 3 MB.</Typography>
														</Button>
													</label>
													<FormHelperText error={!!errors.resume_path}>
														{errors.resume_path?.message}
													</FormHelperText>
													{previewPdf && (
														<Card sx={{ mt: 2 }}>
															<CardContent>
																<Stack>
																	<Box sx={{ alignSelf: 'self-end' }}>
																		<IconButton
																			color="error"
																			aria-label="delete resume"
																			onClick={handleRemove}
																		>
																			<ClearIcon />
																		</IconButton>
																	</Box>

																	<div>
																		<Typography variant="subtitle1">Preview:</Typography>
																		<embed
																			src={previewPdf}
																			width="100%"
																			height="400px"
																		/>
																	</div>
																</Stack>
															</CardContent>
														</Card>
													)}
												</Grid>

												<Grid
													item
													xs={12}
												>
													{status === 'LOADING' ? (
														<Loading />
													) : (
														<Box
															sx={{ width: '100%', display: 'flex', justifyContent: 'end', gap: 2 }}
														>
															<Button
																type="reset"
																onClick={() => {
																	reset()
																	navigate(-1)
																}}
																color="inherit"
															>
																Cancel
															</Button>
															<Button
																type="submit"
																sx={{
																	backgroundImage: 'linear-gradient(135deg, #357DBC, #B591DB)',
																	color: 'white',
																}}
															>
																Save Candidate
															</Button>
														</Box>
													)}
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Card>
							</form>
						</FormProvider>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default FormComponent
