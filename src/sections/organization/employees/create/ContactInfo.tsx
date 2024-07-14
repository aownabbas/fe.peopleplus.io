/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { Controller, FieldValues, useFormContext } from 'react-hook-form'
import {
	TextField,
	Grid,
	Typography,
	Stack,
	MenuItem,
	Box,
	IconButton,
	FormControl,
} from '@mui/material'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '@redux/hooks'
import { settingsSelector } from '@redux/features/settingsSlice'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import Visibility from '@untitled-ui/icons-react/build/esm/Eye'
import VisibilityOff from '@untitled-ui/icons-react/build/esm/EyeOff'
import PhoneNumberInput from '@components/PhoneNumberInput' // Adjust the path to your component
import InputSelector from '@components/InputSelector'

const ContactInfo = () => {
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault()
	}

	const { t } = useTranslation()
	const { uuid }: any = useParams()
	const { countriesOptions } = useAppSelector(settingsSelector)

	const {
		register,
		control,
		getValues,
		formState: { errors },
	} = useFormContext<FieldValues>()

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
				<Stack
					sx={{ pl: 1 }}
					spacing={1}
				>
					<Typography variant="h6">
						{t(tokens.employee.create_employee.form.contact_info.title)}
					</Typography>
				</Stack>
			</Grid>
			<Grid
				xs={12}
				md={9}
				sx={{ pr: 4 }}
			>
				<Grid
					xs={12}
					md={12}
				>
					<Stack
						spacing={3}
						sx={{ width: '100%' }}
					>
						<Grid
							container
							spacing={2}
						>
							{/* email */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('email', {
										required: t(tokens.employee.create_employee.form.contact_info.email.required),
									})}
									error={!!errors.email}
									helperText={errors.email && (errors.email?.message as string)}
									fullWidth
									label={t(tokens.employee.create_employee.form.contact_info.email.label)}
									placeholder={t(
										tokens.employee.create_employee.form.contact_info.email.place_holder,
									)}
									InputLabelProps={{
										shrink: Boolean(getValues('email')) || isAddMode,
									}}
								/>
							</Grid>

							{/* password */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Box position="relative">
									<TextField
										{...register('password', {
											required: uuid
												? false
												: t(tokens.employee.create_employee.form.contact_info.password.required),
											minLength: {
												value: 8,
												message: t(
													tokens.employee.create_employee.form.contact_info.password.error_message,
												),
											},
										})}
										error={!!errors.password}
										type={showPassword ? 'text' : 'password'}
										helperText={errors.password && (errors.password?.message as string)}
										fullWidth
										label={t(tokens.employee.create_employee.form.contact_info.password.label)}
										placeholder={t(
											tokens.employee.create_employee.form.contact_info.password.place_holder,
										)}
										InputLabelProps={{
											shrink: Boolean(getValues('password')) || isAddMode,
										}}
									/>
									<IconButton
										sx={{
											position: 'absolute',
											right: 0,
											top: '15%',
											backgroundColor: 'transparent',
										}}
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</Box>
							</Grid>

							{/* phone number */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Typography sx={{ fontSize: 12, fontWeight: 500, mb: 1 }}>
									{t(tokens.employee.create_employee.form.contact_info.number.label)}
								</Typography>
								<PhoneNumberInput
									control={control}
									name="phone_number"
									errors={errors}
									isAddMode={isAddMode}
									placeholder={t(
										tokens.employee.create_employee.form.contact_info.number.place_holder,
									)}
								/>
							</Grid>

							{/* phone number */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Typography sx={{ fontSize: 12, fontWeight: 500, mb: 1 }}>
									{t(tokens.employee.create_employee.form.contact_info.emergency_number.label)}
								</Typography>

								<PhoneNumberInput
									control={control}
									name="emergency_contact"
									errors={errors}
									isAddMode={isAddMode}
									placeholder={t(
										tokens.employee.create_employee.form.contact_info.emergency_number.place_holder,
									)}
								/>
							</Grid>

							{/* street address */}
							<Grid
								xs={12}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('street_address')}
									error={!!errors.street_address}
									fullWidth
									label={t(tokens.employee.create_employee.form.contact_info.street_address.label)}
									placeholder={t(
										tokens.employee.create_employee.form.contact_info.street_address.place_holder,
									)}
									InputLabelProps={{
										shrink: Boolean(getValues('street_address')) || isAddMode,
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
									error={!!errors.city}
									fullWidth
									label={t(tokens.employee.create_employee.form.contact_info.city.label)}
									placeholder={t(
										tokens.employee.create_employee.form.contact_info.city.place_holder,
									)}
									InputLabelProps={{
										shrink: Boolean(getValues('city')) || isAddMode,
									}}
								/>
							</Grid>

							{/* state */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('state')}
									error={!!errors.state}
									fullWidth
									label={t(tokens.employee.create_employee.form.contact_info.state.label)}
									placeholder={t(
										tokens.employee.create_employee.form.contact_info.state.place_holder,
									)}
									InputLabelProps={{
										shrink: Boolean(getValues('state')) || isAddMode,
									}}
								/>
							</Grid>

							{/* postcode */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('postcode', {
										onChange: (e) => {
											// Directly manipulate input to allow only the first 10 characters
											e.target.value = e.target.value.slice(0, 10)
										},
									})}
									error={!!errors.postcode}
									fullWidth
									label={t(tokens.employee.create_employee.form.contact_info.postal_code.label)}
									InputLabelProps={{
										shrink: Boolean(getValues('postcode')) || isAddMode,
									}}
								/>
							</Grid>

							{/* country_id */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<InputSelector
									searchable
									mainProps={{
										label: t(
											tokens.employee.create_employee.form.contact_info.select_country.label,
										),
										placeholder: t(
											tokens.employee.create_employee.form.contact_info.select_country.place_holder,
										),
									}}
									name="country_id"
									options={countriesOptions}
								/>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default ContactInfo
