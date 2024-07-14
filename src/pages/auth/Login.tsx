import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// mui
import {
	Box,
	TextField,
	Typography,
	Stack,
	Button,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from '@mui/material'
import { createTheme } from '@mui/system'
import { Seo } from '@components/seo'
import { AuthSetting, Login } from 'type/auth'
import { useAppDispatch } from '@redux/hooks'
import { signIn } from '@redux/features/authSlice'
import { getAuth } from '@utils/AuthHelpers'
import { loginRequest } from '@service/auth'
import Loading from '@components/Loading'
import { storage } from '@utils/storage'
import { formateErrors } from '@utils/errorHandler'
import { SHOW_ERROR } from '@utils/ToastMessage'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import Visibility from '@untitled-ui/icons-react/build/esm/Eye'
import VisibilityOff from '@untitled-ui/icons-react/build/esm/EyeOff'
import { t } from 'i18next'
import { AxiosError } from 'axios'

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

const initialState: AuthSetting = { error: null, status: 'IDLE' }
const loginSchema = z.object({
	email: z
		.string()
		.email(t(tokens.authentication.login.form.email.invalid))
		.min(1, t(tokens.authentication.login.form.email.required)),
	password: z.string().min(8, t(tokens.authentication.login.form.password.length)),
})
const Login = () => {
	const { t } = useTranslation()

	const [setting, setSetting] = useState<AuthSetting>(initialState)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<Login>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit = async (formData: Login) => {
		setSetting({ ...setting, status: 'LOADING' })
		try {
			const { data } = await loginRequest(formData)
			if (data) {
				dispatch(
					signIn({
						data: data.data,
						success: true,
						code: 200,
					}),
				)
				setSetting({ ...initialState })
				navigate('/', { replace: true })
			}
		} catch (error: any) {
			SHOW_ERROR({ state: error?.response?.data?.error, msg: error?.response?.data?.error })
			setSetting({ ...setting, status: 'FAIL' })
		}
	}
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
		event.preventDefault()
	}

	useEffect(() => {
		storage.remove('RESET_EMAIL')
		if (getAuth()?.access_token) {
			navigate(location.state ? location.state.from : '/', {
				replace: true,
			})
		}

		return () => {}
	}, [])

	return (
		<>
			<Seo title={t(tokens.seo_titles.auth.login)} />
			<Stack>
				<Stack
					sx={{ mb: 4 }}
					spacing={1}
				>
					<Typography variant="h5">{t(tokens.authentication.login.header.heading)}</Typography>
					<Typography
						color="text.secondary"
						variant="body2"
					>
						{t(tokens.authentication.login.header.sub_heading)}
					</Typography>
				</Stack>
				<form
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					<Stack spacing={3}>
						<TextField
							autoFocus
							fullWidth
							label={t(tokens.authentication.login.form.email.label)}
							placeholder={t(tokens.authentication.login.form.email.place_holder)}
							type="email"
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
						{/* <TextField
							fullWidth
							label={t(tokens.authentication.login.form.password.label)}
							placeholder={t(tokens.authentication.login.form.password.place_holder)}
							{...register('password')}
							error={!!errors.password}
							helperText={errors.password?.message}
							type={showPassword ? 'text' : 'password'}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											sx={{
												backgroundColor: 'transparent',
											}}
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
						/> */}
						<Box position="relative">
							<TextField
								fullWidth
								label={t(tokens.authentication.login.form.password.label)}
								placeholder={t(tokens.authentication.login.form.password.place_holder)}
								{...register('password')}
								error={!!errors.password}
								helperText={errors.password?.message}
								type={showPassword ? 'text' : 'password'}
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
					</Stack>

					<Box sx={{ mt: 2 }}>
						<Typography
							sx={{
								background: theme.palette.background.default,
								color: 'transparent',
								WebkitBackgroundClip: 'text',
							}}
							variant="subtitle2"
						>
							<Link
								to="/auth/forgot"
								style={{
									textDecoration: 'none',
									fontWeight: 500,
									color: 'transparent',
									WebkitBackgroundClip: 'text',
									cursor: 'pointer',
								}}
							>
								{t(tokens.authentication.login.form.forget_password.text)}
							</Link>{' '}
						</Typography>
					</Box>
					<Button
						disabled={isSubmitting}
						fullWidth
						size="large"
						type="submit"
						sx={{ mt: 2, background: theme.palette.background.default }}
						variant="contained"
					>
						{isSubmitting ? <Loading /> : t(tokens.authentication.login.form.login_button.text)}
					</Button>

					<Typography
						color="text.secondary"
						variant="body2"
						sx={{ mt: 2 }}
					>
						{t(tokens.authentication.login.form.dont_have_account.account_text)} &nbsp;
						<span
							style={{
								background: theme.palette.background.default,
								color: 'transparent',
								WebkitBackgroundClip: 'text',
								cursor: 'pointer',
							}}
							onClick={() => navigate('/auth/register')}
						>
							{t(tokens.authentication.login.form.dont_have_account.register_text)}
						</span>
					</Typography>
				</form>
			</Stack>
		</>
	)
}

export default Login
