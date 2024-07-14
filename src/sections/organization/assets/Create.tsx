/* eslint-disable prettier/prettier */
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { SubmitHandler, useForm, Controller, FieldValues, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Grid, Card, CardContent, MenuItem } from '@mui/material'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { File } from '@components/file-dropzone'
import { FileDropzone } from '@components/file-dropzone'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box, createTheme } from '@mui/system'
import { useAppSelector } from '@redux/hooks.ts'
import { settingsSelector } from '@redux/features/settingsSlice'
import { employeeSelector } from '@redux/features/employeeSlice'
import ClearIcon from '@mui/icons-material/Clear'
import { documentSelector } from '@redux/features/departmentSlice'
import { assetEditRequest, saveAssetRequest, updateAssetRequest } from '@service/asset'
import Loading from '@components/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import { RouterLink } from '@components/router-link.tsx'
import BackdropLoader from '@components/BackdropLoader.tsx'
import { Asset, Images } from 'type/asset'
import { DropdownOption } from 'type/config.ts'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { nextAssetTagIdRequest } from '@service/asset'

import { t } from 'i18next'
import validateFile from '@utils/file-validation'
import InputSelector from '@components/InputSelector'
import { FieldCardSkeleton } from '@components/Skeletons'
import { generateDropdownOptions } from '@utils/generate-dropdown-option'
import { filterItems, limitItems } from '@utils/filterItems'

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
// import { paths } from 'src/paths';

const purchaseCurrency: DropdownOption[] = [
	{
		label: 'PKR',
		value: 'pkr',
	},
	{
		label: 'USD',
		value: 'usd',
	},
	{
		label: 'INR',
		value: 'inr',
	},
]

const status: DropdownOption[] = [
	{
		label: t(tokens.asset.status.active),
		value: 'active',
	},
	{
		label: t(tokens.asset.status.deactivate),
		value: 'deactive',
	},
]

// Function to check if the input is a valid date object

const validationSchema = z
	.object({
		name: z.string().min(1),
		tag_id: z.string().min(1),
		location: z
			.union([z.string().min(1), z.literal('')])
			.nullable()
			.default(''),
		model: z
			.union([z.string().min(1), z.literal('')])
			.nullable()
			.default(''),
		manufacture: z
			.union([z.string().min(1), z.literal('')])
			.nullable()
			.default(''),
		warranty_information: z
			.union([z.string().min(1), z.literal('')])
			.nullable()
			.default(''),
		description: z
			.union([z.string().min(1), z.literal('')])
			.nullable()
			.default(''),
		serial_number: z.number().optional().or(z.string()).nullable(),
		purchase_price: z.number().optional().or(z.string()).nullable(),
		purchase_currency: z.union([z.string().min(1), z.literal('')]).default(''),
		status: z.string().min(1),
		employee_id: z.string().or(z.number()).optional(),
		department_id: z.string().or(z.number()).optional(),
		// asset_category_id: z.string().or(z.number()),
		asset_category_id: z
			.string()
			.or(z.number())
			.refine((val) => val !== undefined && val !== null && val !== '', {
				message: 'Asset category is required',
			}),
		allocation_date: z.date().nullable(),
		purchase_date: z.date().optional().nullable(),
		uploadedFiles: z.any().refine((value) => value && value.length > 0, {
			message: 'File is required',
		}),
	})
	.refine((data) => !data.employee_id || data.allocation_date, {
		message: 'Allocation date is required with assigned employee ',
		path: ['allocation_date'],
	})

type ValidationSchema = z.infer<typeof validationSchema>

