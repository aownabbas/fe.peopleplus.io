import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'

// mui imports
import { Stack, Card, Button, createTheme, Typography, Box } from '@mui/material'

// Internationalization

// local imports
import { InputListValues } from 'type/config'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { GeneralSettings } from 'type/settings'
import { authUserSelector, generalFormAction } from '@redux/features/authSlice'
import { AuthState } from 'type/auth'
import CompanyInfo from '@sections/organization/settings/general/CompanyInfo'
import OfficeInfo from '@sections/organization/settings/general/OfficeInfo'

import { SHOW_ERROR, SHOW_SUCCESS } from '@utils/ToastMessage'
import Loading from '@components/Loading'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { GeneralPageLoading } from '@loading/settings'

interface ExtendedGeneralSettings extends GeneralSettings, InputListValues {
	// No need to redeclare properties here, they are inherited from GeneralSettings and InputListValues
}

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

const General = () => {
	const [status, setStatus] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const { user }: AuthState = useAppSelector(authUserSelector)
	const isLoading = useAppSelector(authUserSelector).status
	const {
		common: { save_changes },
	} = tokens
	const { t } = useTranslation()

	const initialValues: GeneralSettings = useMemo(() => {
		if (user.organization) {
			return {
				first_name: user.organization.first_name,
				last_name: user.organization.last_name,
				country_id: user.organization.country as number,
				city: user.organization.city,
				company_logo: user.organization.company_logo,
				company_name: user.organization.organization_name,
				description: user.organization.description,
				office_address: user.organization.address,
				phone: user.organization.phone,
				time_zone: user.organization.time_zone,
				website: user.organization.website,
				zip_code: user.organization.zipcode,
				email: user.email,
			}
		} else {
			// Without knowing your exact data, I'm using an empty string as the default value for company_logo
			// Please replace it with a more appropriate default value
			return {
				first_name: '',
				last_name: '',
				company_logo: '', // or use some default FileList
				country_id: null,
				company_name: '',
				website: '',
				phone: '',
				description: '',
				office_address: '',
				city: '',
				zip_code: '',
				time_zone: '',
				email: user.email,
			}
		}
	}, [user])

	const formHook = useForm<ExtendedGeneralSettings>({
		defaultValues: initialValues,
	})
	const onSubmit: SubmitHandler<ExtendedGeneralSettings> = async (values) => {
		const { company_logo, ...restForm } = values

		const formData = new FormData()
		Object.entries(restForm).forEach(([key, value]) => {
			// Skip any fields that are empty or undefined
			if (value) formData.append(key, value.toString())
		})

		if (company_logo && company_logo instanceof FileList)
			formData.append('company_logo', values.company_logo[0])

		try {
			setStatus(true)
			// @ts-ignore
			const { success } = await dispatch(generalFormAction(formData)).unwrap()
			SHOW_SUCCESS({ state: success, msg: 'Settings Updated Successfully' })
		} catch (error) {
			SHOW_ERROR({ msg: 'An error occurred while submitting Data ' })
		} finally {
			setStatus(false)
		}
	}

	useLayoutEffect(() => {
		formHook.reset(initialValues)
		return () => {}
	}, [user])

	return (
		<>
			{isLoading === 'LOADING' ? (
				<GeneralPageLoading />
			) : (
				<Box>
					<FormProvider {...formHook}>
						<form onSubmit={formHook.handleSubmit(onSubmit)}>
							<Card
								sx={{
									boxShadow: 'none !important',
									border: '1px solid #EAECF0',
									padding: '20px',
								}}
							>
								<Stack spacing={2}>
									{status ? '' : <CompanyInfo />}
									{status ? '' : <OfficeInfo />}
								</Stack>

								<Box sx={{ justifyContent: 'end', display: 'flex', width: '100%' }}>
									<Button
										disabled={status}
										sx={{
											mt: 2,
											background: theme.palette.background.default,
											color: 'white',
										}}
										type="submit"
									>
										{status ? <Loading /> : t(tokens.common.save_changes)}
									</Button>
								</Box>
							</Card>
						</form>
					</FormProvider>
				</Box>
			)}
		</>
	)
}

export default General
