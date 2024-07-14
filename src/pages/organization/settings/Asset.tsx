import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, FieldValues, FormProvider } from 'react-hook-form'

// mui imports
import { Typography, CardContent, Grid, Card } from '@mui/material'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import InputList from '@components/InputList'
import { InputListValues, StatusSetting } from 'type/config'
import { assetListRequest, assetModifyRequest } from '@service/settings'

import { SHOW_ERROR, SHOW_INFO, SHOW_SUCCESS } from '@utils/ToastMessage'
import { formateErrors } from '@utils/errorHandler'
import { makeDynamicFields } from '@utils/factory'
import { isEmpty } from '@utils/bug'

const initialState: StatusSetting = { error: null, status: 'IDLE' }

const Asset = () => {
	const [setting, setSetting] = useState<StatusSetting>(initialState)
	const formHook = useForm<InputListValues>({})

	const { header, form, add_text } = tokens.settings.asset
	const { t } = useTranslation()

	const handleList = () => {
		assetListRequest()
			.then(({ data: { asset_categories } }) => {
				if (asset_categories.length === 0) {
					formHook.reset({ fields: [{ name: '', details: '' }] })
					setSetting({ ...initialState })
					return
				}

				const pData = makeDynamicFields({
					rawData: asset_categories,
					pick: ['name', 'details'],
					majorKey: 'fields',
					path: 'asset_category',
				}) as unknown as InputListValues

				// console.log('pData : ', pData)

				formHook.reset(pData)

				setSetting({ ...initialState })
			})
			.catch((error) => {
				console.error('E:ASSET Fail --- ', error)
				setSetting({ ...setting, status: 'FAIL' })
			})
	}

	const {
		formState: { isDirty, dirtyFields },
	} = formHook
	const onSubmit: SubmitHandler<FieldValues> = async (fromData) => {
		// Access the array of objects from the form data
		if (!isDirty && isEmpty(dirtyFields)) {
			SHOW_INFO({ msg: 'There is nothing to submit' })
			return
		}
		try {
			setSetting({ ...setting, status: 'LOADING' })
			const { data } = await assetModifyRequest(fromData.fields)
			if (data) {
				handleList()
				console.log('after submission : ', data)

				SHOW_SUCCESS({})
			}
		} catch (error: any) {
			const formErrors = formateErrors(error)
			// formik.setErrors(formErrors);
			setSetting({ ...setting, status: 'FAIL' })
			SHOW_ERROR({ msg: 'An error occurred while submitting Categories ' })
		}
	}

	useEffect(() => {
		setSetting({ ...setting, status: 'LOADING' })
		handleList()
		return () => {}
	}, [])

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
								{t(header.asset_category)}
							</Typography>
						</Grid>
						<InputList
							status={setting.status}
							IntForm={[form.asset_field, form.asset_value, add_text]}
							isBottom
						/>
					</Grid>
				</Card>
			</form>
		</FormProvider>
	)
}
export default Asset
