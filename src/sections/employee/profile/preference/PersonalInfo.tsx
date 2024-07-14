/* eslint-disable prettier/prettier */
import { Controller, useFormContext } from 'react-hook-form'
import { TextField, Grid, Typography, Box, Stack, SvgIcon, Avatar, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import User01Icon from '@untitled-ui/icons-react/build/esm/User01'
import Switch from '@mui/material/Switch'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { createTheme } from '@mui/system'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { employeeSelector, openAlertDialogModal } from '@redux/features/employeeSlice'
import { Employee } from 'type/employee'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

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
const PersonalInfo = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const { detail }: any = useAppSelector(employeeSelector)
	const empProfile: Employee = detail as Employee
	const { uuid } = useParams()
	const [selectedFile, setSelectedFile] = useState<any>()
	const [checked, setChecked] = React.useState(true)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}
	const {
		register,
		control,
		watch,
		getValues,
		formState: { errors },
	} = useFormContext()
	const isAddMode = getValues('isAddMode')
	const about = getValues('about')

	useEffect(() => {
		const imageValue: FileList | string = getValues('photo')

		if (typeof imageValue !== 'string' && imageValue instanceof FileList) {
			const imgUrl = imageValue && imageValue.length > 0 && URL?.createObjectURL(imageValue[0])
			setSelectedFile(imgUrl)
		} else {
			// setSelectedFile(imageValue)
			setSelectedFile(detail?.photo)
		}

		return () => {}
	}, [watch('photo')])

	const gender = [
		{ value: 'male', label: 'Male' },
		{ value: 'female', label: 'Female' },
		{ value: 'other', label: 'Other' },
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
				<Stack
					sx={{
						pl: 1,
					}}
					spacing={1}
				>
					<Typography variant="h6">
						{t(tokens.employee.create_employee.form.personal_info.title)}
					</Typography>
				</Stack>
			</Grid>
			<Grid
				xs={12}
				md={9}
				sx={{ pr: 4 }}
			>
				<Stack
					alignItems="center"
					direction="row"
					spacing={2}
				>
					<Box
						sx={{
							borderColor: 'neutral.300',
							borderRadius: '50%',
							borderStyle: 'dashed',
							borderWidth: 1,
							p: '4px',
						}}
					>
						<Box
							sx={{
								borderRadius: '50%',
								height: '100%',
								width: '100%',
								position: 'relative',
							}}
						>
							<Avatar
								sx={{
									height: 60,
									width: 60,
								}}
								src={selectedFile} // Display the selected file as the Avatar image
							></Avatar>
						</Box>
					</Box>
					<input
						{...register('photo')}
						id="photo"
						name="photo"
						hidden
						type="file"
						accept="image/*"
					/>
					<label htmlFor="photo">
						<label htmlFor="photo">
							<Typography
								sx={{
									background: theme.palette.background.default,
									color: 'transparent',
									WebkitBackgroundClip: 'text',
									display: 'flex',
									alignItems: 'center',
									ml: 1,
									fontSize: 16,
									cursor: 'pointer',
									fontWeight: 600,
									// Other styles for the button as needed
								}}
							>
								{t(tokens.employee.create_employee.form.personal_info.pic_change)}
							</Typography>
						</label>
					</label>
				</Stack>
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
									{...register('first_name', { required: 'First name is required' })}
									error={!!errors.first_name}
									helperText={errors.first_name ? (errors.first_name.message as string) : ''}
									fullWidth
									label="First Name"
									InputLabelProps={{
										shrink: Boolean(getValues('first_name')) || isAddMode,
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
									{...register('last_name', { required: 'Last name is required' })}
									error={!!errors.last_name}
									helperText={errors.last_name ? (errors.last_name.message as string) : ''}
									fullWidth
									label="Last Name"
									InputLabelProps={{
										shrink: Boolean(getValues('last_name')) || isAddMode,
									}}
								/>
							</Grid>

							{/* CNIC */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('cnic')}
									error={!!errors.cnic}
									helperText={errors.cnic ? (errors.cnic.message as string) : ''}
									fullWidth
									label="CNIC / Passport"
									InputLabelProps={{
										shrink: Boolean(getValues('cnic')) || isAddMode,
									}}
								/>
							</Grid>

							{/* dob */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="dob"
									rules={{ required: 'Date of birth is required' }}
									control={control}
									render={({ field }) => (
										<DatePicker
											label="Date of Birth"
											{...field}
											sx={{ width: '100%' }}
										/>
									)}
								/>
								{errors.dob ? (
									<span style={{ color: 'red', fontSize: '13px', fontWeight: '500' }}>
										{errors.dob.message as string}
									</span>
								) : (
									''
								)}
							</Grid>

							{/* gender */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="gender"
									control={control}
									render={({ field }) => (
										<TextField
											sx={{ height: '55px' }}
											{...field}
											fullWidth
											label="Select Gender"
											select
										>
											{gender.map((option) => (
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

							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								{/* <TextField
									{...register('about')}
									fullWidth
									label="About"
									InputLabelProps={{
										shrink: Boolean(getValues('about')) || isAddMode,
									}}
									// error={!!errors.about}
									// helperText={errors.about ? (errors.about.message as string) : ''}
								/> */}

								<TextField
									{...register('about')}
									error={!!errors.street_address}
									fullWidth
									label={t(tokens.employee.create_employee.form.personal_info.about.label)}
									placeholder={t(
										tokens.employee.create_employee.form.personal_info.about.place_holder,
									)}
									InputLabelProps={{
										shrink: Boolean(getValues('about')) || isAddMode,
									}}
									// type='text'
									autoComplete="off"
								/>
							</Grid>

							{/* Top level ceo */}

							{uuid && (
								<Grid
									item
									xs={12}
									md={6}
								>
									<Typography variant="subtitle1">Enable CEO</Typography>
									<Controller
										name="is_top_level"
										control={control}
										render={({ field: { onChange, value, name, ref } }) => (
											<div>
												<Switch
													onChange={(e) => {
														const isChecked = e.target.checked
														onChange(isChecked ? 1 : 0)
													}}
													checked={value === 1}
													name={name}
													inputProps={{ 'aria-label': 'controlled' }}
												/>
											</div>
										)}
									/>
									{empProfile.is_top_level === 1 ? (
										<Typography>Employee hold the CEO&apos;s supermacy.</Typography>
									) : (
										// Else part
										<Typography>Click the switch to transfer the CEO&apos;s supermacy.</Typography>
									)}
								</Grid>
							)}
						</Grid>
					</Stack>
				</Grid>
			</Grid>
		</Grid>
	)
}
export default PersonalInfo
