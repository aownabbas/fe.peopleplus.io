import { useEffect, useState } from 'react'
import { SubmitHandler, FieldValues, FormProvider, useForm } from 'react-hook-form'
import InputList from '@components/InputList'

// mui imports
import { Typography, CardContent, Grid, Card } from '@mui/material'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

import { InputListValues, StatusSetting } from 'type/config'
import { skillSetListRequest, skillSetModifyRequest } from '@service/settings'
import { SHOW_ERROR, SHOW_INFO, SHOW_SUCCESS } from '@utils/ToastMessage'
import { formateErrors } from '@utils/errorHandler'
import { makeDynamicFields } from '@utils/factory'
import { checkPoint, isEmpty } from '@utils/bug'

const initialState: StatusSetting = { error: null, status: 'IDLE' }

const SkillSet = () => {
	const [setting, setSetting] = useState<StatusSetting>(initialState)
	const formHook = useForm<InputListValues>()

	const { header, form, add_text } = tokens.settings.skill_set
	const { t } = useTranslation()
	const {
		formState: { isDirty, dirtyFields },
	} = formHook

	const handleList = () => {
		skillSetListRequest()
			.then(({ data: { skillSet } }) => {
				if (skillSet.length === 0) {
					formHook.reset({ fields: [{ name: '', details: '' }] })
					setSetting({ ...initialState })
					return
				}
				const pData = makeDynamicFields({
					rawData: skillSet,
					pick: ['name', 'details'],
					majorKey: 'fields',
					path: 'skill_set',
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
		console.log(isDirty, dirtyFields, isEmpty(dirtyFields))
		if (!isDirty && isEmpty(dirtyFields)) {
			SHOW_INFO({ msg: 'There is nothing to submit' })
			return
		}
		try {
			setSetting({ ...setting, status: 'LOADING' })
			// checkPoint('loading ')
			const { data } = await skillSetModifyRequest(fromData.fields)
			if (data) {
				// console.log('after submission : ', data)
				handleList()
				SHOW_SUCCESS({})
			}
			setSetting({ ...initialState })
		} catch (error: any) {
			const formErrors = formateErrors(error)
			// formik.setErrors(formErrors);
			setSetting({ ...setting, status: 'FAIL' })
			SHOW_ERROR({ msg: 'An error occurred while submitting Skills ' })
		}
	}

	useEffect(() => {
		setSetting({ ...setting, status: 'LOADING' })
		handleList()

		return () => {}
	}, [])

	// if (setting.status === 'LOADING') {
	//   return <h3>Loading </h3>;
	// }

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
								{t(header.skill_set)}
							</Typography>
						</Grid>
						<InputList
							status={setting.status}
							IntForm={[form.skill_set_field, form.skill_set_value, add_text]}
							isBottom
						/>
					</Grid>
				</Card>
			</form>
		</FormProvider>
	)
}
export default SkillSet
