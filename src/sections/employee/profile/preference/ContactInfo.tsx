/* eslint-disable prettier/prettier */
import { Controller, FieldValues, useFormContext } from 'react-hook-form'
import { TextField, Grid, Typography, Stack, MenuItem, IconButton, Box } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '@redux/hooks'
import { settingsSelector } from '@redux/features/settingsSlice'
import { useState } from 'react'

import Visibility from '@untitled-ui/icons-react/build/esm/Eye'
import VisibilityOff from '@untitled-ui/icons-react/build/esm/EyeOff'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

const ContactInfo = () => {
	const { uuid } = useParams()

	const { countriesOptions } = useAppSelector(settingsSelector)

	const {
		register,
		control,
		watch,
		getValues,
		formState: { errors },
	} = useFormContext<FieldValues>()
	const isAddMode = getValues('isAddMode')

	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault()
	}

	const { t } = useTranslation()

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
					sx={{
						pl: 1,
					}}
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
							{/* first name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('email', { required: 'Email is required' })}
									error={!!errors.email}
									helperText={errors.email && (errors.email?.message as string)}
									InputProps={{
										readOnly: true,
									}}
									disabled
									fullWidth
									label="Email"
									InputLabelProps={{
										shrink: Boolean(getValues('email')) || isAddMode,
									}}
									// stop email suggesions code
									autoComplete="new-email"
								/>
								<input
									type="text"
									name="dummy-email"
									autoComplete="off"
									style={{ display: 'none' }}
								/>
							</Grid>

							{/* password */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								{/* <TextField
									// {...register('password')}
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 8,
											message: 'Password must be at least 8 characters long',
										},
									})}
									error={!!errors.password}
									type="password"
									helperText={errors.password && (errors.password?.message as string)}
									fullWidth
									label="Password"
									InputLabelProps={{
										shrink: Boolean(getValues('password')) || isAddMode,
									}}
								/> */}

								<Box position="relative">
									<TextField
										// {...register('password')}
										{...register('password', {
											// required: 'Password is requireds',
											minLength: {
												value: 8,
												message: 'Password must be at least 8 characters long',
											},
										})}
										error={!!errors.password}
										type={showPassword ? 'text' : 'password'}
										helperText={errors.password && (errors.password?.message as string)}
										fullWidth
										label="Password"
										InputLabelProps={{
											shrink: Boolean(getValues('password')) || isAddMode,
										}}
										autoComplete="Password"
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
									<input
										type="password"
										name="dummy-password"
										autoComplete="new-password"
										style={{ display: 'none' }}
									/>
								</Box>
							</Grid>

							{/* last name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('phone_number')}
									error={!!errors.phone_number}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									disabled
									label="Phone Number"
									InputLabelProps={{
										shrink: Boolean(getValues('phone_number')) || isAddMode,
									}}
								/>
							</Grid>

							{/* last name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('emergency_contact')}
									error={!!errors.phone_number}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									disabled
									label=" Emergency Number"
									InputLabelProps={{
										shrink: Boolean(getValues('emergency_contact')) || isAddMode,
									}}
								/>
							</Grid>

							{/* last name */}

							<Grid
								xs={12}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('street_address')}
									error={!!errors.street_address}
									fullWidth
									label="Street address"
									InputLabelProps={{
										shrink: Boolean(getValues('street_address')) || isAddMode,
									}}
								/>
							</Grid>

							{/* last name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('city')}
									error={!!errors.city}
									fullWidth
									label="City"
									InputLabelProps={{
										shrink: Boolean(getValues('city')) || isAddMode,
									}}
								/>
							</Grid>

							{/* last name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('state')}
									error={!!errors.state}
									fullWidth
									label="State"
									InputLabelProps={{
										shrink: Boolean(getValues('state')) || isAddMode,
									}}
								/>
							</Grid>

							{/* last name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('postcode')}
									error={!!errors.postcode}
									fullWidth
									label="Postal Code"
									InputLabelProps={{
										shrink: Boolean(getValues('postcode')) || isAddMode,
									}}
								/>
							</Grid>

							{/* gender */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="country_id"
									control={control}
									render={({ field }) => (
										<TextField
											sx={{ height: '55px' }}
											{...field}
											fullWidth
											label="Select Country"
											select
											error={!!errors.country_id?.message}
											helperText={!!errors.country_id?.message}
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
