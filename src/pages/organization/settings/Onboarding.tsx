import { useContext, useEffect, useState } from 'react'
import {
	Controller,
	FieldError,
	FieldValues,
	FormProvider,
	SubmitHandler,
	useFieldArray,
	useForm,
} from 'react-hook-form'

// mui imports
import {
	Typography,
	Stack,
	Grid,
	SvgIcon,
	Button,
	TextField,
	AccordionSummary,
	Accordion,
	AccordionDetails,
	MenuItem,
	Card,
	IconButton,
} from '@mui/material'
import { Box, createTheme } from '@mui/system'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import TrashIcon from '@untitled-ui/icons-react/build/esm/Trash01'
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown'

// translation
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { SHOW_ERROR, SHOW_INFO, SHOW_SUCCESS } from '@utils/ToastMessage'
import { mandatory, priority } from '@config/index'
import { QuillEditor } from '@components/quill-editor'
import { employeeListAction, employeeSelector } from '@redux/features/employeeSlice'

// types
import { StatusSetting } from 'type/config'
import {
	DeleteSettingsFields,
	Onboarding,
	OnboardingListValues,
	dynamicFields,
} from 'type/settings'
import { onboardingListRequest, onboardingModifyRequest } from '@service/settings'
import Loading from '@components/Loading'
import {
	deleteState,
	isDeletingSelector,
	settingsDeleteAction,
} from '@redux/features/settingsSlice'
import { isEmpty } from '@utils/bug'
import { MainEditor } from '@components/CKEditor'
import { ConfirmationContext } from '@contexts/confirmation'
import InputSelector from '@components/InputSelector'
import { FieldCardSkeleton } from '@components/Skeletons'

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
const initialState: StatusSetting = { error: null, status: 'IDLE' }

