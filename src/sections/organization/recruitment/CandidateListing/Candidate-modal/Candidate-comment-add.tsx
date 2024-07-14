import type { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// mui imports
import { Avatar, Stack, Button, Box, TextField } from '@mui/material'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { isEmpty } from '@utils/bug'
import { SHOW_INFO } from '@utils/ToastMessage'
import { Candidate, NewNote } from 'type/recruitment'
import { CandidateState } from 'type/kanban'
import { candidateSelector } from '@redux/features/kanbanSlice'
import { createCandidateNoteAction, noteStatusSelector } from '@redux/features/recruitmentSlice'
import { authUserSelector, currentUserSelector } from '@redux/features/authSlice'
import Loading from '@components/Loading'
import { createTheme } from '@mui/system'
import { employeeSelector } from '@redux/features/employeeSlice'

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

interface CandidateNoteAddProps {
	candidateId: number
}

// TODO: need to refactor this code
const useCandidate = (candidateId: number): Candidate | null => {
	const data: CandidateState = useAppSelector(candidateSelector)
	const { byId } = data
	if (!candidateId) {
		return null
	}
	return byId[String(candidateId)] || null
}

export const CandidateNoteAdd: FC<CandidateNoteAddProps> = (props) => {
	const { candidateId, ...other } = props
	const candidate = useCandidate(candidateId)
	const { organization, employee } = useAppSelector(currentUserSelector)
	const notStatus = useAppSelector(noteStatusSelector)
	const { detail }: any = useAppSelector(employeeSelector)

	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const { comment } = tokens.recruitment.job_detail.candidate.note

	const {
		formState: { isDirty, dirtyFields, errors },
		handleSubmit,
		control,
		reset,
	} = useForm<NewNote>({ defaultValues: { comment: '', candidate_id: candidate?.uuid } })

	const onSubmit: SubmitHandler<NewNote> = async (values) => {
		// console.log(isDirty, dirtyFields)
		// console.log('newNote => ', values)

		if (!isDirty && isEmpty(dirtyFields)) {
			SHOW_INFO({ msg: 'There is nothing to submit' })
			return
		}
		dispatch(createCandidateNoteAction(values)).then(({ type }) => {
			if (type === 'post/note/fulfilled') {
				// console.log(data)
				reset()
			}
		})
	}

	return (
		<Stack
			alignItems="flex-start"
			direction="row"
			spacing={2}
			{...other}
		>
			{/* <Avatar src={organization?.company_logo || employee?.photo} /> */}
			<Avatar src={organization?.company_logo || detail?.photo} />

			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				sx={{ flexGrow: 1 }}
			>
				<Controller
					name="comment"
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextField
							label={t(comment.name)}
							value={String(value)}
							onChange={onChange}
							placeholder={t(comment.placeHolder)}
							onBlur={onBlur}
							error={!!errors.comment}
							fullWidth
							size="small"
							helperText={errors?.comment?.message && t(comment.helperText)}
							multiline
							rows={3}
						/>
					)}
				/>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						mt: 3,
					}}
				>
					<Button
						disabled={notStatus === 'LOADING'}
						size="small"
						type="submit"
						sx={{
							background: theme.palette.background.default,
							color: 'white',
						}}
					>
						{notStatus === 'LOADING' ? <Loading /> : 'Comment'}
					</Button>
				</Box>
			</Box>
		</Stack>
	)
}
