import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
	TextField,
	MenuItem,
	Button,
	FormControl,
	FormHelperText,
	Typography,
	Box,
	SvgIcon,
	Avatar,
	Stack,
} from '@mui/material'
import { QuillEditor } from '@components/quill-editor'
import { Scrollbar } from '@components/scrollbar'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Delete from '@untitled-ui/icons-react/build/esm/Trash04'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

interface documentCategories {
	label: number
	value: string
}
const documentCategories = [
	{ label: 'Fundamentals', value: 'fundamentals' },
	{ label: 'People', value: 'people' },
	{ label: 'Engineering', value: 'engineering' },
	{ label: 'Recruitment', value: 'recruitment' },
	{ label: 'Performance', value: 'performance' },
	{ label: 'Other', value: 'other' },
]

interface Image {
	id: number
	url: string
}

const images: Image[] = [
	{ id: 1, url: '/themedStar.png' },
	{ id: 2, url: '/themedDiamond.png' },
	{ id: 3, url: '/themedBox.png' },
	{ id: 4, url: '/themedCar.png' },
	{ id: 5, url: '/themedError.png' },
	{ id: 6, url: '/themedGift.png' },
	{ id: 7, url: '/themedHealth.png' },
	{ id: 8, url: '/themedLaw.png' },
	{ id: 9, url: '/themedLock.png' },
	{ id: 10, url: '/themedMagic.png' },
	{ id: 11, url: '/themedMusic.png' },
	{ id: 12, url: '/themedNote.png' },
	{ id: 13, url: '/themedPayroll.png' },
	{ id: 14, url: '/themedRocket.png' },
	{ id: 15, url: '/themedSuccess.png' },
	{ id: 16, url: '/themedTemperature.png' },
	{ id: 17, url: '/themedTime.png' },
	{ id: 18, url: '/themedTrophy.png' },
]

const formSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	shortDescription: z.string().min(1, 'Short Description is required'),
	description: z.string().min(1, 'Document Content is required'),
	documentCategory: z.string().min(1, 'Document Category is required'),
	// Make selectedImageId a string
	selectedImageId: z.string().optional(), // Adjust based on your requirement
})

type FormValues = z.infer<typeof formSchema>

export default function DocumentForm() {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	})

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data) // Handle form submission
	}
	const [selectedImageId, setSelectedImageId] = useState<number | null>(null)

	const handleSelectImage = (id: number) => {
		setSelectedImageId(id)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<TextField
				{...control.register('title')}
				label="Document Title"
				fullWidth
				error={!!errors.title}
				helperText={errors.title?.message}
				margin="dense"
			/>
			<TextField
				{...control.register('shortDescription')}
				label="Short Description"
				fullWidth
				error={!!errors.shortDescription}
				helperText={errors.shortDescription?.message}
				margin="dense"
			/>
			<Controller
				name="documentCategory"
				control={control}
				defaultValue=""
				render={({ field }) => (
					<TextField
						{...field}
						fullWidth
						select
						label="Document Category"
						error={!!errors.documentCategory}
						helperText={errors.documentCategory?.message}
						margin="dense"
					>
						{documentCategories.map((category) => (
							<MenuItem
								key={category.value}
								value={category.value}
							>
								{category.label}
							</MenuItem>
						))}
					</TextField>
				)}
			/>

			<Stack
				spacing={2}
				sx={{ my: 2 }}
			>
				<Typography sx={{ fontWeight: 400, fontSize: 12, color: '#344054' }}>
					Select an icon
				</Typography>
				{/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
					{images.map((image) => (
						<Avatar
							key={image.id}
							sx={{
								width: 70,
								height: 70,
								cursor: 'pointer',
								border:
									getValues('selectedImageId') === image.id.toString()
										? '2px solid #007bff'
										: 'none',
							}}
							onClick={() => setValue('selectedImageId', image.id.toString())} // Convert the id to string here
						>
							<img
								src={image.url}
								alt={`Image ${image.id}`}
								style={{ width: '100%', height: '100%' }}
							/>
						</Avatar>
					))}
				</Box> */}
				<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, my: 4 }}>
					{images.map((image) => (
						<Avatar
							key={image.id}
							sx={{
								width: '44px',
								height: '44px',
								cursor: 'pointer',
								border: image.id === selectedImageId ? '2px solid #357DBC' : 'none',
							}}
							onClick={() => handleSelectImage(image.id)}
						>
							<img
								src={image.url}
								alt={`Image ${image.id}`}
								style={{ width: '100%', height: '100%' }}
							/>
						</Avatar>
					))}
				</Box>
			</Stack>

			<Controller
				name="description"
				control={control}
				defaultValue=""
				render={({ field }) => (
					<FormControl
						fullWidth
						error={!!errors.description}
						sx={{ mt: 2, mb: 1 }}
					>
						<Typography
							component="label"
							htmlFor="quill-editor"
							sx={{ mb: 1, fontWeight: 400, fontSize: 12, color: '#344054' }}
						>
							Document Body
						</Typography>
						<Scrollbar sx={{ maxHeight: '510px' }}>
							<QuillEditor
								sx={{
									maxHeight: '500px',
									height: '300px',
								}}
								{...field}
								id="quill-editor"
								placeholder="Enter description"
							/>
						</Scrollbar>
						<FormHelperText>{errors.description?.message}</FormHelperText>
					</FormControl>
				)}
			/>
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
				<Button
					type="button"
					sx={{ gap: 1, background: 'transparent', color: '#111927' }}
				>
					<SvgIcon>
						<Delete />
					</SvgIcon>
					Delete
				</Button>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
					<Button
						type="button"
						sx={{
							backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
							color: '#164C63',
							fontSize: 13,
						}}
					>
						{isSmallScreen ? 'Draft' : 'Save as Draft'}
					</Button>
					<Button
						type="submit"
						variant="gradient"
					>
						{isSmallScreen ? 'Publish' : 'Publish Now'}
					</Button>
				</Box>
			</Box>
		</form>
	)
}
