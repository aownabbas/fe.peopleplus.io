import { STATUS } from 'type/config'
import { useFieldArray, useFormContext } from 'react-hook-form'

// mui imports
import { Typography, Stack, Grid, SvgIcon, Button, TextField, IconButton } from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import TrashIcon from '@untitled-ui/icons-react/build/esm/Trash01'
import Box from '@mui/material/Box'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

import { createTheme } from '@mui/system'
import Loading from './Loading'
import { DeleteSettingsFields, dynamicFields } from 'type/settings'
import {
	deleteState,
	isDeletingSelector,
	settingsDeleteAction,
} from '@redux/features/settingsSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { SHOW_SUCCESS } from '@utils/ToastMessage'
import { InputListSkeleton } from './Skeletons'
import { useContext } from 'react'
import { ConfirmationContext } from '@contexts/confirmation'

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

const InputList = ({
	isBottom = false,
	IntForm,
	status,
}: {
	isBottom?: boolean
	IntForm: any
	status: unknown | STATUS
}) => {
	const { openModal } = useContext(ConfirmationContext)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const isDeleting = useAppSelector(isDeletingSelector)

	const [FormName, FormDetails, addText] = IntForm
	const {
		reset,
		control,
		formState: { errors },
		register,
		setValue,
		getValues,
		watch,
	} = useFormContext()

	const isAddMode = getValues('isAddMode')
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'fields',
		shouldUnregister: true,
	})
	interface FieldWith extends Record<'id', string> {
		uuid: string
		path: dynamicFields
	}
	const handleRemove = async (idx: number, field: FieldWith) => {
		openModal(
			`Are you sure you want to delete this item?`,
			async () => {
				dispatch(deleteState({ uuid: field.uuid }))
				if (!field.uuid) {
					remove(idx)
					return
				}
				const fromData: DeleteSettingsFields = {
					deleteFrom: field.path,
					uuid: field.uuid,
				}
				try {
					const { type } = await dispatch(settingsDeleteAction(fromData))
					if (type.includes('/fulfilled')) {
						remove(idx)
						SHOW_SUCCESS({ msg: `Deleted Successfully` })
					}
				} catch (error) {
					console.error(error)
					SHOW_SUCCESS({ msg: `Something Went Wrong` })
				} finally {
					dispatch(deleteState({}))
				}
				// console.log('Confirmed')
				// Perform delete action
			},
			() => {
				console.log('Cancelled')
			},
		)
	}

	return (
		<Grid
			xs={12}
			md={9}
		>
			<Stack
				direction="row"
				sx={{
					width: '100%',
					backgroundColor: '#F2F3F7',
					borderRadius: 1,
					padding: 2,
					marginBottom: 2,
				}}
			>
				<Box width={'50%'}>
					<Typography variant="body2">{t(tokens.settings.general.list.field)}</Typography>
				</Box>

				<Box width={'50%'}>
					<Typography variant="body2">{t(tokens.settings.general.list.description)}</Typography>
				</Box>
			</Stack>
			{status === 'LOADING' ? (
				<InputListSkeleton />
			) : (
				// <Loading />
				<Stack
					// divider={<Divider />}
					spacing={2}
				>
					{fields.map((field, idx) => (
						<Stack
							key={field.id}
							alignItems="center"
							direction="row"
							justifyContent="space-between"
							spacing={2}
						>
							<TextField
								{...register(`fields.${idx}.name` as const, {
									required: 'This field is required',
									maxLength: {
										value: 40,
										message: 'Name cannot exceed 40 characters',
									},
								})}
								label={t(FormName.name)}
								placeholder={t(FormName.placeHolder)}
								// @ts-ignore
								error={!!errors?.fields?.[idx]?.name}
								// @ts-ignore
								helperText={errors?.fields?.[idx]?.name?.message}
								type="text"
								sx={{ flexGrow: 1 }}
								InputLabelProps={{
									shrink: Boolean(getValues(`fields.${idx}.name`)) || isAddMode,
								}}
							/>
							<TextField
								{...register(`fields.${idx}.details` as const)}
								label={t(FormDetails.name)}
								placeholder={t(FormDetails.placeHolder)}
								// @ts-ignore
								error={!!errors?.fields?.[idx]?.details}
								// @ts-ignore
								helperText={errors?.fields?.[idx]?.details?.message}
								type="text"
								sx={{ flexGrow: 1 }}
								InputLabelProps={{
									shrink: Boolean(getValues('fields.${idx}.details')) || isAddMode,
								}}
							/>

							{isDeleting.stats === 'LOADING' &&
							//@ts-ignore
							isDeleting.state.uuid === field.uuid ? (
								<Loading />
							) : (
								<IconButton
									disabled={isDeleting.stats === 'LOADING'}
									onClick={() => handleRemove(idx, field as any)}
								>
									<SvgIcon fontSize="small">
										<TrashIcon />
									</SvgIcon>
								</IconButton>
							)}
						</Stack>
					))}

					<Stack
						alignItems="center"
						justifyContent="space-between"
						direction="row"
					>
						{status === 'LOADING' ? (
							<Typography
								sx={{
									background: theme.palette.background.default,
									color: 'transparent',
									WebkitBackgroundClip: 'text',
								}}
								variant="subtitle1"
							>
								{t(tokens.common.loading)}
							</Typography>
						) : (
							<Button
								type="button"
								// sx={{
								// 	background: theme.palette.background.default,
								// 	color: 'transparent',
								// 	WebkitBackgroundClip: 'text',
								// }}
								variant="text"
								sx={{ color: '#357DBC' }}
								onClick={() => append({ name: '', details: '' })}
								startIcon={
									<SvgIcon fontSize="small">
										<PlusIcon color={'#357DBC'} />
									</SvgIcon>
								}
							>
								{t(addText)}
							</Button>
						)}
						{isBottom && (
							<Button
								disabled={status == 'LOADING'}
								variant="gradient"
								type="submit"
							>
								{status === 'LOADING' ? <Loading /> : t(tokens.common.save_changes)}
							</Button>
						)}
					</Stack>
				</Stack>
			)}
		</Grid>
	)
}
export default InputList
