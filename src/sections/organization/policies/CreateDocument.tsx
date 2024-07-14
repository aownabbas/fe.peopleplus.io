import { forwardRef, Ref, useEffect, useImperativeHandle } from 'react'

// mui imports
import { Drawer, Stack, Typography, Box, IconButton, SvgIcon } from '@mui/material'
import AddForm from './AddForm'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { documentFrom, documentValidationSchema } from 'type/policies'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	handlePolicyDrawerClose,
	policyAddAction,
	policyCategoryOptionsSelector,
	policyStatusSelector,
	reCalculateTabs,
} from '@redux/features/policiesSlice'
import { SHOW_SUCCESS } from '@utils/ToastMessage'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

export interface CreateDocumentHandles {
	resetFrom: () => void
}

// const CreateDocument = forwardRef<CreateDocumentHandles, object>(
const CreateDocument = () => {
	const { t } = useTranslation()

	const formHook = useForm<documentFrom>({})
	const dispatch = useAppDispatch()
	const DocStatus = useAppSelector(policyStatusSelector)
	const policyCategoryOptions = useAppSelector(policyCategoryOptionsSelector)

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		// @ts-ignore
		const { code, success } = await dispatch(policyAddAction(data)).unwrap()
		if (success && code === 200) {
			dispatch(handlePolicyDrawerClose())
			formHook.reset()
			SHOW_SUCCESS({ msg: 'Policy added Successfully ' })
		}
	}
	useEffect(() => {
		formHook.setValue('category_name', policyCategoryOptions?.slice(1)[0]?.value)
		return () => {}
	}, [])

	return (
		<Stack
			spacing={2}
			sx={{ pt: '40px', pb: '10px', px: '20px' }}
		>
			<Typography
				sx={{
					fontWeight: 700,
					fontSize: '24px',
					lineHeight: '28px',
					pl: 1,
				}}
			>
				{t(tokens.policy.form.add_document.title)}
			</Typography>
			<Box>
				<FormProvider {...formHook}>
					<form noValidate>
						<AddForm onSubmit={onSubmit} />
					</form>
				</FormProvider>
			</Box>
		</Stack>
	)
}

// CreateDocument.displayName = 'CreateDocument'

export default CreateDocument
