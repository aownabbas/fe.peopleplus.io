import { FC, useEffect, useRef } from 'react'
import { Controller, useFormContext, FieldValues, SubmitHandler } from 'react-hook-form'
// mui imports
import {
	TextField,
	MenuItem,
	Button,
	FormControl,
	FormHelperText,
	Typography,
	Box,
	Avatar,
	Stack,
	createTheme,
} from '@mui/material'

// local imports
import { MainEditor } from '@components/CKEditor'
import { PolicyStatus } from 'type/policies'
import { iconList } from '@config/index'
import { useAppSelector } from '@redux/hooks'
import {
	policyCategoryOptionsSelector,
	policyDrawerSelector,
	policyStatusSelector,
} from '@redux/features/policiesSlice'
import Loading from '@components/Loading'

import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import InputSelector from '@components/InputSelector'
import DeleteBtn from '@components/DeleteButton'

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

interface AddFormProps {
	onSubmit: SubmitHandler<FieldValues>
}

const AddForm: FC<AddFormProps> = ({ onSubmit }) => {
	const { t } = useTranslation()

	const docStatus = useAppSelector(policyStatusSelector)
	const policyDrawer = useAppSelector(policyDrawerSelector)
	const policyCategoryOptions = useAppSelector(policyCategoryOptionsSelector)
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
		getValues,
	} = useFormContext<FieldValues>()
	console.log(errors, '11111')

	const isAddMode = getValues('isAddMode')

	const watchFormData = watch()

	const titleRef = useRef<HTMLDivElement>(null)
	const categoryRef = useRef<HTMLDivElement>(null)
	const iconRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const scrollToError = (ref: React.RefObject<HTMLDivElement>) => {
			if (ref.current) {
				ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		}

		if (errors.title) {
			scrollToError(titleRef)
		} else if (errors.category_name) {
			scrollToError(categoryRef)
		} else if (errors.icon) {
			scrollToError(iconRef)
		}
	}, [errors.title, errors.category_name, errors.icon])

	const handleSaveClick = () => {
		handleSubmit((data) => {
			data.status = PolicyStatus.Published
			onSubmit(data)
		})()
	}

	const handleDraftClick = () => {
		handleSubmit((data) => {
			data.status = PolicyStatus.Draft
			onSubmit(data)
		})()
	}

	function handleReset() {
		reset()
	}

	function handleDelete() {
		handleSubmit((data) => {
			data.status = PolicyStatus.Deleted
			onSubmit(data)
		})()
	}

	const buttonText =
		watch('status') === PolicyStatus.Published
			? t(tokens.policy.button.edit)
			: t(tokens.policy.button.publish)

	return (
		<>
			<Stack
				sx={{ py: '10px' }}
				spacing={2}
			>
				<Controller
					rules={{
						required: {
							value: true,
							message: t(tokens.policy.form.add_document.document_title.required),
						},
					}}
					name="title"
					control={control}
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							label={t(tokens.policy.form.add_document.document_title.label)}
							placeholder={t(tokens.policy.form.add_document.document_title.place_holder)}
							fullWidth
							error={!!error}
							helperText={error?.message}
							margin="dense"
							InputLabelProps={{
								shrink: Boolean(getValues('title')) || isAddMode,
							}}
							inputRef={titleRef}
						/>
					)}
				/>

				<Controller
					name="summary"
					control={control}
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							label={t(tokens.policy.form.add_document.short_description.label)}
							placeholder={t(tokens.policy.form.add_document.short_description.place_holder)}
							fullWidth
							error={!!error}
							helperText={error?.message}
							margin="dense"
							InputLabelProps={{
								shrink: Boolean(getValues('summary')) || isAddMode,
							}}
						/>
					)}
				/>
				<Box ref={categoryRef}>
					<InputSelector
						mainProps={{
							label: t(tokens.policy.form.add_document.document_category.label),
							placeholder: t(tokens.policy.form.add_document.document_category.place_holder),
						}}
						name="category_name"
						options={policyCategoryOptions.slice(1)}
						rules={{
							required: {
								value: true,
								message: t(tokens.policy.form.add_document.document_category.required),
							},
						}}
						defaultValue={policyCategoryOptions?.slice(1)[0]?.value}
						searchable
					/>
				</Box>
				<Stack
					spacing={2}
					sx={{ my: 2 }}
					ref={iconRef}
				>
					<Typography sx={{ fontWeight: 600, fontSize: 12, color: '#344054' }}>
						{t(tokens.policy.form.add_document.icon_select.label)}
					</Typography>

					<Controller
						rules={{
							required: {
								value: true,
								message: t(tokens.policy.form.add_document.icon_select.required),
							},
						}}
						name="icon"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<FormControl
								fullWidth
								error={!!error}
								sx={{
									mt: 2,
									mb: 1,
									'&:focus-within': {
										borderColor: theme.palette.primary.main,
										boxShadow: `0 0 0 2px ${theme.palette.primary.main} inset`,
									},
								}}
								variant="outlined"
							>
								<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
									{iconList.map((img) => (
										<Avatar
											key={img.value}
											tabIndex={0}
											sx={{
												width: '40px',
												height: '40px',
												cursor: 'pointer',
												border: img.value === field?.value ? '2px solid #357DBC' : 'none',
											}}
											onClick={() => field.onChange(img.value)}
											onKeyDown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') {
													field.onChange(img.value)
												}
											}}
										>
											<img
												src={img.value}
												alt={`DocIcon ${img.label}`}
												style={{ width: '100%', height: '100%' }}
											/>
										</Avatar>
									))}
								</Box>
								<FormHelperText>{error?.message}</FormHelperText>
							</FormControl>
						)}
					/>
				</Stack>

				<Typography
					component="label"
					htmlFor="quill-editor"
					sx={{ mb: 1, fontWeight: 600, fontSize: 12, color: '#344054' }}
				>
					{t(tokens.policy.form.add_document.content.label)}
				</Typography>
				<Box tabIndex={0}>
					<MainEditor
						placeholder="Enter description"
						name="content"
					/>
				</Box>

				{docStatus === 'LOADING' ? (
					<Loading />
				) : (
					<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 2 }}>
						{policyDrawer.variant === 'form' ? (
							<Button
								type="reset"
								onClick={handleReset}
								style={{ color: 'black' }}
							>
								{t(tokens.policy.button.clear)}
							</Button>
						) : policyDrawer.variant === 'details' ? (
							<DeleteBtn
								onClick={handleDelete}
								label={t(tokens.policy.button.delete)}
							/>
						) : (
							<></>
						)}
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
							<Button
								type="button"
								sx={{
									backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
									color: '#164C63',
									fontSize: 13,
								}}
								onClick={handleDraftClick}
							>
								{t(tokens.policy.button.draft)}
							</Button>
							<Button
								type="button"
								variant="gradient"
								onClick={handleSaveClick}
							>
								{buttonText}
							</Button>
						</Box>
					</Box>
				)}
			</Stack>
		</>
	)
}

export default AddForm