export const AssetCreateForm: FC = () => {
	const { uuid } = useParams()
	const navigate = useNavigate()
	const [buttonLoading, setButtonLoading] = useState(false)
	const [pageLoading, setPageLoading] = useState(true) // Assuming the page is initially loading
	const { assetCategories } = useAppSelector(settingsSelector)
	const { list, tempList } = useAppSelector(employeeSelector)
	const department = useAppSelector(documentSelector)
	const [files, setFiles] = useState<File[]>([])
	const [images, setImages] = useState<Images[]>([])
	const [deletedImages, setDeletedImages] = useState<number[]>([])
	const [categoryOptions, setCategoryOptions] = useState<DropdownOption[]>([])
	const [departmentOptions, setDocumentOptions] = useState<DropdownOption[]>([])
	const [usersList, setUserOptions] = useState<DropdownOption[]>([])
	const [asset, setAsset] = useState<Asset | null>(null)
	const [filesError, setFilesError] = useState('')
	const [isfilesError, setFileErrorFlag] = useState(false)
	const fileDropzoneRef = useRef<HTMLDivElement>(null)

	const { t } = useTranslation()

	const [nextAssetId, setNextAssetId] = useState('')

	useEffect(() => {
		// Define a function to fetch data using the API
		const fetchData = async () => {
			try {
				if (uuid) {
					const { data } = await assetEditRequest({ uuid })
					const { asset } = data
					setImages(asset.asset_images)
					setAsset(asset)
				}
				setPageLoading(false)
				// Update the state with the fetched data
			} catch (error) {
				setPageLoading(false)
				console.error('Error fetching data:', error)
			}
		}

		// Call the fetchData function
		fetchData()
	}, [uuid])

	useEffect(() => {
		nextAssetTagIdRequest()
			.then((data) => {
				const { tag_id } = data.data
				setNextAssetId(tag_id) // Assuming the API response contains 'next_employee_id'
			})
			.catch((error) => {
				console.error('Error fetching next employee ID:', error)
				// Handle error if needed (e.g., display error message)
			})
	}, [])

	useEffect(() => {
		if (assetCategories) {
			const updatedOptions: DropdownOption[] = assetCategories.map((category: any) => ({
				label: category.name,
				value: category.id,
			}))
			setCategoryOptions(updatedOptions)
		}

		if (department.data) {
			const updatedOptions: DropdownOption[] = department.data.map((document: any) => ({
				label: document.name,
				value: document.id,
			}))
			setDocumentOptions(updatedOptions)
		}

		if (list) {
			// const updatedOptions: DropdownOption[] = list
			const updatedOptions = generateDropdownOptions(list)
			setUserOptions(updatedOptions)
			console.log(updatedOptions, 'testings')
		}
	}, [assetCategories, list])

	const convertNullToString = (data: any) => {
		if (data === null || data === 'null') {
			return ''
		} else {
			return data
		}
	}

	const initialValues: Asset = {
		name: asset?.name || '',
		tag_id: asset ? convertNullToString(asset.tag_id) : nextAssetId,
		status: asset?.status || 'active',
		employee_id: asset?.employee?.uuid,
		department_id: asset?.department?.id,
		asset_category_id: asset?.asset_category?.id,
		model: asset ? convertNullToString(asset.model) : '',
		manufacture: asset ? convertNullToString(asset.manufacture) : '',
		description: asset ? convertNullToString(asset.description) : '',
		allocation_date: asset && asset.allocation_date ? new Date(asset.allocation_date) : null,
		purchase_date: asset && asset.purchase_date ? new Date(asset.purchase_date) : null,
		purchase_price: asset ? asset.purchase_price : 0,
		location: asset ? convertNullToString(asset.location) : '',
		purchase_currency: asset ? convertNullToString(asset.purchase_currency) : 'pk',
		serial_number: asset ? asset.serial_number : 0,
		assignmentDate: undefined,
		asset_images: [],
		asset_comments: [],
		activity: [],
		asset_documents: [],
		uploadedFiles: images,
	}

	const handleFileRemove = (index: number, key: string) => {
		if (key == 'new_image') {
			const updatedFiles = [...files]
			updatedFiles.splice(index, 1)
			setFiles(updatedFiles)
		}

		if (key == 'existing_image') {
			const updatedFiles = [...images]
			const deletedImageId = updatedFiles[index].id
			const updatedDeletedImages = [...deletedImages, deletedImageId]
			setDeletedImages(updatedDeletedImages)
			updatedFiles.splice(index, 1)
			setImages(updatedFiles)
		}
	}

	const objectToFormData = (obj: any) => {
		const formData = new FormData()
		Object.entries(obj).forEach(([key, value]) => {
			if (value) formData.append(key, value as any)
		})
		return formData
	}
	const methods = useForm<ValidationSchema>({
		defaultValues: initialValues,
		resolver: zodResolver(validationSchema),
	})

	const handleChange = (searchValue: string) => {
		const filteredItems = filterItems(tempList, searchValue, uuid)
		const limitedItems = limitItems(filteredItems, 10)
		const updatedOptions = generateDropdownOptions(limitedItems)
		setUserOptions(updatedOptions)
	}

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = methods

	useEffect(() => {
		if (errors && Object.keys(errors).length > 0 && errors?.uploadedFiles) {
			fileDropzoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
		} else if (errors && Object.keys(errors).length > 0 && errors?.status) {
			const statusField: any = document.querySelector('[name="status"]')
			if (statusField) {
				statusField?.focus()
				statusField.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		} else if (errors && Object.keys(errors).length > 0 && errors?.asset_category_id) {
			const assetIdField: any = document.querySelector('[name="asset_category_id"]')
			if (assetIdField) {
				assetIdField?.focus()
				assetIdField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
			}
		}
	}, [errors])

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		let assetResponse
		let message
		const fileCheck = checkFileExist()
		if (!fileCheck) {
			fileDropzoneRef.current?.scrollIntoView({ behavior: 'smooth' })
			return
		}
		const { uploadedFiles, ...cleanedData } = data

		const formData = objectToFormData(cleanedData)
		files.forEach((file) => {
			formData.append('files[]', file)
		})

		deletedImages.forEach((file) => {
			formData.append('deleted_files[]', String(file))
		})

		try {
			setButtonLoading(true)
			if (!pageLoading && uuid) {
				formData.append('uuid', uuid)
				assetResponse = await updateAssetRequest(formData)
				message = t(tokens.common.toast_message.record_updated)
			} else {
				assetResponse = await saveAssetRequest(formData)
				message = t(tokens.common.toast_message.record_added)
			}
			if (assetResponse) {
				setButtonLoading(false)
				// NOTE: Make API request
				toast.success(message)
				navigate('/assets')
			}
		} catch (err) {
			setButtonLoading(false)
			toast.error(t(tokens.common.toast_message.server_error))
		}
	}

	const checkFileExist = () => {
		if (files.length === 0 && images.length === 0) {
			setFilesError(t(tokens.asset.file_error.require))
			setFileErrorFlag(true) // Set error flag to true if no files
			return false // Indicate that a file error exists
		}

		if (files.length + images.length > 5) {
			setFilesError(t(tokens.asset.file_error.no_of_files))
			setFileErrorFlag(true) // Set error flag to true if no files
			return false // Indicate that a file error exists
		}
		setFilesError('') // Clear error message if files exist
		setFileErrorFlag(false) // Set error flag to false if files exist
		return true // Indicate that there's no file error
	}

	const handleFilesDrop = (newFiles: File[]): void => {
		setFileErrorFlag(false)
		const validationResult = validateFile(newFiles)
		if (!validationResult.isValid) {
			setFilesError(validationResult.error as string)
			setFileErrorFlag(true)
			return
		}
		setFiles((prevFiles) => {
			const updatedFiles = [...prevFiles, ...newFiles]
			return updatedFiles
		})
	}

	useEffect(() => {
		if (uuid && asset) {
			reset(initialValues)
		} else {
			reset({ tag_id: nextAssetId })
		}
	}, [asset, nextAssetId])

	if (pageLoading && uuid) {
		return (
			<Box>
				<FieldCardSkeleton
					firstTitle="Assets Information"
					secondTitle="Assigning detail"
				/>
			</Box>
		)
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card
					sx={{
						boxShadow: 'none !important',
						border: '1px solid #EAECF0',
					}}
				>
					<Stack
						sx={{
							py: 5,
							px: 2,

							'@media (min-width:600px)': {
								py: 5,
								px: 4,
							},
						}}
						spacing={3}
					>
						<Grid container>
							<Grid
								xs={12}
								md={3}
							>
								<Typography sx={{ fontSize: 18, fontWeight: 600, color: '#101323', pb: 2 }}>
									Assets Information
								</Typography>
							</Grid>
							<Grid
								xs={12}
								md={9}
							>
								<Grid container>
									{/* upload */}
									<Grid
										xs={12}
										md={12}
										sx={{ p: 1 }}
										ref={fileDropzoneRef}
									>
										<Controller
											name="uploadedFiles"
											control={control}
											rules={{ required: 'File is required' }}
											render={({ field }) => {
												console.log(field, '11111') // Ensure this line is correct
												return (
													<FileDropzone
														accept={{ 'image/*': [] }}
														caption={t(tokens.asset.form.fileUpload.caption)}
														onDrop={(acceptedFiles) => {
															field.onChange(acceptedFiles)
															handleFilesDrop(acceptedFiles)
														}}
														{...field}
														validationCheck={errors?.uploadedFiles || isfilesError}
													/>
												)
											}}
										/>
										{isfilesError ? (
											<div
												style={{
													color: 'red',
													fontSize: '15px',
													fontWeight: 'bold',
													marginLeft: '20px',
												}}
											>
												{filesError}
											</div>
										) : (
											''
										)}
										{/* @ts-ignore */}
										{errors?.uploadedFiles && (
											<Typography
												color="error"
												variant="body2"
												// {...register('name')}
											>
												{/* @ts-ignore */}
												{errors?.uploadedFiles.message}
											</Typography>
										)}

										{/* Image preview */}
										<div style={{ display: 'flex', gap: '10px', margin: '10px', flexWrap: 'wrap' }}>
											{files.map((file, index) => (
												<div
													key={index}
													style={{ position: 'relative' }}
												>
													<img
														src={URL.createObjectURL(file)}
														alt={`Preview-${index}`}
														style={{
															width: '105px',
															height: '83px',
															borderRadius: '10px',
															margin: '0 10px',
															flex: '1',
															objectFit: 'cover',
														}}
													/>
													{/* Remove button */}
													<span
														onClick={() => handleFileRemove(index, 'new_image')}
														style={{
															position: 'absolute',
															top: '-5px',
															right: '5px',
															background: 'none',
															border: 'none',
															cursor: 'pointer',
															padding: '5px',
														}}
													>
														<ClearIcon />
													</span>
												</div>
											))}

											{images.map((image, index) => (
												<div
													key={index}
													style={{ position: 'relative' }}
												>
													<img
														src={image.thumbnail_url}
														alt={`Image ${image.id}`}
														style={{
															width: '105px',
															height: '83px',
															borderRadius: '10px',
															margin: '0 10px',
															flex: '1',
															objectFit: 'cover',
														}}
													/>
													{/* Remove button */}
													<span
														onClick={() => handleFileRemove(index, 'existing_image')}
														style={{
															position: 'absolute',
															top: '-5px',
															right: '5px',
															background: 'none',
															border: 'none',
															cursor: 'pointer',
															padding: '5px',
														}}
													>
														<ClearIcon />
													</span>
												</div>
											))}
										</div>
									</Grid>

									{/* Asset Name */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<TextField
											error={!!errors.name?.message}
											fullWidth
											helperText={errors.name && t(tokens.asset.form.asset_name.helperText)}
											label={t(tokens.asset.form.asset_name.label)}
											placeholder={t(tokens.asset.form.asset_name.placeholder)}
											InputLabelProps={{
												shrink: true,
											}}
											{...register('name')}
										/>
									</Grid>
									{/* Asset ID and Tag */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<TextField
											disabled={true}
											error={!!errors.tag_id?.message}
											fullWidth
											helperText={errors.tag_id && t(tokens.asset.form.asset_id.helperText)}
											label={t(tokens.asset.form.asset_id.label)}
											InputLabelProps={{
												shrink: true,
											}}
											InputProps={{
												readOnly: true,
											}}
											{...register('tag_id')}
										/>
									</Grid>
									{/* status */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<InputSelector
											mainProps={{
												label: t(tokens.asset.form.status.label),
											}}
											name="status"
											options={status}
											searchable
											helperText={errors.status && t(tokens.asset.form.status.helperText)}
										/>
									</Grid>
									{/* category */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<InputSelector
											mainProps={{
												label: t(tokens.asset.form.category.label),
												placeholder: t(tokens.asset.form.category.placeholder),
											}}
											name="asset_category_id"
											options={categoryOptions}
											searchable
											helperText={
												errors.asset_category_id && t(tokens.asset.form.category.helperText)
											}
										/>
									</Grid>
									{/* purchase date */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<Controller
											name="purchase_date"
											control={control}
											render={({ field }) => (
												<DatePicker
													label={t(tokens.asset.form.purchase_date.label)}
													{...field}
													sx={{ width: '100%' }} // Set the desired width
												/>
											)}
										/>
									</Grid>

									{/* Purchase Price  */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<TextField
											{...register('purchase_price')}
											fullWidth
											label={t(tokens.asset.form.purchase_price.label)}
											onChange={(e) => {
												// Regular expression to match numbers and the "+" sign
												const validInput = e.target.value.replace(/[^0-9+]/gi, '')
												// Update the field value only if it matches the allowed characters
												e.target.value = validInput // Directly manipulate the input's value
											}}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>

									{/* Purchase Currency */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<InputSelector
											mainProps={{
												label: t(tokens.asset.form.purchase_currency.label),
												placeholder: t(tokens.asset.form.purchase_currency.placeholder),
											}}
											name="purchase_currency"
											options={purchaseCurrency}
											searchable
										/>
									</Grid>
									{/* serial number */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<TextField
											fullWidth
											{...register('serial_number')}
											label={t(tokens.asset.form.serial_no.label)}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>

									{/* manufacture */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<TextField
											fullWidth
											{...register('manufacture')}
											label={t(tokens.asset.form.manufacture.label)}
											placeholder={t(tokens.asset.form.manufacture.placeholder)}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>

									{/* modal */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<TextField
											fullWidth
											{...register('model')}
											label={t(tokens.asset.form.model.label)}
											placeholder={t(tokens.asset.form.model.placeholder)}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>

									{/* description */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<TextField
											fullWidth
											{...register('description')}
											label={t(tokens.asset.form.description.label)}
											placeholder={t(tokens.asset.form.description.placeholder)}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid container>
							<Grid
								xs={12}
								md={3}
							>
								<Typography sx={{ fontSize: 18, fontWeight: 600, color: '#101323', pb: 2 }}>
									Assigning detail
								</Typography>
							</Grid>
							<Grid
								xs={12}
								md={9}
							>
								<Grid container>
									{/* select employee */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<InputSelector
											mainProps={{
												label: t(tokens.asset.form.employee.label),
												placeholder: t(tokens.asset.form.employee.placeholder),
											}}
											onChange={handleChange}
											name="employee_id"
											options={usersList}
											searchable
										/>
									</Grid>
									{/* select department */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<InputSelector
											mainProps={{
												label: t(tokens.asset.form.department.label),
												placeholder: t(tokens.asset.form.department.placeholder),
											}}
											name="department_id"
											options={departmentOptions}
											searchable
										/>
									</Grid>
									{/* allocation date */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<Controller
											name="allocation_date"
											control={control}
											render={({ field }) => (
												<DatePicker
													label={t(tokens.asset.form.allocation_date.label)}
													{...field}
													sx={{ width: '100%' }}
													slotProps={{
														textField: {
															error: !!errors.allocation_date,
															helperText: errors.allocation_date
																? (errors.allocation_date.message as string)
																: '',
														},
													}}
												/>
											)}
										/>
									</Grid>
									{/* asset location */}
									<Grid
										item
										xs={12}
										md={6}
										sx={{ p: 1 }}
									>
										<TextField
											fullWidth
											{...register('location')}
											label={t(tokens.asset.form.location.label)}
											placeholder={t(tokens.asset.form.location.placeholder)}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>

						<Stack
							alignItems="center"
							direction="row"
							justifyContent="flex-end"
							spacing={1}
							sx={{
								mt: 5,
							}}
						>
							<Button
								href="/assets"
								component={RouterLink}
								color="inherit"
							>
								{t(tokens.asset.button.cancel)}
							</Button>
							<Button
								type="submit"
								disabled={buttonLoading}
								sx={{
									mt: 2,
									background: theme.palette.background.default,
									color: 'white', // Set text color to white
									'&:disabled': {
										color: 'white',
									},
								}}
							>
								{!buttonLoading ? t(tokens.asset.button.submit) : null}
								{buttonLoading && (
									<Loading
										size={20}
										showMessage={true}
									/>
								)}
							</Button>
						</Stack>
					</Stack>
				</Card>
			</form>
		</FormProvider>
	)
}
