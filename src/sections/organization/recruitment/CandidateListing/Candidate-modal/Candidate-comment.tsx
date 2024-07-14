import type { FC } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '@redux/hooks.ts'
import { membersSelector } from '@redux/features/kanbanSlice'
import { Comment, Member } from '../../../../../types/kanban'
import { Note } from 'type/recruitment'
import { formatTime } from '@utils/times'
import { Scrollbar } from '@components/scrollbar'
import { Box, Tooltip } from '@mui/material'

const useAuthor = (authorId: string): Member | null => {
	const members = useAppSelector(membersSelector)
	return members.byId[authorId] || null
}

interface CandidateNoteProps {
	note: Note
}

export const CandidateNote: FC<CandidateNoteProps> = (props) => {
	const { note, ...other } = props
	const author = note.commented_by

	const avatar = author.company_logo || author.photo || undefined

	return (
		// <Scrollbar>
		<Box>
			<Stack
				alignItems="flex-start"
				direction="row"
				spacing={2}
				sx={{ mt: 2 }}
				{...other}
			>
				<Avatar src={avatar} />
				<Stack
					spacing={1}
					sx={{ flexGrow: 1 }}
				>
					<Tooltip title={`${author?.first_name} ${author?.last_name} `}>
						<Typography
							sx={{
								color: '#111927',
								fontWeight: 600,
								fontSize: 16,
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: '250px',
								textOverflow: 'ellipsis',
							}}
						>
							{`${author?.first_name} ${author?.last_name} `}
						</Typography>
					</Tooltip>
					{/* <Typography variant="subtitle2">{`${author?.first_name} ${author?.last_name} `}</Typography> */}
					<Paper
						sx={{
							backgroundColor: (theme) =>
								theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
							p: 2,
						}}
						variant="outlined"
					>
						<Typography
							sx={{
								fontWeight: 400,
								fontSize: 14,
								color: '#111927',
								wordBreak: 'break-word',
							}}
						>
							{note?.comment}
						</Typography>
					</Paper>
					<Typography
						color="text.secondary"
						component="p"
						variant="caption"
					>
						{formatTime(note.created_at)}
					</Typography>
				</Stack>
			</Stack>
		</Box>
		// </Scrollbar>
	)
}

CandidateNote.propTypes = {
	// @ts-ignore
	comment: PropTypes.objectOf(PropTypes.any).isRequired,
}
