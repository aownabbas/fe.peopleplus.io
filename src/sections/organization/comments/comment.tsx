// mui imports
import { Box } from '@mui/material'

// local imports
import CommentList from './CommentList'
import CommentAddForm from './CommentAddForm'

const CommentBox = () => {

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

export default CommentBox
