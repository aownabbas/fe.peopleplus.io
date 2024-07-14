// mui imports
import {
	Avatar,
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material'

// local imports
import NoRecordFound from '@components/NoRecordFound'
import { Scrollbar } from '@components/scrollbar'
import { employeeSelector } from '@redux/features/employeeSlice'
import { useAppSelector } from '@redux/hooks'

// Utility function to simulate time formatting
const formatTime = (dateString: string | number | Date, format: string) => {
	const date = new Date(dateString)
	return date.toLocaleString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	})
}

const staticActivity = [
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'John Doe',
		created_at: '2023-10-05T14:48:00.000Z',
		new_value: 'Status: Completed',
		old_value: 'Status: In Progress',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
	{
		photo: 'https://via.placeholder.com/150',
		updated_by: 'Jane Smith',
		created_at: '2023-10-04T10:30:00.000Z',
		new_value: 'Priority: High',
		old_value: 'Priority: Medium',
	},
]

const ActivityList = () => {
	// const activity = staticActivity
	const { activity }: any = useAppSelector(employeeSelector).employeeFeedbackComments
	console.log(activity, 'hello')

	if (!activity || activity.length === 0) {
		return <NoRecordFound />
	}

	return (
		<Scrollbar sx={{ maxHeight: '580px' }}>
			<Box sx={{ maxHeight: '570px' }}>
				<List disablePadding>
					{activity?.map((data: any, index: any) => (
						<ListItem
							disableGutters
							key={index}
							sx={{ boxShadow: 'none', alignItems: 'start' }}
						>
							<ListItemAvatar sx={{ boxShadow: 'none', mt: 1 }}>
								<Avatar src={data.photo} />
							</ListItemAvatar>

							<ListItemText
								primary={
									<Tooltip title={data.name}>
										<Typography
											sx={{
												color: '#111927',
												fontWeight: 500,
												fontSize: 14,
												whiteSpace: 'nowrap',
												overflow: 'hidden',
												maxWidth: {
													xs: '130px',
													sm: '200px',
												},
												textOverflow: 'ellipsis',
											}}
										>
											{data.name}
										</Typography>
									</Tooltip>
								}
								secondary={
									<Box>
										<Typography sx={{ fontSize: 12, fontWeight: 400, color: 'gray' }}>
											{data.created_at &&
												formatTime(data.created_at.toString(), 'MMM dd yyyy hh:mm a')}
										</Typography>

										<Tooltip title={data?.message}>
											<Typography
												sx={{
													color: '#6C737F',
													fontWeight: 400,
													fontSize: 14,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													maxWidth: {
														xs: '100%',
														sm: '100%',
													},
													textOverflow: 'ellipsis',
												}}
											>
												{data?.message}
											</Typography>
										</Tooltip>

										<Tooltip title={data?.new_value}>
											<Typography
												sx={{
													color: '#6C737F',
													fontWeight: 400,
													fontSize: 14,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													maxWidth: {
														xs: '100%',
														sm: '100%',
													},
													textOverflow: 'ellipsis',
												}}
											>
												{`New Value: ${data?.new_value} `}
											</Typography>
										</Tooltip>
										<Tooltip title={data?.old_value}>
											<Typography
												sx={{
													color: '#6C737F',
													fontWeight: 400,
													fontSize: 14,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													maxWidth: {
														xs: '100%',
														sm: '100%',
													},
													textOverflow: 'ellipsis',
												}}
											>
												{`Old Value: ${data?.old_value}`}
											</Typography>
										</Tooltip>
									</Box>
								}
							/>
						</ListItem>
					))}
				</List>
			</Box>
		</Scrollbar>
	)
}

export default ActivityList
