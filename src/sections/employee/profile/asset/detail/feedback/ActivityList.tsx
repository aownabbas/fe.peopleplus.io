// mui  imports
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
import { assetsSelector } from '@redux/features/assetsSlice'
import { useAppSelector } from '@redux/hooks'
import { formatTime } from '@utils/times'
import RecordNotFound from '@components/RecordNotFound'
import { Scrollbar } from '@components/scrollbar'

const ActivityList = () => {
	const {
		asset: { activity },
	} = useAppSelector(assetsSelector)

	if (!activity || activity.length === 0) {
		return <RecordNotFound />
	}

	return (
		<>
			<Scrollbar sx={{ maxHeight: '580px' }}>
				<Box
					sx={{
						maxHeight: '570px',
					}}
				>
					<List disablePadding>
						{activity.map((data, index) => (
							<ListItem
								disableGutters
								key={index}
								sx={{ boxShadow: 'none' }}
							>
								<ListItemAvatar sx={{ boxShadow: 'none' }}>
									<Avatar src={data.photo} />
								</ListItemAvatar>
								<ListItemText
									primary={
										<Tooltip title={data.updated_by}>
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
												{data.updated_by}
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
															xs: '130px',
															sm: '200px',
														},
														textOverflow: 'ellipsis',
													}}
												>
													{data?.message}
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
		</>
	)
}

export default ActivityList
