import { Controller, useFormContext } from 'react-hook-form'

// mui imports
import { Typography, Stack, TextField, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { DropdownOption } from 'type/config'
import { experienceLevel, travelRequirement } from '@config/index'
import { useAppSelector } from '@redux/hooks'
import { employeeSelector } from '@redux/features/employeeSlice'
import InputChipSelector from '@components/InputChipSelector'
import InputSelector from '@components/InputSelector'
import { useEffect, useState } from 'react'

const AdditionalInfo = () => {
	const { headers, form } = tokens.recruitment.add_job
	const { t } = useTranslation()
	const hiringManager = useAppSelector(employeeSelector)
	// const [hiringManagerOptions, setHiringManagerOptions] = useState<DropdownOption[]>([])

	// useEffect(() => {
	// 	setHiringManagerOptions(hiringManager.Options.slice(0,10))
	// }, [hiringManager])

	const {
		register,
		formState: { errors },
		control,
		watch,
		getValues,
	} = useFormContext()
	const isAddMode = getValues('isAddMode')

	return (
		<Grid
			container
			spacing={3}
		>
			<Grid
				xs={12}
				md={3}
			>
				<Typography variant="h6">{t(headers.additional_information)}</Typography>
			</Grid>
			<Grid
				xs={12}
				md={9}
			>
				<Stack spacing={3}>
					<Grid container>
						{/* application deadline */}
						<Grid
							xs={12}
							md={12}
							sx={{ p: 1 }}
						>
							<Controller
								name="dead_line"
								control={control}
								render={({ field }) => (
									<DatePicker
										label="Application deadline"
										{...field}
										sx={{ width: '100%' }}
									/>
								)}
							/>
						</Grid>

						{/* Experience Level */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<InputSelector
								mainProps={{
									label: t(form.experience_level.name),
									placeholder: t(form.experience_level.placeHolder),
									helperText:
										errors.experience_level?.message && t(form.experience_level.helperText),
								}}
								name="experience_level"
								options={experienceLevel}
								searchable
							/>
						</Grid>

						{/* Travel Requirements*/}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							{/* <Controller
								name="travel_requirement"
								render={({ field }) => (
									<TextField
										{...field}
										error={!!errors.travel_requirement}
										helperText={
											errors.travel_requirement?.message && t(form.travel_requirement.helperText)
										}
										label={t(form.travel_requirement.name)}
										placeholder={t(form.travel_requirement.placeHolder)}
										select
										fullWidth
									>
										{travelRequirement.map((option: DropdownOption) => (
											<MenuItem
												key={option.value}
												value={option.value}
											>
												{option.label}
											</MenuItem>
										))}
									</TextField>
								)}
							/> */}

							<InputSelector
								mainProps={{
									label: t(form.travel_requirement.name),
									placeholder: t(form.travel_requirement.placeHolder),
								}}
								name="travel_requirement"
								options={travelRequirement}
								searchable
							/>
						</Grid>

						{/* Hiring Manager */}
						<Grid
							xs={12}
							md={12}
							sx={{ p: 1 }}
						>
							{/*   */}
							<InputChipSelector
								label={t(tokens.recruitment.add_job.form.hiring_manager.label)}
								placeholder={t(tokens.recruitment.add_job.form.hiring_manager.place_holder)}
								name="hiring_managers"
								options={hiringManager.Options}
							/>
						</Grid>

						{/* Application Email */}
						<Grid
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<TextField
								{...register('application_email', {
									required: form.application_email.helperText,
								})}
								name="application_email"
								label={t(form.application_email.name)}
								error={!!errors.application_email}
								helperText={t(errors.application_email?.message as string)}
								placeholder={t(form.application_email.placeHolder)}
								fullWidth
								type="email"
								InputLabelProps={{
									shrink: Boolean(getValues('salary_range')) || isAddMode,
								}}
							/>
							<span
								style={{
									fontSize: 12,
									color: 'gray',
									fontWeight: 500,
								}}
							>
								{t(tokens.recruitment.add_job.form.application_email.mail_message)}{' '}
							</span>
						</Grid>
					</Grid>
				</Stack>
			</Grid>
		</Grid>
	)
}

export default AdditionalInfo
