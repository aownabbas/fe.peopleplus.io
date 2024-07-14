import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'
import { Card, Grid } from '@mui/material'
import CommentBox from '@sections/organization/comments/comment'
import NoRecordFound from '@components/NoRecordFound'
import {
	employeeSelector,
	employeeSelectorStatus,
	employeefeedbackLoading,
	getEmployeeCommentsAction,
} from '@redux/features/employeeSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { CommentsLoading } from '@loading/employees'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import ActivityList from '@sections/organization/comments/Activitylist'

const Comments = () => {
	const feedbackLoading = useAppSelector(employeefeedbackLoading)
	const { feedback }: any = useAppSelector(employeeSelector).employeeFeedbackComments

	const { uuid } = useParams()
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(getEmployeeCommentsAction(uuid))
	}, [uuid])

	if (!feedback) {
		return <CommentsLoading />
	}
	return (
		<>
			<Seo title="Employee Comments" />
			<Grid
				container
				sx={{
					pb: 2,
				}}
			>
				<Grid
					xs={12}
					md={8}
				>
					<Card
						sx={{
							boxShadow: 'none !important',
							border: '1px solid #EAECF0',
							padding: '20px',
						}}
					>
						<Typography sx={{ fontSize: 14, fontWeight: 600, color: '#000000', pb: 1 }}>
							Notes & Comments
						</Typography>
						<CommentBox />
					</Card>
				</Grid>
				<Grid
					xs={12}
					md={4}
					sx={{
						paddingTop: 4,
						paddingLeft: 0,
						'@media (min-width:900px)': {
							paddingTop: 0,
							paddingLeft: 4,
						},
					}}
				>
					<Card
						sx={{
							boxShadow: 'none !important',
							border: '1px solid #EAECF0',
							padding: '20px',
						}}
					>
						<Typography sx={{ fontSize: 14, fontWeight: 600, color: '#000000', pb: 1 }}>
							Activity
						</Typography>
						<ActivityList />
					</Card>
				</Grid>
			</Grid>
		</>
	)
}

export default Comments
