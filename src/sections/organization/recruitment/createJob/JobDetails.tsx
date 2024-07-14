import { Controller, UseFormReturn, useFormContext } from 'react-hook-form'

// mui imports
import { createTheme } from '@mui/system'
import {
	Box,
	Typography,
	Stack,
	CardContent,
	SvgIcon,
	alpha,
	Avatar,
	TextField,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	Chip,
	FormHelperText,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { settingsSelector } from '@redux/features/settingsSlice'
import { useAppSelector } from '@redux/hooks'
import { employmentType } from '@config/index'
import InputChipSelector from '@components/InputChipSelector'
import InputSelector from '@components/InputSelector'
import { MainEditor } from '@components/CKEditor'
import { DropdownOption } from 'type/config'

const JobDetails = () => {
	const { headers, form } = tokens.recruitment.add_job
	const { t } = useTranslation()
	const { departmentsOptions, skillSetOptions, workLocationOptions } =
		useAppSelector(settingsSelector)

	const {
		register,
		control,
		setValue,
		watch,
		getValues,
		formState: { errors },
	} = useFormContext()
	const isAddMode = getValues('isAddMode')

	// const Currency = [
	// 	{ value: 'PKR', label: 'PKR' },
	// 	{ value: 'INR', label: 'INR' },
	// 	{ value: 'USD', label: 'USD' },
	// ]

	const currency: DropdownOption[] = [
		{
			label: 'PKR',
			value: 'pkr',
		},
		{
			label: 'INR',
			value: 'inr',
		},
		{
			label: 'USD',
			value: 'usd',
		},
	]

	return (
		<Grid
			container
			spacing={3}
		>
			<Grid
				xs={12}
				md={3}
			>
				<Typography variant="h6">{t(headers.job_details)}</Typography>
			</Grid>
			<Grid
				xs={12}
				md={9}
			>
				<Stack spacing={3}>
					<Grid container>
						{/* job title */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<TextField
								{...register('title', {
									required: t(tokens.recruitment.add_job.form.job_title.required),
								})}
								name="title"
								label={t(form.job_title.name)}
								error={!!errors.title}
								helperText={t(errors.title?.message as string)}
								placeholder={t(form.job_title.placeHolder)}
								fullWidth
								InputLabelProps={{
									shrink: Boolean(getValues('title')) || isAddMode,
								}}
							/>
						</Grid>

						{/* department */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<InputSelector
								mainProps={{
									label: t(form.department.name),
									placeholder: t(form.department.placeHolder),
								}}
								name="department_id"
								options={departmentsOptions}
								searchable
							/>
						</Grid>

						{/*job description */}
						<Grid
							xs={12}
							md={12}
							sx={{ p: 1 }}
						>
							<MainEditor
								placeholder={t(form.job_description.placeHolder)}
								name="description"
							/>
						</Grid>

						{/*short description */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<TextField
								{...register('short_description')}
								name="short_description"
								label={t(form.short_description.name)}
								error={!!errors.short_description}
								helperText={
									errors.short_description?.message && t(form.short_description.helperText)
								}
								placeholder={t(form.short_description.placeHolder)}
								fullWidth
								InputLabelProps={{
									shrink: Boolean(getValues('short_description')) || isAddMode,
								}}
							/>
						</Grid>

						{/* location */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<InputSelector
								mainProps={{
									label: t(form.location.name),
									placeholder: t(form.location.placeHolder),
								}}
								name="work_location_id"
								options={workLocationOptions}
								searchable
							/>
						</Grid>

						{/* job id */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<TextField
								{...register('job_id')}
								name="job_id"
								label={t(form.job_id.name)}
								error={!!errors.job_id}
								helperText={errors.job_id?.message && t(form.job_id.helperText)}
								placeholder={t(form.job_id.placeHolder)}
								fullWidth
								disabled
								type="text"
								InputLabelProps={{
									shrink: Boolean(getValues('job_id')) || isAddMode,
								}}
							/>
						</Grid>

						{/* employment type */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<InputSelector
								mainProps={{
									label: t(form.employment_type.name),
									placeholder: t(form.employment_type.placeHolder),
								}}
								name="employment_type"
								options={employmentType}
								searchable
							/>
						</Grid>

						{/* salary Range */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<TextField
								{...register('salary_range')}
								name="salary_range"
								label={t(form.salary_range.name)}
								error={!!errors.salary_range}
								helperText={errors.salary_range?.message && t(form.salary_range.helperText)}
								placeholder={t(form.salary_range.placeHolder)}
								fullWidth
								InputLabelProps={{
									shrink: Boolean(getValues('salary_range')) || isAddMode,
								}}
							/>
						</Grid>
						{/* salary type */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<InputSelector
								mainProps={{
									label: t(form.currency.name),
									placeholder: t(form.currency.placeHolder),
								}}
								name="currency"
								options={currency}
								searchable
							/>
						</Grid>

						{/* skill-set */}
						<Grid
							xs={12}
							md={12}
							sx={{ p: 1 }}
						>
							<InputChipSelector
								label={t(tokens.recruitment.add_job.form.skill_set.label)}
								placeholder={t(tokens.recruitment.add_job.form.skill_set.place_holder)}
								name="skill_sets"
								options={skillSetOptions}
							/>
						</Grid>
					</Grid>
				</Stack>
			</Grid>
		</Grid>
	)
}

export default JobDetails
