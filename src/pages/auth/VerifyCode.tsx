import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// mui imports
import { MuiOtpInput } from 'mui-one-time-password-input'
import { createTheme } from '@mui/system'
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Stack,
	SvgIcon,
	Typography,
} from '@mui/material'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'

// local imports
import { Seo } from '@components/seo'
import { verifyCodeRequest } from '@service/auth'
import Loading from '@components/Loading'
import { formateErrors } from '@utils/errorHandler'
import { SHOW_AUTH_ERROR } from '@utils/AuthHelpers'
import { storage } from '@utils/storage'

import { t } from 'i18next'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import { SHOW_ERROR, SHOW_INFO, SHOW_SUCCESS } from '@utils/ToastMessage'
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

const schema = z.object({
	code: z.string().length(6, t(tokens.authentication.verify_code.form.length)),
})

const Page = () => {
	const { t } = useTranslation()

	const navigate = useNavigate()
	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			code: '',
		},
	})

	const onSubmit = async (data: { code: string }) => {
		try {
			const { code } = data
			const response = await verifyCodeRequest(code)

			if (response && response.data) {
				storage.set('RESET_CODE', code)
				navigate('/auth/reset-password', { replace: true })
				SHOW_SUCCESS({ state: response?.data?.message, msg: response?.data?.message })
			}
		} catch (error: any) {
			const errors = formateErrors(error as unknown as AxiosError)
			Object.keys(errors).forEach((key) => {
				SHOW_ERROR({ state: key === '_error', msg: errors[key][0] })
			})
		}
	}

	useEffect(() => {
		const email = storage.get('RESET_EMAIL')
		if (!email) {
			navigate('/auth/login', { replace: true })
		}
	}, [])
	return (
		<>
			<Seo title={t(tokens.seo_titles.auth.verify_code)} />
			<Stack>
				<Stack
					sx={{ mb: 4 }}
					spacing={1}
				>
					<Typography variant="h5">
						{t(tokens.authentication.verify_code.header.heading)}
					</Typography>
				</Stack>
				<form
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					<FormControl error={!!errors.code}>
						<FormLabel
							sx={{
								display: 'block',
								mb: 2,
							}}
						>
							{t(tokens.authentication.verify_code.form.title)}
						</FormLabel>
						<Controller
							name="code"
							control={control}
							render={({ field }) => (
								<MuiOtpInput
									{...field}
									length={6}
									sx={{
										'& .MuiFilledInput-input': {
											p: '14px',
										},
									}}
								/>
							)}
						/>
						{errors.code && <FormHelperText>{errors.code.message}</FormHelperText>}
					</FormControl>
					<Button
						disabled={isSubmitting}
						fullWidth
						size="large"
						sx={{ mt: 2, background: theme.palette.background.default }}
						type="submit"
						variant="contained"
					>
						{isSubmitting ? (
							<Loading />
						) : (
							[t(tokens.authentication.verify_code.form.verify_button.text)]
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
							}}
						>
							<SvgIcon sx={{ mr: '2px', p: '2px' }}>
								<ArrowLeftIcon />
							</SvgIcon>
							<Typography
								variant="subtitle2"
								sx={{ cursor: 'pointer' }}
							>
								{t(tokens.authentication.verify_code.form.back_to_login.back_text)}
							</Typography>
						</Typography>
					</Box>
				</form>
			</Stack>
		</>
	)
}

export default Page
