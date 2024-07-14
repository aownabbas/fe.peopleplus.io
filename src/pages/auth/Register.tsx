import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

// mui imports
import { Button, Stack, TextField, Typography, IconButton, Box } from '@mui/material'
import { createTheme } from '@mui/system'
import Visibility from '@untitled-ui/icons-react/build/esm/Eye'
import VisibilityOff from '@untitled-ui/icons-react/build/esm/EyeOff'

// local components
import { Seo } from '@components/seo'
import Loading from '@components/Loading'
import { registerRequest } from '@service/auth'
import type { AuthSetting, Register } from 'type/auth'
import { formateErrors } from '@utils/errorHandler'
import { SHOW_ERROR } from '@utils/ToastMessage'
import { useAppDispatch } from '@redux/hooks'
import { signUp } from '@redux/features/authSlice'

// internationalization
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const registrationSchema = z
	.object({
		first_name: z.string().min(1, t(tokens.authentication.register.form.first_name.required)),
		last_name: z.string().min(1, t(tokens.authentication.register.form.last_name.required)),
		organization_name: z
			.string()
			.min(1, t(tokens.authentication.register.form.organization_name.required)),
		email: z
			.string()
			.email(t(tokens.authentication.register.form.email.invalid))
			.min(1, t(tokens.authentication.register.form.email.required)),
		password: z.string().min(8, t(tokens.authentication.register.form.password.length)),
		confirm_password: z
			.string()
			.min(1, t(tokens.authentication.register.form.confirm_password.required)),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: t(tokens.authentication.register.form.confirm_password.match),
		path: ['confirm_password'],
	})

