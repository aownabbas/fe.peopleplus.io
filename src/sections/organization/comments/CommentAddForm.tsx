import { useState, type FC } from 'react'
import { useForm, FormProvider, Controller, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

// mui imports
import { createTheme, height } from '@mui/system'
import {
	Box,
	Avatar,
	Button,
	Stack,
	TextField,
	useMediaQuery,
	CircularProgress,
} from '@mui/material'

import RightArrow from '@untitled-ui/icons-react/build/esm/ArrowNarrowRight'

// internationalization
import { tokens } from '@locales/tokens'
import InputSelector from '@components/InputSelector'
import { DropdownOption } from 'type/config.ts'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { authUserSelector } from '@redux/features/authSlice'
import { employeeAddCommentRequest } from '@service/employee'
import { useParams } from 'react-router-dom'
import { addEmployeeFeedbackAction } from '@redux/features/employeeSlice'
import { SHOW_INFO } from '@utils/ToastMessage'

// local imports

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

const tag: DropdownOption[] = [
	{
		label: 'Warning ⚠️',
		value: 'warning',
	},
	{
		label:
			'Breach of Contract 🚫Breach of Contract 🚫Breach of Contract 🚫Breach of Contract 🚫Breach of Contract 🚫Breach of Contract 🚫Breach of Contract 🚫',
		value: 'breach of contract',
	},
	{
		label: 'Performance 📈',
		value: 'performance',
	},
	{
		label: 'Dependability ✅',
		value: 'dependability',
	},
	{
		label: 'Professionalism 👔',
		value: 'professionalism',
	},
	{
		label: 'Attendance 🕒',
		value: 'attendance',
	},
]

interface IFormInput {
	comment: string
	tag: string
}

const CommentAddForm: FC = () => {
	const methods = useForm<IFormInput>({
		defaultValues: {
			comment: '',
			tag: 'warning',
		},
	})
	const { handleSubmit, control, reset } = methods
	const { user } = useAppSelector(authUserSelector)

	const { uuid } = useParams()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const commentPayload: any = {
			employee_id: uuid,
			comment: data.comment,
			type: data.tag,
		}
		if (!data.comment) {
			SHOW_INFO({ msg: 'There is nothing to submit' })
			return
		}

		try {
			setIsSubmitting(true)
			const response = await employeeAddCommentRequest(commentPayload)
			if (response.status === 200) {
				toast.success('Comment submitted successfully!')
				dispatch(addEmployeeFeedbackAction(response.data.feedback))
				reset()
				setIsSubmitting(false)
			}
		} catch (err) {
			console.error(err)
			setIsSubmitting(false)
		}
	}

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={3}>
					<Stack
						alignItems="flex-start"
						direction="row"
						spacing={2}
					>
						<Avatar
							src={user?.organization?.company_logo}
							sx={{
								height: 40,
								width: 40,
							}}
						/>

						<Stack
							spacing={2}
							sx={{ width: '100%' }}
						>
							<Controller
								name="comment"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label="Comments & Notes"
										placeholder="Enter your Comment"
										fullWidth
										multiline
										rows={3}
									/>
								)}
							/>

							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Box sx={{ width: '240px' }}>
									<Controller
										name="tag"
										control={control}
										render={({ field }) => (
											<InputSelector
												mainProps={{
													label: 'Tag',
													placeholder: 'Select your tag',
												}}
												{...field}
												options={tag}
											/>
										)}
									/>
								</Box>
								<Button
									type="submit"
									variant="contained"
									disabled={isSubmitting}
									sx={{ background: theme.palette.background.default, color: 'white' }}
									startIcon={
										isSubmitting ? (
											<CircularProgress
												size={20}
												color="inherit"
											/>
										) : null
									}
									endIcon={
										<RightArrow
											width={'20px'}
											height={'18px'}
										/>
									}
								>
									Submit
								</Button>
							</Box>
						</Stack>
					</Stack>
				</Stack>
			</form>
		</FormProvider>
	)
}

export default CommentAddForm
