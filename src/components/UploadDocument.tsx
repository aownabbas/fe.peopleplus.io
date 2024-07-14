import React, { useState, useCallback, useEffect } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AddIcon from '@mui/icons-material/Add'
import { createTheme } from '@mui/system'
import { FileDropzone } from './file-dropzone'
import type { File } from './file-dropzone'
import { DropdownOption } from 'type/config'
import toast from 'react-hot-toast'
import Loading from '@components/Loading'
import { useParams } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import { documentCategoryListRequest } from '@service/employee'
import {
	employeeDocumentStoreAction,
	openModal,
	closeModal,
	updateEmployeeDocumentAction,
	getEmployeeProfileCategoriesAction,
} from '@redux/features/employeeSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import validateFile from '@utils/file-validation'
import { List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import { FileIcon } from './file-icon'
import InputSelector from './InputSelector'

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

interface UploadDocumentProps {
	category: DropdownOption[]
	listUpdate: any
}

type FormData = {
	category_id: string | null
	file: File | null
}

export default function UploadDocument(props: UploadDocumentProps) {
	const { t } = useTranslation()
	const isOpen = useAppSelector((state) => state.employee.isOpen)
	const selectedDocumentCategory = useAppSelector(
		(state) => state.employee.selectedDocumentCategory,
	)
	const { deletedDocumentId } = useAppSelector((state) => state.employee)
	const dispatch = useAppDispatch()
	const [buttonLoading, setButtonLoading] = useState(false)
	const [categories, setCategories] = useState<DropdownOption[]>([])

	const { category } = props
	const { uuid } = useParams()

	const [file, setFile] = useState<File | null>(null)
	const methods = useForm<FormData>()

	const {
		reset,
		handleSubmit,
		formState: { errors },
	} = methods

	const handleFileDrop = useCallback((newFile: File[]): void => {
		if (newFile.length > 0) {
			setFile(newFile[0])
		}
	}, [])

	const handleFileRemove = useCallback((): void => {
		setFile(null)
	}, [])

	const fetchCategories = async () => {
		try {
			const response = await documentCategoryListRequest({ all: true })
			const updatedOptions: DropdownOption[] = response.data?.document_categories.map(
				(object: any) => ({
					label: object.name,
					value: object.uuid,
				}),
			)
			setCategories(updatedOptions)
		} catch (error) {
			toast.error('Failed to fetch document categories.')
		}
	}
	useEffect(() => {
		fetchCategories()
	}, [])

	useEffect(() => {
		reset({
			category_id: selectedDocumentCategory,
		})
	}, [isOpen, selectedDocumentCategory, reset])

	const handleOpen = () => {
		setFile(null)
		dispatch(openModal({}))
	}

	const handleClose = () => {
		dispatch(closeModal())
	}

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const formData = new FormData()
		try {
			if (!deletedDocumentId) {
				if (file) {
					const validationResult = validateFile(file)
					if (!validationResult.isValid) {
						toast.error(validationResult.error as string)
						return false
					}
					formData.append('file_name', file.name)
					formData.append('file_type', file)
				} else {
					toast.error('Please select a file.')
					return false
				}
			}

			formData.append('category_id', data.category_id as string)
			formData.append('employee_id', uuid as string)

			setButtonLoading(true)
			if (selectedDocumentCategory) {
				dispatch(
					updateEmployeeDocumentAction({ uuid: deletedDocumentId as string, formData: formData }),
				).then(({ type }) => {
					if (type.includes('fulfilled')) {
						setButtonLoading(false)
						dispatch(getEmployeeProfileCategoriesAction(uuid))
						reset()
						handleClose()
					}
				})
			} else {
				dispatch(employeeDocumentStoreAction(formData)).then(({ type }) => {
					setButtonLoading(false)
					if (type.includes('fulfilled')) {
						dispatch(getEmployeeProfileCategoriesAction(uuid))
						reset()
						handleClose()
					}
				})
			}
			setFile(null)
		} catch (err) {
			console.log(err)
			toast.error('Something went wrong!')
		}
	}

	return (
		<Box>
			<Button
				onClick={() => handleOpen()}
				fullWidth
				sx={{
					background: theme.palette.background.default,
					color: 'transparent',
					WebkitBackgroundClip: 'text',
					display: 'flex',
					alignItems: 'center',
				}}
				type="button"
			>
				<AddIcon
					sx={{
						color: '#357DBC',
					}}
				/>
				<Typography sx={{ display: { xs: 'none', md: 'block', fontWeight: '600' } }}>
					{t(tokens.employee.document.upload_modal.add_document)}
				</Typography>
			</Button>

			<Dialog
				open={isOpen}
				onClose={handleClose}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						<Typography variant="h6">
							{selectedDocumentCategory
								? t(tokens.employee.document.upload_modal.edit)
								: t(tokens.employee.document.upload_modal.upload_document)}
						</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</Box>
				</DialogTitle>
				<DialogContent dividers>
					<Stack spacing={2}>
						<FormProvider {...methods}>
							<form onSubmit={handleSubmit(onSubmit)}>
								{!selectedDocumentCategory && (
									<Box>
										<FileDropzone
											disabled={buttonLoading}
											caption={t(tokens.employee.document.upload_modal.file_size)}
											files={file ? [file] : []}
											onDrop={handleFileDrop}
											onRemove={handleFileRemove}
											multipleFiles={false}
										/>
									</Box>
								)}
								<List>
									{file && (
										<ListItem
											sx={{
												borderRadius: 1,
												mt: 1,
												backgroundImage: 'linear-gradient(135deg, #357DBC2a, #B591DB2c)',
											}}
										>
											<ListItemText
												primary={file.name}
												primaryTypographyProps={{ variant: 'subtitle2' }}
											/>
											<Tooltip title={t(tokens.employee.document.upload_modal.delete)}>
												<IconButton
													edge="end"
													onClick={() => setFile(null)}
												>
													<XIcon />
												</IconButton>
											</Tooltip>
										</ListItem>
									)}
								</List>

								<Box sx={{ mt: 3 }}>
									<InputSelector
										mainProps={{
											label: t(tokens.employee.document.category.label),
											placeholder: t(tokens.employee.document.category.place_holder),
										}}
										rules={{ required: t(tokens.employee.document.category.required) }}
										name="category_id"
										options={categories}
										searchable
									/>
								</Box>
							</form>
						</FormProvider>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSubmit(onSubmit)}
						disabled={buttonLoading}
						sx={{
							mt: 2,
							background: theme.palette.background.default,
							color: 'white',
							'&:disabled': {
								color: 'white',
							},
						}}
					>
						{buttonLoading ? (
							<Loading
								size={20}
								showMessage={true}
							/>
						) : selectedDocumentCategory ? (
							t(tokens.employee.document.buttons.save_changes)
						) : (
							t(tokens.employee.document.buttons.submit)
						)}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
