import { z } from 'zod'
import { useForm } from 'react-hook-form'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { Box, Button, Stack, SvgIcon, TextField, Typography } from '@mui/material'
import { createTheme } from '@mui/system'
import { Seo } from '@components/seo'
import { forgotPasswordRequest } from '@service/auth'
import { useNavigate } from 'react-router-dom'
import { storage } from '@utils/storage'
import { useEffect, useState } from 'react'
import { AuthSetting } from 'type/auth'
import Loading from '@components/Loading'
import { formateErrors } from '@utils/errorHandler'
import { SHOW_AUTH_ERROR } from '@utils/AuthHelpers'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { zodResolver } from '@hookform/resolvers/zod'
import { t } from 'i18next'
import { SHOW_ERROR, SHOW_INFO } from '@utils/ToastMessage'

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

interface Values {
	email: string
}

const initialValues: Values = {
	email: '',
}
const forgetPasswordSchema = z.object({
	email: z
		.string()
		.min(1, t(tokens.authentication.login.form.email.required))
		.email(t(tokens.authentication.login.form.email.invalid)),
})

const Page = () => {
	const { t } = useTranslation()

	const [setting, setSetting] = useState<AuthSetting>({ error: null, status: 'IDLE' })
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Values>({
		resolver: zodResolver(forgetPasswordSchema),
		defaultValues: initialValues, // Utilize initialValues here
	})

	const onSubmit = async (data: Values) => {
		setSetting({ ...setting, status: 'LOADING' })
		try {
			const { data: responseData } = await forgotPasswordRequest(data)
			if (responseData) {
				storage.set('RESET_EMAIL', data.email)
				setSetting({ error: null, status: 'IDLE' })
				navigate('/auth/verify-code', { replace: true })
				SHOW_INFO({ msg: 'Verification code is sent! Please check your email.' })
			}
		} catch (error: any) {
			SHOW_ERROR({ state: error?.response?.data?.error, msg: error?.response?.data?.error })
			setSetting({ ...setting, status: 'FAIL' })
		}
	}

	return (
		<>
			<Seo title={t(tokens.seo_titles.auth.forget_password)} />
			<Stack>
				<Stack
					sx={{ mb: 4 }}
					spacing={1}
				>
					<Typography variant="h5">
						{t(tokens.authentication.forget_password.header.heading)}
					</Typography>
					<Typography
						color="text.secondary"
						variant="body2"
					>
						{t(tokens.authentication.forget_password.header.sub_heading)}
					</Typography>
				</Stack>
				<form
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						autoFocus
						error={!!errors.email}
						fullWidth
						helperText={errors.email ? errors.email.message : ''}
						label={t(tokens.authentication.forget_password.form.email.label)}
						placeholder={t(tokens.authentication.forget_password.form.email.place_holder)}
						type="email"
						{...register('email')}
					/>
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
							t(tokens.authentication.forget_password.form.reset_button.text)
						)}
					</Button>

					<Box
						sx={{
							mt: 1,
							mb: 4,
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Typography
							color="text.primary"
							onClick={() => navigate('/auth/login', { replace: true })}
							sx={{
								alignItems: 'center',
								display: 'inline-flex',
								cursor: 'pointer',
							}}
						>
							<SvgIcon sx={{ mr: '2px', p: '2px' }}>
								<ArrowLeftIcon />
							</SvgIcon>
							<Typography variant="subtitle2">
								{t(tokens.authentication.forget_password.form.back_to_login.back_text)}
							</Typography>
						</Typography>
					</Box>
				</form>
			</Stack>
		</>
	)
}

export default Page
