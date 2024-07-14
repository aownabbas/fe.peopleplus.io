// mui  imports
import NoRecordFound from '@components/NoRecordFound'
import { Scrollbar } from '@components/scrollbar'
import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material'
import { Box } from '@mui/system'

// local imports
import { assetsSelector } from '@redux/features/assetsSlice'
import { useAppSelector } from '@redux/hooks'
import { formatTime } from '@utils/times'

const CommentList = () => {
	const {
		asset: { asset_comments },
	} = useAppSelector(assetsSelector)

	return (
		<>
			<Scrollbar sx={{ maxHeight: '580px' }}>
				<Box sx={{ maxHeight: '570px' }}>
					{asset_comments && asset_comments.length > 0 ? (
						<List disablePadding>
							{asset_comments.map((comment, index) => (
								<ListItem
									disableGutters
									key={index}
									sx={{ boxShadow: 'none' }}
								>
									<ListItemAvatar sx={{ boxShadow: 'none' }}>
										<Avatar src={comment.photo} />
									</ListItemAvatar>
									<ListItemText
										primary={
											<Tooltip title={comment.commented_by_name}>
												<Typography
													sx={{
														fontWeight: 500,
														fontSize: 14,
														color: '#111927',
														textWrap: 'nowrap',
														overflow: 'hidden',
														maxWidth: '200px',
														textOverflow: 'ellipsis',
													}}
												>
													{comment.commented_by_name}
												</Typography>
											</Tooltip>
										}
										secondary={
											// <div>
											// 	{comment.comment && (
											// 		<Typography
											// 			sx={{
											// 				fontWeight: 400,
											// 				fontSize: 14,
											// 				color: '#111927',
											// 				wordBreak: 'break-word',
											// 			}}
											// 		>
											// 			{comment.comment}
											// 		</Typography>
											// 	)}
											// 	<Typography
											// 		sx={{
											// 			color: '#6C737F',
											// 			fontSize: 12,
											// 			fontWeight: 400,
											// 		}}
											// 	>
											// 		{comment.created_at &&
											// 			formatTime(comment.created_at.toString(), 'MMM dd yyyy hh:mm a')}
											// 	</Typography>
											// </div>
											<div>
												<Typography
													sx={{
														color: '#6C737F',
														fontSize: 12,
														fontWeight: 400,
													}}
												>
													{comment.created_at &&
														formatTime(comment.created_at.toString(), 'MMM dd yyyy hh:mm a')}
												</Typography>
												{comment.comment && (
													<Typography
														sx={{
															fontWeight: 400,
															fontSize: 14,
															color: '#111927',
															wordBreak: 'break-word',
														}}
													>
														{comment.comment}
													</Typography>
												)}
											</div>
										}
									/>
								</ListItem>
							))}
						</List>
					) : (
						<NoRecordFound />
					)}
				</Box>
			</Scrollbar>
		</>
	)
}

export default CommentList