const initialState: AuthSetting = { error: null, status: 'IDLE' }
const Page = () => {
	const { t } = useTranslation()

	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault()
	}

	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const handleClickShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}

	const handleMouseDownConfirmPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault()
	}

	const [setting, setSetting] = useState<AuthSetting>({ error: null, status: 'IDLE' })
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<Register>({
		resolver: zodResolver(registrationSchema),
	})
	const dispatch = useAppDispatch()
	const onSubmit = async (formData: Register) => {
		setSetting({ ...setting, status: 'LOADING' })
		try {
			const { data } = await registerRequest(formData)
			if (data) {
				dispatch(
					signUp({
						data: data.data,
						success: true,
						code: 200,
					}),
				)
				setSetting({ ...initialState })

				navigate('/', { replace: true })
			}
		} catch (error) {
			const errors = formateErrors(error as unknown as AxiosError)

			// console.log('raw ', error)
			console.log('format', errors)

			Object.keys(errors).forEach((key) => {
				setError(key as keyof Register, { message: errors[key][0] })
				// SHOW_ERROR({ state: key === 'email', msg: errors[key][0] })
				SHOW_ERROR({ state: key === '_error', msg: errors[key][0] })
			})
			setSetting({ ...setting, status: 'FAIL' })
		}
	}

	return (
		<>
			<Seo title={t(tokens.seo_titles.auth.register)} />
			<Stack>
				<Stack
					sx={{ mb: 4 }}
					spacing={1}
				>
					<Typography variant="h5">{t(tokens.authentication.register.header.heading)}</Typography>
					<Typography
						color="text.secondary"
						variant="body2"
					>
						{t(tokens.authentication.register.header.sub_heading)}
					</Typography>
				</Stack>
				<form
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					<Stack spacing={3}>
						<TextField
							error={!!errors.first_name}
							fullWidth
							helperText={errors.first_name?.message}
							label={t(tokens.authentication.register.form.first_name.label)}
							placeholder={t(tokens.authentication.register.form.first_name.place_holder)}
							{...register('first_name')}
						/>

						<TextField
							error={!!errors.last_name}
							fullWidth
							helperText={errors.last_name?.message}
							label={t(tokens.authentication.register.form.last_name.label)}
							placeholder={t(tokens.authentication.register.form.last_name.place_holder)}
							{...register('last_name')}
						/>

						<TextField
							error={!!errors.organization_name}
							fullWidth
							helperText={errors.organization_name?.message}
							label={t(tokens.authentication.register.form.organization_name.label)}
							placeholder={t(tokens.authentication.register.form.organization_name.place_holder)}
							{...register('organization_name')}
						/>

						<TextField
							error={!!errors.email}
							fullWidth
							helperText={errors.email?.message}
							label={t(tokens.authentication.register.form.email.label)}
							placeholder={t(tokens.authentication.register.form.email.place_holder)}
							type="email"
							{...register('email')}
						/>

						{/* <TextField
							error={!!errors.password}
							fullWidth
							helperText={errors.password?.message}
							label={t(tokens.authentication.register.form.password.label)}
							placeholder={t(tokens.authentication.register.form.password.place_holder)}
							type="password"
							{...register('password', { required: 'Password is required' })}
						/> */}

						{/* <TextField
							error={!!errors.password}
							fullWidth
							helperText={errors.password?.message}
							label={t(tokens.authentication.register.form.password.label)}
							placeholder={t(tokens.authentication.register.form.password.place_holder)}
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							{...register('password')}
						/>
						<TextField
							error={!!errors.confirm_password}
							fullWidth
							helperText={errors.confirm_password?.message}
							label={t(tokens.authentication.register.form.confirm_password.label)}
							placeholder={t(tokens.authentication.register.form.confirm_password.place_holder)}
							type={showConfirmPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle confirm password visibility"
											onClick={handleClickShowConfirmPassword}
											onMouseDown={handleMouseDownConfirmPassword}
											edge="end"
										>
											{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							{...register('confirm_password')}
						/> */}

						<Box position="relative">
							<TextField
								error={!!errors.password}
								fullWidth
								helperText={errors.password?.message}
								label={t(tokens.authentication.register.form.password.label)}
								placeholder={t(tokens.authentication.register.form.password.place_holder)}
								type={showPassword ? 'text' : 'password'}
								{...register('password')}
							/>
							<IconButton
								sx={{
									position: 'absolute',
									right: 0,
									top: '50%',
									transform: 'translateY(-50%)',
									backgroundColor: 'transparent',
								}}
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</Box>

						<Box position="relative">
							<TextField
								error={!!errors.confirm_password}
								fullWidth
								helperText={errors.confirm_password?.message}
								label={t(tokens.authentication.register.form.confirm_password.label)}
								placeholder={t(tokens.authentication.register.form.confirm_password.place_holder)}
								type={showConfirmPassword ? 'text' : 'password'}
								{...register('confirm_password')}
							/>
							<IconButton
								sx={{
									position: 'absolute',
									right: 0,
									top: '50%',
									transform: 'translateY(-50%)',
									backgroundColor: 'transparent',
								}}
								aria-label="toggle confirm password visibility"
								onClick={handleClickShowConfirmPassword}
								onMouseDown={handleMouseDownConfirmPassword}
							>
								{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</Box>
					</Stack>

					<Button
						disabled={setting.status === 'LOADING'}
						fullWidth
						size="large"
						sx={{ mt: 2, background: theme.palette.background.default }}
						type="submit"
						variant="contained"
					>
						{setting.status === 'LOADING' ? (
							<Loading />
						) : (
							t(tokens.authentication.register.form.register_button.text)
						)}
					</Button>
					<Typography
						color="text.secondary"
						variant="body2"
						sx={{ mt: 2 }}
					>
						{t(tokens.authentication.register.form.have_account.account_text)} &nbsp;
						<span
							style={{
								background: theme.palette.background.default,
								color: 'transparent',
								WebkitBackgroundClip: 'text',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/auth/login')}
						>
							{t(tokens.authentication.register.form.have_account.log_in_text)}
						</span>
					</Typography>
				</form>
			</Stack>
		</>
	)
}

export default Page
