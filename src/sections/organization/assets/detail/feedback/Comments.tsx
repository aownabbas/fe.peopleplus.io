// mui imports
import { Box } from '@mui/material'

// local imports
import { assetsSelector } from '@redux/features/assetsSlice'
import { useAppSelector } from '@redux/hooks'
import { CommentList, CommentAddForm } from '.'

const Comments = () => {
	return (
		<Box>
			<CommentList />
			<Box
				sx={{
					pt: 3,
				}}
			>
				<CommentAddForm />
			</Box>
		</Box>
	)
}

export default Comments
