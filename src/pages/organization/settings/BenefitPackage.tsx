import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FieldValues, FormProvider } from 'react-hook-form'

// mui imports

import InputList from '@components/InputList'

// mui imports
import { Typography, CardContent, Grid, Card } from '@mui/material'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

import { InputListValues, StatusSetting } from 'type/config'
import { benefitPackageListRequest, benefitPackageModifyRequest } from '@service/settings'
import { SHOW_ERROR, SHOW_INFO, SHOW_SUCCESS } from '@utils/ToastMessage'
import { formateErrors } from '@utils/errorHandler'
import { makeDynamicFields } from '@utils/factory'
import { checkPoint, isEmpty } from '@utils/bug'

const initialState: StatusSetting = { error: null, status: 'IDLE' }

const BenefitPackage = () => {
	const [setting, setSetting] = useState<StatusSetting>(initialState)
	const formHook = useForm<InputListValues>()

	const {
		formState: { isDirty, dirtyFields },
	} = formHook
	const { header, form, add_text } = tokens.settings.benefit_package
	const { t } = useTranslation()

	const handleList = () => {
		benefitPackageListRequest()
			.then(({ data: { benefit } }) => {
				if (benefit.length === 0) {
					formHook.reset({ fields: [{ name: '', details: '' }] })
					setSetting({ ...initialState })
					return
				}
				const pData = makeDynamicFields({
					rawData: benefit,
					pick: ['name', 'details'],
					majorKey: 'fields',
					path: 'benefit',
				}) as unknown as InputListValues
				formHook.reset(pData)
				// console.log(pData);
				setSetting({ ...initialState })
			})
			.catch(() => {
				setSetting({ ...setting, status: 'FAIL' })
			})
	}
	const onSubmit: SubmitHandler<FieldValues> = async (fromData) => {
		// Access the array of objects from the form data
		if (!isDirty && isEmpty(dirtyFields)) {
			SHOW_INFO({ msg: 'There is nothing to submit' })
			return
		}
		try {
			setSetting({ ...setting, status: 'LOADING' })
			checkPoint('loading ')
			const { data } = await benefitPackageModifyRequest(fromData.fields)
			if (data) {
				console.log('after submission : ', data)
				handleList()
				SHOW_SUCCESS({})
			}
			setSetting({ ...initialState })
		} catch (error: any) {
			const formErrors = formateErrors(error)
			// formik.setErrors(formErrors);
			setSetting({ ...setting, status: 'FAIL' })
			SHOW_ERROR({ msg: 'An error occurred while submitting Benefit Packages ' })
		}
	}

	useEffect(() => {
		setSetting({ ...setting, status: 'LOADING' })
		handleList()
		return () => {}
	}, [])

	//   if (setting.status === 'LOADING') {
	//     return <h3>Loading </h3>;
	//   }

	return (
		<FormProvider {...formHook}>
			<form onSubmit={formHook.handleSubmit(onSubmit)}>
				<Card
					sx={{
						boxShadow: 'none !important',
						border: '1px solid #EAECF0',
						padding: '20px',
					}}
				>
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
								{t(header.benefit_package)}
							</Typography>
						</Grid>
						<InputList
							status={setting.status}
							IntForm={[form.benefit_package_field, form.benefit_package_value, add_text]}
							isBottom
						/>
					</Grid>
				</Card>
			</form>
		</FormProvider>
	)
}
export default BenefitPackage
