import { zodResolver } from '@hookform/resolvers/zod'
import AddForm from '../../AddForm'
import { Document, documentFrom, documentValidationSchema, updateDocumentData } from 'type/policies'
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import {
	handlePolicyDrawerClose,
	policyModifyAction,
	reCalculateTabs,
	selectedDocumentSelector,
} from '@redux/features/policiesSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { SHOW_SUCCESS } from '@utils/ToastMessage'
import { useEffect } from 'react'

const UpdateDocument = () => {
	const selectedDocument = useAppSelector(selectedDocumentSelector)
	const dispatch = useAppDispatch()

	const formHook = useForm<Document>({
		defaultValues: selectedDocument as Document,
	})

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		console.log(data)
		// @ts-ignore
		const { code, success } = await dispatch(policyModifyAction(data)).unwrap()
		if (success && code === 200) {
			formHook.reset()
			dispatch(handlePolicyDrawerClose())
			dispatch(reCalculateTabs())
			SHOW_SUCCESS({
				msg:
					data.status === 'deleted'
						? 'Policy Deleted Successfully '
						: 'Policy Updated Successfully ',
			})
		}
	}

	useEffect(() => {
		formHook.reset(selectedDocument as Document)
		// return () => {
		// 	formHook.reset()
		// }
	}, [selectedDocument])

	return (
		<FormProvider {...formHook}>
			<form noValidate>
				<AddForm onSubmit={onSubmit} />
			</form>
		</FormProvider>
	)
}

export default UpdateDocument
