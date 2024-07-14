import { FC } from 'react'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { PolicyFind } from './PolicyFind'
import DocumentsRecord from './DocumentsRecord'
import { Documents, PolicyStatus } from 'type/policies'

interface PolicyWidgetProps {
	list: Documents
}

const PolicyWidget: FC<PolicyWidgetProps> = ({ list }) => {
	const publishedCount = list.filter(
		(document) => document.status === PolicyStatus.Published,
	).length
	const totalCount = list.length

	return (
		<Grid container>
			<Grid
				xs={12}
				xl={6}
			>
				<DocumentsRecord
					published={publishedCount}
					total={totalCount}
				/>
			</Grid>
			<Grid
				xs={12}
				xl={6}
			>
				<PolicyFind />
			</Grid>
		</Grid>
	)
}

export default PolicyWidget
