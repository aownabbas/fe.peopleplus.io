import type { FC } from 'react'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// mui imports
import { createTheme } from '@mui/system'
import {
	Box,
	Avatar,
	Button,
	Stack,
	TextField,
	useMediaQuery,
	CircularProgress,
} from '@mui/material'

// internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { getInitials } from '@utils/get-initials'
import { authUserSelector } from '@redux/features/authSlice'
import { useAppSelector, useAppDispatch } from '@redux/hooks.ts'
import Loading from '@components/Loading.tsx'
import { SHOW_ERROR, SHOW_INFO, SHOW_SUCCESS } from '@utils/ToastMessage'
import { isEmpty } from '@utils/bug'
import { NewComment, Comment } from 'type/asset'
import { assetsSelector, commentPostAction } from '@redux/features/assetsSlice'

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

const CommentAddForm: FC = () => {
	// const { header, form, add_text } = tokens.assets.feedback.
	const { t } = useTranslation()
	const { user } = useAppSelector(authUserSelector)
	const { asset, commentStatus } = useAppSelector(assetsSelector)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const dispatch = useAppDispatch()
	const {
		formState: { isDirty, dirtyFields, errors },
		handleSubmit,
		control,
		reset,
		register,
	} = useForm<Comment>({ defaultValues: { comment: '' } })

	const onSubmit: SubmitHandler<Comment> = async (formData) => {
		setIsSubmitting(true)
		const newComment: any = {
			asset_id: asset.id,
			comment: formData.comment,
			commented_by_id: user.id,
		}

		if (!isDirty && isEmpty(dirtyFields)) {
			SHOW_INFO({ msg: 'there is nothing to submit' })
			setIsSubmitting(false)
			return
		}
		try {
			await dispatch(commentPostAction(newComment))
			reset()
		} catch (error) {
			console.error('Error submitting comment:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack
				alignItems="flex-start"
				direction="row"
				spacing={2}
			>
				<Avatar
					src={user?.organization?.company_logo as string}
					sx={{
						height: 40,
						width: 40,
					}}
				/>

				<Stack
					spacing={3}
					sx={{ flexGrow: 1 }}
				>
					<TextField
						{...register('comment')}
						label={t(tokens.asset.feedback.comment.label)}
						placeholder={t(tokens.asset.feedback.comment.placeHolder)}
						error={!!errors.comment}
						fullWidth
						helperText={errors?.comment?.message && 'error'}
						multiline
						rows={3}
					/>
				</Stack>
			</Stack>

			<Box
				width="100%"
				display="flex"
				justifyContent="flex-end"
			>
				<Button
					type="submit"
					variant="contained"
					disabled={isSubmitting}
					sx={{ mt: 2, background: theme.palette.background.default, color: 'white' }}
					startIcon={
						isSubmitting ? (
							<CircularProgress
								size={20}
								color="inherit"
							/>
						) : null
					}
				>
					{t(tokens.asset.button.submit)}
				</Button>
			</Box>
		</form>
	)
}

export default CommentAddForm
