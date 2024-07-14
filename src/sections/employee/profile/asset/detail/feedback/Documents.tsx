import { Grid, Stack } from '@mui/material'
import { DocumentList, DocumentUploader } from '.'

const Documents = () => {
	return (
		<Stack spacing={0}>
			<Grid
				xs={12}
				md={12}
			>
				<DocumentUploader />
				<DocumentList />
			</Grid>
		</Stack>
	)
}

export default Documents