const Onboarding = () => {
	const [setting, setSetting] = useState<StatusSetting>(initialState)

	const { t } = useTranslation()
	const { rem_text, form, header, add_text } = tokens.settings.onboarding
	const isDeleting = useAppSelector(isDeletingSelector)
	const employee = useAppSelector(employeeSelector)
	const dispatch = useAppDispatch()

	const methods = useForm<OnboardingListValues>()

	const {
		register,
		reset,
		handleSubmit,
		control,
		formState: { errors, isDirty, dirtyFields },
		setValue,
		setFocus,
		setError,
	} = methods

	// useForm<OnboardingListValues>()
	const { openModal } = useContext(ConfirmationContext)
	const { fields, append, remove, replace } = useFieldArray({
		control,
		name: 'fields',
		shouldUnregister: true,
	})

	const handleList = () => {
		onboardingListRequest()
			.then(({ data: { onboardings } }) => {
				if (onboardings.length === 0) {
					reset({
						fields: [
							{
								assign: '',
								description: '',
								mandatory: mandatory[0].value,
								priority: priority[0].value,
								title: '',
							},
						],
					})
					setSetting({ ...initialState })
					return
				}

				const pData = onboardings.map(
					(onb: {
						assign: any
						description: string
						mandatory: any
						priority: any
						title: string
						uuid: string
					}) => {
						return {
							uuid: onb.uuid,
							assign: onb.assign,
							description: onb.description,
							mandatory: onb.mandatory,
							priority: onb.priority,
							title: onb.title,
						}
					},
				)

				reset({
					fields: pData,
				})

				setSetting({ ...pData })
			})
			.catch(() => {
				setSetting({ ...setting, status: 'FAIL' })
			})
	}

	const onSubmit: SubmitHandler<FieldValues> = async (fromData) => {
		if (!isDirty && isEmpty(dirtyFields)) {
			SHOW_INFO({ msg: 'There is nothing to submit' })
			return
		}
		try {
			setSetting({ ...setting, status: 'LOADING' })
			const { data } = await onboardingModifyRequest(fromData.fields)
			if (data) {
				replace(fromData.fields)
				handleList()
				SHOW_SUCCESS({})
			}
			setSetting({ ...initialState })
		} catch (error: any) {
			setSetting({ ...setting, status: 'FAIL' })
			SHOW_ERROR({ msg: 'An error occurred while submitting onboarding ' })
		}
	}

	const handleRemove = async (idx: number, field: Onboarding) => {
		openModal(
			`Are you sure you want to delete this step?`,
			async () => {
				dispatch(deleteState({ uuid: field.uuid }))
				if (!field.uuid) {
					remove(idx)
					return
				}

				const fromData: DeleteSettingsFields = {
					deleteFrom: 'onboarding',
					uuid: field.uuid,
				}
				try {
					const { type } = await dispatch(settingsDeleteAction(fromData))
					if (type.includes('/fulfilled')) {
						remove(idx)
						SHOW_SUCCESS({ msg: `Deleted Successfully` })
					}
				} catch (error) {
					console.error(error)
					SHOW_SUCCESS({ msg: `Something Went Wrong` })
				} finally {
					dispatch(deleteState({}))
				}
			},
			() => {
				console.log('Cancelled')
			},
		)
	}

	useEffect(() => {
		dispatch(employeeListAction())
		return () => {}
	}, [])

	useEffect(() => {
		setSetting({ ...setting, status: 'LOADING' })
		handleList()

		return () => {}
	}, [])

	if (setting.status === 'LOADING') {
		return (
			<FieldCardSkeleton
				firstTitle="Onboarding Configuration"
				secondTitle=""
			/>
		)
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Card
					sx={{
						boxShadow: 'none !important',
						border: '1px solid #EAECF0',
						padding: '20px',
					}}
				>
					<Grid container>
						<Grid
							xs={12}
							md={3}
						>
							<Typography
								variant="h6"
								sx={{
									pb: 2,
								}}
							>
								{t(header)}
							</Typography>
						</Grid>
						<Grid
							xs={12}
							md={9}
						>
							<Stack spacing={2}>
								{fields.map((field, idx) => (
									<Accordion
										key={field.id}
										defaultExpanded={idx === 0}
										sx={{ borderRadius: 1 }}
									>
										<AccordionSummary
											sx={{
												backgroundColor: '#F2F3F7',
												borderRadius: 1,
												border: 0,
											}}
											expandIcon={<ChevronDownIcon />}
											aria-controls={`panel${idx}-content`}
											id={`panel${idx}-header`}
										>
											<Typography>{fields[idx].title}</Typography>
										</AccordionSummary>
										<AccordionDetails
											sx={{
												p: 0,
											}}
										>
											<Grid
												container
												sx={{ width: '100%' }}
											>
												{/* Title */}
												<Grid
													xs={12}
													md={6}
													sx={{ p: 1 }}
												>
													<TextField
														{...register(`fields.${idx}.title` as const, {
															required: 'This field is required',
														})}
														label={t(form.title.name)}
														placeholder={t(form.title.placeHolder)}
														error={!!errors?.fields?.[idx]?.title}
														helperText={errors?.fields?.[idx]?.title?.message}
														type="text"
														required
														fullWidth
														InputLabelProps={{
															shrink: true,
														}}
													/>
												</Grid>

												{/* Priority */}
												<Grid
													xs={12}
													md={6}
													sx={{ p: 1 }}
												>
													{/* <Controller
														name={`fields.${idx}.priority` as const}
														control={control}
														render={({ field }) => (
															<TextField
																{...field}
																label={t(form.priority.name)}
																placeholder={t(form.priority.placeHolder)}
																error={!!errors?.fields?.[idx]?.priority}
																helperText={errors?.fields?.[idx]?.priority?.message}
																fullWidth
																select
															>
																{priority.map((option) => (
																	<MenuItem
																		key={option.value}
																		value={option.value}
																	>
																		{t(option.label)}
																	</MenuItem>
																))}
															</TextField>
														)}
													/> */}

													<InputSelector
														mainProps={{
															label: t(form.priority.name),
															placeholder: t(form.priority.placeHolder),
														}}
														name={`fields.${idx}.priority` as const}
														options={priority}
														searchable
													/>
												</Grid>

												{/* mandatory */}
												<Grid
													xs={12}
													md={6}
													sx={{ p: 1 }}
												>
													{/* <Controller
														name={`fields.${idx}.mandatory` as const}
														control={control}
														rules={{ required: 'This field is required' }}
														render={({ field }) => (
															<TextField
																{...field}
																label={t(form.mandatory.name)}
																placeholder={t(form.mandatory.placeHolder)}
																error={!!errors?.fields?.[idx]?.mandatory}
																helperText={errors?.fields?.[idx]?.mandatory?.message}
																fullWidth
																select
															>
																{mandatory.map((option) => (
																	<MenuItem
																		key={option.value}
																		value={option.value}
																	>
																		{t(option.label)}
																	</MenuItem>
																))}
															</TextField>
														)}
													/> */}

													<InputSelector
														mainProps={{
															label: t(form.mandatory.name),
															placeholder: t(form.mandatory.placeHolder),
														}}
														name={`fields.${idx}.mandatory` as const}
														options={mandatory}
														searchable
													/>
												</Grid>

												{/* default assign */}
												<Grid
													xs={12}
													md={6}
													sx={{ p: 1 }}
												>
													{/* <Controller
														name={`fields.${idx}.assign` as const}
														control={control}
														render={({ field }) => (
															<TextField
																{...field}
																label={t(form.assignee.name)}
																placeholder={t(form.assignee.placeHolder)}
																fullWidth
																select
																error={!!errors?.fields?.[idx]?.assign}
																helperText={errors?.fields?.[idx]?.assign?.message}
															>
																{employee.Options.length > 0 ? (
																	employee?.Options?.map((option) => (
																		<MenuItem
																			key={option.value}
																			value={option.value}
																		>
																			{t(option.label)}
																		</MenuItem>
																	))
																) : (
																	<MenuItem disabled>No Record Found</MenuItem>
																)}
															</TextField>
														)}
													/> */}

													<InputSelector
														mainProps={{
															label: t(form.assignee.name),
															placeholder: t(form.assignee.placeHolder),
														}}
														name={`fields.${idx}.assign` as const}
														options={employee.Options}
														searchable
													/>
												</Grid>

												{/* description */}
												<Grid
													xs={12}
													md={12}
													sx={{ p: 1 }}
												>
													<MainEditor
														placeholder="Enter description"
														name={`fields.${idx}.description`}
													/>
												</Grid>

												{/* delete button */}
												<Grid
													xs={12}
													md={12}
												>
													{isDeleting.stats === 'LOADING' &&
													//@ts-ignore
													isDeleting.state.uuid === field.uuid ? (
														<Loading />
													) : (
														<Button
															disabled={isDeleting.stats === 'LOADING'}
															sx={{
																background: theme.palette.background.default,
																color: 'transparent',
																WebkitBackgroundClip: 'text',
															}}
															onClick={() => handleRemove(idx, field)}
															type="button"
															startIcon={
																<SvgIcon color="primary">
																	<TrashIcon />
																</SvgIcon>
															}
														>
															{t(rem_text)}
														</Button>
													)}
												</Grid>
											</Grid>
										</AccordionDetails>
									</Accordion>
								))}
							</Stack>

							<Stack
								alignItems="center"
								justifyContent="space-between"
								direction="row"
								sx={{ marginTop: 2 }}
							>
								{/* {setting.status === 'LOADING' ? (
									<Typography
										sx={{
											background: theme.palette.background.default,
											color: 'transparent',
											WebkitBackgroundClip: 'text',
										}}
										variant="subtitle1"
									>
										{t(tokens.common.loading)}
									</Typography>
								) : ( */}
								<Button
									sx={{
										background: theme.palette.background.default,
										color: 'transparent',
										WebkitBackgroundClip: 'text',
									}}
									onClick={() => {
										append({
											assign: '',
											description: '',
											mandatory: mandatory[0].value,
											priority: priority[0].value,
											title: '',
										})
									}}
									startIcon={
										<SvgIcon fontSize="small">
											<PlusIcon color={'#357DBC'} />
										</SvgIcon>
									}
								>
									{t(add_text)}
								</Button>
								{/* )} */}

								<Button
									// disabled={setting.status === 'LOADING'}
									variant="gradient"
									type="submit"
								>
									{t(tokens.common.save_changes)}
									{/* {setting.status === 'LOADING' ? <Loading /> : t(tokens.common.save_changes)} */}
								</Button>
							</Stack>
						</Grid>
					</Grid>
				</Card>
			</form>
		</FormProvider>
	)
}

export default Onboarding
