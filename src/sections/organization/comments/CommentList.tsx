import NoRecordFound from '@components/NoRecordFound'
import { Scrollbar } from '@components/scrollbar'
import { SeverityPill } from '@components/severity-pill'
import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material'

import { Box } from '@mui/system'
import { employeeSelector, getEmployeeCommentsAction } from '@redux/features/employeeSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

// local imports
import { formatTime } from '@utils/times'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export type SeverityPillColor = 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success'

interface Comment {
	photo: string
	commented_by_name: string
	comment: string
	created_at: string
	severity: string
	color: SeverityPillColor
}

const colorToRgba = {
	primary: 'rgba(255, 165, 0, 0.1)', // Orange with 10% opacity
	secondary: 'rgba(156, 39, 176, 0.1)', // Maintained original color
	error: 'rgba(211, 47, 47, 0.1)', // Maintained original color
	info: 'rgba(2, 136, 209, 0.1)', // Maintained original color
	warning: 'rgba(245, 124, 0, 0.1)', // Maintained original color
	success: 'rgba(56, 142, 60, 0.1)', // Maintained original color
}

const colorToText = {
	primary: '#FFA500', // Solid orange
	secondary: '#9c27b0', // Maintained original color
	error: '#d32f2f', // Maintained original color
	info: '#0288d1', // Maintained original color
	warning: '#f57c00', // Maintained original color
	success: '#388e3c', // Maintained original color
}

const typeToColorMap: any = {
	warning: colorToText.warning,
	'breach of contract': colorToText.error,
	performance: colorToText.success,
	dependability: colorToText.info,
	professionalism: colorToText.secondary,
};

const CommentList = () => {
	const { uuid } = useParams()
	const dispatch = useAppDispatch()
	const { feedback }: any = useAppSelector(employeeSelector).employeeFeedbackComments

	const comment = useAppSelector(employeeSelector).employeeFeedback
	const [feedbackListing, setFeedbackListing] = useState<any>([])
	const newCommentRef = useRef<any>(null)
	const prevCommentRef = useRef<any>()

	useEffect(() => {
		dispatch(getEmployeeCommentsAction(uuid))
	}, [uuid])

	useEffect(() => {
		if (Array.isArray(feedback)) {
			setFeedbackListing(feedback)
		}
	}, [feedback])

	useEffect(() => {
		const prevComment: any = prevCommentRef.current

		if (comment && prevComment !== comment) {
			setFeedbackListing((prev: any) => (Array.isArray(prev) ? [...prev, comment] : [comment]))
			prevCommentRef.current = comment
		}
	}, [comment])

	useEffect(() => {
		if (newCommentRef.current) {
			newCommentRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [feedbackListing])

	const setLastCommentRef = (element: any) => {
		if (element) {
			newCommentRef.current = element
		}
	}

	return (
		<>
			<Scrollbar sx={{ maxHeight: '430px' }}>
				<Box sx={{ maxHeight: '420px' }}>
					{feedbackListing && feedbackListing.length > 0 ? (
						<List disablePadding>
							{feedbackListing.map((item: any, index: any) => (
								<ListItem
									disableGutters
									key={index}
									ref={index === feedbackListing.length - 1 ? setLastCommentRef : null}
									sx={{
										boxShadow: 'none',
										alignItems: 'start',
										flexDirection: 'column',
										'@media (min-width: 600px)': {
											flexDirection: 'row', // Change back to row for screens larger than or equal to sm
										},
									}}
								>
									<ListItemAvatar sx={{ boxShadow: 'none' }}>
										<Avatar src={item.photo} />
									</ListItemAvatar>
									<ListItemText
										primary={
											<Box
												sx={{
													display: 'flex',
													alignItems: 'start',
													width: '100%',
													justifyContent: 'space-between',
													mb: 2,
													flexDirection: 'column',
													'@media (min-width: 600px)': {
														flexDirection: 'row', // Change back to row for screens larger than or equal to sm
														alignItems: 'center',
													},
												}}
											>
												<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
													<Tooltip title={item.name}>
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
															{item.name}
														</Typography>
													</Tooltip>
													<Typography
														sx={{
															color: '#6C737F',
															fontSize: 12,
															fontWeight: 400,
														}}
													>
														{item.created_at &&
															formatTime(item.created_at.toString(), 'MMM dd yyyy hh:mm a')}
													</Typography>
												</Box>

												<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
													<Box
														sx={{
															backgroundColor: colorToRgba.primary,
															color: typeToColorMap[item.type] || colorToText.primary,
															padding: '2px 6px',
															borderRadius: '12px',
															fontSize: '13px',
															fontWeight: '500',
															lineHeight: '18px',
														}}
													>
														{item.type}
													</Box>
												</Box>
											</Box>
										}
										secondary={
											<Box>
												{item.comment && (
													<Typography
														sx={{
															fontWeight: 400,
															fontSize: 14,
															color: '#101828',
															wordBreak: 'break-word',
														}}
													>
														{item.comment}
													</Typography>
												)}
											</Box>
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