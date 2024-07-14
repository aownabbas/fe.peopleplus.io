/* eslint-disable prettier/prettier */
import { Controller, useFormContext } from 'react-hook-form'

// mui imports
import {
	Box,
	Typography,
	Stack,
	Grid,
	TextField,
	FormControl,
	InputLabel,
	FormHelperText,
} from '@mui/material'
import User01Icon from '@untitled-ui/icons-react/build/esm/User01'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { useEffect, useState } from 'react'
import { createTheme } from '@mui/system'

// ckeditor imports
import { MainEditor } from '@components/CKEditor' // Adjust the import path according to your project structure
import PhoneNumberInput from '@components/PhoneNumberInput' // Adjust the import path according to your project structure

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

const CompanyInfo = ({ onSubmit }: any) => {
	const [company_logo, setCompany_logo] = useState<any>(null)

	const { headers, form } = tokens.settings.general
	const { t } = useTranslation()
	const {
		register,
		formState: { errors },
		getValues,
		watch,
		control,
		handleSubmit,
	} = useFormContext()
	const isAddMode = getValues('isAddMode')

	useEffect(() => {
		const imageValue = getValues('company_logo')

		if (typeof imageValue !== 'string' && imageValue instanceof FileList) {
			const imgUrl: any = imageValue && imageValue.length > 0 && URL.createObjectURL(imageValue[0])
			setCompany_logo(imgUrl)
		} else {
			setCompany_logo(imageValue)
		}

		return () => {}
	}, [watch('company_logo')])

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
						{t(headers.company_info)}
					</Typography>
				</Grid>
				<Grid
					xs={12}
					md={9}
				>
					<Stack spacing={3}>
						<Grid container>
							{/* company_logo */}
							<Grid xs={12}>
								<Stack
									alignItems="center"
									direction="row"
									spacing={2}
									sx={{
										mb: 2,
										px: 1,
									}}
								>
									<Box
										sx={{
											borderColor: 'neutral.300',
											borderRadius: 1,
											borderStyle: 'dashed',
											borderWidth: 1,
											p: '4px',
											width: '160px',
											height: '60px',
											'@media (min-width: 600px)': {
												width: '200px',
												height: '80px',
											},
										}}
									>
										<Box
											sx={{
												borderRadius: '10px',
												height: '50px',
												width: '140px',
												position: 'relative',
												'@media (min-width: 600px)': {
													height: '70px',
													width: '188px',
												},
											}}
										>
											<img
												src={company_logo}
												style={{
													width: '100%',
													height: '100%',
													borderRadius: 1,
													objectFit: 'contain',
												}}
												alt="Company Logo"
											/>
										</Box>
									</Box>
									<input
										{...register('company_logo')}
										id="company_logo"
										name="company_logo"
										hidden
										type="file"
										accept="image/*"
									/>
									<label htmlFor="company_logo">
										<Typography
											sx={{
												background: theme.palette.background.default,
												color: 'transparent',
												WebkitBackgroundClip: 'text',
												display: 'flex',
												alignItems: 'center',
												ml: 1,
												fontSize: 16,
												fontWeight: 600,
												cursor: 'pointer',
											}}
										>
											Change Logo
										</Typography>
									</label>
								</Stack>
							</Grid>
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('first_name')}
									name="first_name"
									fullWidth
									label={t(form.first_name.name)}
									error={!!errors.first_name}
									helperText={errors.first_name?.message && t(form.first_name.helperText)}
									placeholder={t(form.first_name.placeHolder)}
									type="text"
									sx={{ flexGrow: 1 }}
									InputLabelProps={{
										shrink: Boolean(getValues('first_name')) || isAddMode,
									}}
								/>
							</Grid>
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('last_name')}
									fullWidth
									name="last_name"
									label={t(form.last_name.name)}
									error={!!errors.last_name}
									helperText={errors.last_name?.message && t(form.company_name.helperText)}
									placeholder={t(form.last_name.placeHolder)}
									sx={{ flexGrow: 1 }}
									type="text"
									InputLabelProps={{
										shrink: Boolean(getValues('last_name')) || isAddMode,
									}}
								/>
							</Grid>

							{/* company_name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('company_name')}
									fullWidth
									name="company_name"
									label={t(form.company_name.name)}
									error={!!errors.company_name}
									helperText={errors.company_name?.message && t(form.company_name.helperText)}
									placeholder={t(form.company_name.placeHolder)}
									sx={{ flexGrow: 1 }}
									type="text"
									InputLabelProps={{
										shrink: Boolean(getValues('company_name')) || isAddMode,
									}}
								/>
							</Grid>

							{/* website */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('website')}
									label={t(form.website.name)}
									error={!!errors.website}
									helperText={errors.website?.message && t(form.website.helperText)}
									fullWidth
									type="text"
									InputLabelProps={{
										shrink: Boolean(getValues('website')) || isAddMode,
									}}
								/>
							</Grid>

							{/*email */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('email')}
									fullWidth
									label={t(form.email.name)}
									error={!!errors.email}
									helperText={errors.email?.message && t(form.email.helperText)}
									type="email"
									sx={{
										flexGrow: 1,
										'& .MuiOutlinedInput-notchedOutline': {
											borderStyle: 'dashed',
										},
									}}
									disabled
									required
									InputLabelProps={{
										shrink: Boolean(getValues('email')) || isAddMode,
									}}
								/>
							</Grid>

							{/*phone */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								{/* <TextField
									{...register('phone')}
									fullWidth
									name="phone"
									onChange={(e) => {
										const validInput = e.target.value.replace(/[^0-9+]/gi, '')
										e.target.value = validInput // Directly manipulate the input's value
									}}
									error={!!errors.phone}
									helperText={errors.phone?.message && t(form.phone_number.helperText)}
									label={t(form.phone_number.name)}
									placeholder={t(form.phone_number.placeHolder)}
									type="tel"
									// sx={{ flexGrow: 1 }}
									InputLabelProps={{
										shrink: Boolean(getValues('phone')) || isAddMode,
									}}
								/> */}

								<PhoneNumberInput
									control={control}
									name="phone"
									errors={errors}
									isAddMode={isAddMode}
									placeholder="Enter Your Phone Number"
								/>
							</Grid>

							{/* description */}
							<Grid
								xs={12}
								md={12}
								sx={{ p: 1 }}
							>
								<InputLabel
									sx={{
										fontWeight: 500,
										fontSize: '12px',
										color: '#6C737F',
										pb: 1,
									}}
								>
									{t(form.company_description.name)}
								</InputLabel>
								<MainEditor
									placeholder={t(form.company_description.placeHolder)}
									name="description"
								/>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			</Grid>
		</>
	)
}

export default CompanyInfo
