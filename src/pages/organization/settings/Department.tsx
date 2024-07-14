import { useEffect, useMemo } from 'react'
import InputList from '@components/InputList'

// mui imports
import { Typography, CardContent, Grid, Card } from '@mui/material'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	departmentListAction,
	departmentModifyAction,
	settingsSelector,
} from '@redux/features/settingsSlice'
import { InputListValues } from 'type/config'
import { isEmpty } from '@utils/bug'
import { SHOW_ERROR, SHOW_INFO, SHOW_SUCCESS } from '@utils/ToastMessage'

const Department = () => {
	const dispatch = useAppDispatch()
	const { headers, form, add_text } = tokens.settings.general
	const { t } = useTranslation()
	// setValue('fields', departments)
	const { departments, status } = useAppSelector(settingsSelector)

	const formHook = useForm<InputListValues>()

	const {
		reset,
		setValue,
		formState: { isDirty, dirtyFields },
	} = formHook

	const onSubmit: SubmitHandler<FieldValues> = async (fromData) => {
		// Access the array of objects from the form data
		console.log(isDirty, dirtyFields, isEmpty(dirtyFields))

		if (isDirty && isEmpty(dirtyFields)) {
			SHOW_INFO({ msg: 'There is nothing to submit' })
			return
		}

		try {
			// @ts-ignore
			await dispatch(departmentModifyAction(fromData.fields))
			SHOW_SUCCESS({})
		} catch (error) {
			SHOW_ERROR({ msg: 'An error occurred while submitting Data ' })
		}
	}

	useEffect(() => {
		dispatch(departmentListAction())
		return () => {}
	}, [])

	useEffect(() => {
		setValue('fields', departments)
		return () => {}
	}, [departments])

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
								{t(headers.departments)}
							</Typography>
						</Grid>
						<InputList
							status={status}
							IntForm={[form.depart_field, form.depart_value, add_text]}
							isBottom
						/>
					</Grid>
				</Card>
			</form>
		</FormProvider>
	)
}

export default Department
