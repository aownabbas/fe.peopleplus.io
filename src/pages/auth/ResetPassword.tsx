import { useForm } from 'react-hook-form'
import { z } from 'zod'

// mui imports
import { createTheme } from '@mui/system'
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Stack,
	SvgIcon,
	TextField,
	Typography,
} from '@mui/material'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'

// local imports
import { Seo } from '@components/seo'
import { AuthSetting, ResetPassword } from 'type/auth'
import { storage } from '@utils/storage'
import { resetPasswordRequest } from '@service/auth'
import { useNavigate } from 'react-router-dom'
import Loading from '@components/Loading'
import { useEffect, useState } from 'react'
import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'
import { formateErrors } from '@utils/errorHandler'
import { SHOW_AUTH_ERROR } from '@utils/AuthHelpers'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import Visibility from '@untitled-ui/icons-react/build/esm/Eye'
import VisibilityOff from '@untitled-ui/icons-react/build/esm/EyeOff'
import { t } from 'i18next'

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

const initialState: AuthSetting = { error: null, status: 'IDLE' }
const passwordSchema = z
	.object({
		password: z.string().min(8, t(tokens.authentication.reset_password.form.password.length)),
		password_confirmation: z
			.string()
			.min(8, t(tokens.authentication.reset_password.form.confirm_password.required)),
	})
	.refine(
		(data) => {
			console.log('data : ', data)
			return data.password === data.password_confirmation
		},
		{
			message: t(tokens.authentication.reset_password.form.confirm_password.match),
			path: ['password_confirmation'],
		},
	)

const Page = () => {
	const { t } = useTranslation()

	const [setting, setSetting] = useState<AuthSetting>(initialState)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPassword>({
		resolver: zodResolver(passwordSchema),
	})

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const onSubmit = async (passwords: ResetPassword): Promise<void> => {
		setSetting({ ...setting, status: 'LOADING' })

		try {
			const email = storage.get('RESET_EMAIL')
			const code = storage.get('RESET_CODE')
			if (!email && !code) {
				SHOW_ERROR({ msg: 'Unauthorized Access:Can not reset Password' })
				setSetting({ ...setting, status: 'FAIL' })
				navigate('/auth/login', { replace: true })
				return
			}

			const { data } = await resetPasswordRequest({
				...passwords,
				email: email,
				code: code,
			} as ResetPassword)
			if (data) {
				setSetting({ ...initialState })
				SHOW_SUCCESS({ msg: data?.message })
				navigate('/auth/login', { replace: true })
				storage.remove('RESET_EMAIL')
			}
		} catch (error: any) {
			SHOW_ERROR({ state: error?.response?.data?.error, msg: error?.response?.data?.error })
			setSetting({ ...setting, status: 'FAIL' })
		}
	}

	useEffect(() => {
		const email = storage.get('RESET_EMAIL')
		const code = storage.get('RESET_CODE')
		if (!email && !code) {
			navigate('/auth/login', { replace: true })
		}

		return () => {
			storage.remove('RESET_EMAIL')
			storage.remove('RESET_CODE')
		}
	}, [])

	console.log('errors : ', errors)

	return (
		<>
			<Seo title={t(tokens.seo_titles.auth.reset_password)} />
			<Stack>
				<Stack
					sx={{ mb: 4 }}
					spacing={1}
				>
					<Typography variant="h5">
						{t(tokens.authentication.reset_password.header.heading)}
					</Typography>
					<Typography
						color="text.secondary"
						variant="body2"
					>
						{t(tokens.authentication.reset_password.header.sub_heading)}
					</Typography>
				</Stack>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack spacing={3}>
						<Box position="relative">
							<TextField
								{...register('password')}
								error={!!errors.password}
								fullWidth
								helperText={errors.password && errors.password.message}
								label={t(tokens.authentication.reset_password.form.password.label)}
								placeholder={t(tokens.authentication.reset_password.form.password.place_holder)}
								type={showPassword ? 'text' : 'password'}
							/>
							<IconButton
								sx={{
									position: 'absolute',
									right: 0,
									top: '15%',
									backgroundColor: 'transparent',
								}}
								type="button"
								aria-label="toggle password visibility"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</Box>

						<Box position="relative">
							<TextField
								error={!!errors.password_confirmation}
								fullWidth
								helperText={errors.password_confirmation && errors.password_confirmation.message}
								label={t(tokens.authentication.reset_password.form.confirm_password.label)}
								placeholder={t(
									tokens.authentication.reset_password.form.confirm_password.place_holder,
								)}
								{...register('password_confirmation')}
								type={showConfirmPassword ? 'text' : 'password'}
							/>
							<IconButton
								sx={{
									position: 'absolute',
									right: 0,
									top: '15%',
									backgroundColor: 'transparent',
								}}
								type="button"
								aria-label="toggle confirm password visibility"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
							t(tokens.authentication.reset_password.form.reset_password_button.text)
						)}
					</Button>
					<Box
						sx={{
							mt: 1,
							mb: 4,
							display: 'flex',
							justifyContent: 'center', // Center the content horizontally
						}}
					>
						<Typography
							color="text.primary"
							onClick={() => navigate('/auth/login', { replace: true })}
							sx={{
								alignItems: 'center',
								display: 'inline-flex',
							}}
						>
							<SvgIcon sx={{ mr: '2px', p: '2px' }}>
								<ArrowLeftIcon />
							</SvgIcon>
							<Typography
								variant="subtitle2"
								sx={{ cursor: 'pointer' }}
							>
								{t(tokens.authentication.reset_password.form.back_to_login.back_text)}
							</Typography>
						</Typography>
					</Box>
				</form>
			</Stack>
		</>
	)
}
export default Page
