import { Controller, useFormContext } from 'react-hook-form'

// mui imports
import { Typography, Stack, CardContent, Grid, TextField, MenuItem } from '@mui/material'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { useAppSelector } from '@redux/hooks'
import { settingsSelector } from '@redux/features/settingsSlice'
import InputSelector from '@components/InputSelector'
import { Label } from '@mui/icons-material'

const OfficeInfo = () => {
	const { headers, form } = tokens.settings.general
	const { t } = useTranslation()

	const { countriesOptions, timezoneOptions } = useAppSelector(settingsSelector)

	const {
		register,
		formState: { errors },
		control,
		getValues,
		watch,
	} = useFormContext()
	const isAddMode = getValues('isAddMode')

	return (
		<>
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
						{t(headers.office_info)}
					</Typography>
				</Grid>
				<Grid
					xs={12}
					md={9}
				>
					<Stack spacing={3}>
						<Grid container>
							{/* office_address */}
							<Grid
								xs={12}
								md={12}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('office_address')}
									fullWidth
									name="office_address"
									error={!!errors.office_address}
									helperText={errors.office_address?.message && t(form.office_add.helperText)}
									label={t(form.office_add.name)}
									placeholder={t(form.office_add.placeHolder)}
									type="text"
									sx={{ flexGrow: 1 }}
									InputLabelProps={{
										shrink: Boolean(getValues('office_address')) || isAddMode,
									}}
								/>
							</Grid>

							{/* city */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('city')}
									fullWidth
									error={!!errors.city}
									helperText={errors.city?.message && t(form.city.helperText)}
									label={t(form.city.name)}
									placeholder={t(form.city.placeHolder)}
									type="text"
									sx={{ flexGrow: 1 }}
									InputLabelProps={{
										shrink: Boolean(getValues('city')) || isAddMode,
									}}
								/>
							</Grid>

							{/*zip_code */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('zip_code', {
										onChange: (e) => {
											e.target.value = e.target.value.slice(0, 10)
										},
									})}
									fullWidth
									error={!!errors.zip_code}
									helperText={errors.zip_code?.message && t(form.zip_code.helperText)}
									label={t(form.zip_code.name)}
									placeholder={t(form.zip_code.placeHolder)}
									type="text"
									sx={{ flexGrow: 1 }}
									InputLabelProps={{
										shrink: Boolean(getValues('zip_code')) || isAddMode,
									}}
								/>
							</Grid>

							{/*country_id */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								{/* <Controller
									control={control}
									name="country_id"
									render={({ field: { onChange, onBlur, value } }) => (
										<TextField
											fullWidth
											value={String(value)}
											onChange={onChange}
											onBlur={onBlur}
											error={!!errors.country_id}
											helperText={errors.country_id?.message && t(form.country.helperText)}
											label={t(form.country.name)}
											placeholder={t(form.country.placeHolder)}
											select
											sx={{ flexGrow: 1 }}
										>
											{countriesOptions.map((option) => (
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
										label: t(form.country.name),
										placeholder: t(form.country.placeHolder),
									}}
									name="country_id"
									options={countriesOptions}
								/>
							</Grid>

							{/* time_zone */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								{/* <Controller
								control={control}
								name="time_zone"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextField
										fullWidth
										value={String(value)}
										onChange={onChange}
										onBlur={onBlur}
										error={!!errors.time_zone}
										helperText={errors.time_zone?.message && t(form.time_zone.helperText)}
										label={t(form.time_zone.name)}
										placeholder={t(form.time_zone.placeHolder)}
										select
										sx={{ flexGrow: 1 }}
									>
										{timezoneOptions &&
											timezoneOptions.length > 0 &&
											timezoneOptions.map((option) => (
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
										label: t(form.time_zone.name),
										placeholder: t(form.time_zone.placeHolder),
									}}
									name="time_zone"
									options={timezoneOptions}
									searchable
								/>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			</Grid>
		</>
	)
}

export default OfficeInfo
