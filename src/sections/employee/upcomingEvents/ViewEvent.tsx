import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import { Typography, Box, Stack, Divider, Tooltip, IconButton, Avatar } from '@mui/material'
import { Scrollbar } from '@components/scrollbar'
import { SeverityPill } from '@components/severity-pill'
import CloseIcon from '@untitled-ui/icons-react/build/esm/XClose'
import { closeModal, eventSelector } from '@redux/features/eventsSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { dateFormatMilliSeconds } from '@utils/date-format'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

interface ViewEventDialogProps {
	open?: boolean
}

export const ViewEvent: React.FC<ViewEventDialogProps> = ({ open = false }) => {
	const dispatch = useAppDispatch()
	const detail = useAppSelector(eventSelector).event.detail
	const startDate = Number(detail?.start)
	const endDate = Number(detail?.end)
	const handleClose = () => {
		dispatch(closeModal())
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth={true}
			maxWidth="sm"
			aria-labelledby="dialog-title"
			aria-describedby="dialog-description"
		>
			<IconButton
				onClick={handleClose}
				sx={{ position: 'absolute', right: 8, top: 8 }}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent dividers>
				<Stack spacing={2}>
					<Stack>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 2 }}>
								{/* <Avatar src={detail?.photo ? detail.photo : detail?.eventIcon} /> */}
								{detail?.photo ? <Avatar src={detail.photo} /> : <img src={detail?.eventIcon} />}

								<Stack>
									<Tooltip title={detail?.title}>
										<Typography
											sx={{
												color: '#111927',
												fontWeight: 700,
												fontSize: 18,
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												maxWidth: '350px',
											}}
										>
											{detail?.title}
										</Typography>
									</Tooltip>
									<Tooltip title={detail?.job_title}>
										<Typography
											sx={{
												color: '#6C737F',
												fontWeight: 500,
												fontSize: 14,
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												maxWidth: '350px',
											}}
										>
											{detail?.job_title}
										</Typography>
									</Tooltip>
								</Stack>
							</Box>
							{/* <Box sx={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
								{detail?.featured === 1 && <SeverityPill color="info">Featured</SeverityPill>}
							</Box> */}
						</Box>
						<Divider sx={{ mt: 1 }} />
					</Stack>

					<Stack>
						<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 15 }}>
							{t(tokens.upcoming_event.view_event.Category)}
						</Typography>
						<Typography sx={{ color: '#6C737F', fontWeight: 400, fontSize: 14 }}>
							{detail?.category.charAt(0).toUpperCase() + detail?.category.slice(1)}
						</Typography>
						<Divider sx={{ mt: 1 }} />
					</Stack>

					{detail?.description && (
						<Stack>
							<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 15 }}>
								{t(tokens.upcoming_event.view_event.description)}
							</Typography>
							<Scrollbar sx={{ maxHeight: 200 }}>
								<Typography
									sx={{
										color: '#6C737F',
										fontWeight: 400,
										fontSize: 14,
										wordBreak: 'break-word',
									}}
								>
									{detail?.description}
								</Typography>
							</Scrollbar>
							<Divider sx={{ mt: 1 }} />
						</Stack>
					)}

					<Stack>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}
						>
							{/* <Stack sx={{ width: '50%' }}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Stack>
										<Typography
											sx={{ color: '#111927', fontWeight: 600, fontSize: 15, textAlign: 'center' }}
										>
											{t(tokens.upcoming_event.view_event.start_date)}
										</Typography>
										<Typography sx={{ color: '#6C737F', fontWeight: 400, fontSize: 14 }}>
											{detail ? dateFormatMilliSeconds(startDate) : ''}
										</Typography>
									</Stack>
									<Stack>
										{detail?.allDay === 0 && (
											<>
												<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 15 }}>
													& Time
												</Typography>
												<Typography
													sx={{
														color: '#6C737F',
														fontWeight: 400,
														fontSize: 14,
													}}
												>
													``
													{detail ? dateFormatMilliSeconds(startDate, 'h:mm a') : ''}
												</Typography>
											</>
										)}
									</Stack>
								</Box>
							</Stack>
							<Stack sx={{ width: '50%' }}>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Stack>
										<Typography
											sx={{ color: '#111927', fontWeight: 600, fontSize: 15, textAlign: 'center' }}
										>
											{t(tokens.upcoming_event.view_event.end_date)}
										</Typography>
										<Typography sx={{ color: '#6C737F', fontWeight: 400, fontSize: 14 }}>
											{detail ? dateFormatMilliSeconds(endDate) : ''}
										</Typography>
									</Stack>
									<Stack>
										{detail?.allDay === 0 && (
											<>
												<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 15 }}>
													& Time
												</Typography>
												<Typography
													sx={{
														color: '#6C737F',
														fontWeight: 400,
														fontSize: 14,
													}}
												>
													{detail ? dateFormatMilliSeconds(endDate, 'h:mm a') : ''}
												</Typography>
											</>
										)}
									</Stack>
								</Box>
							</Stack> */}

							<Stack>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography
										sx={{ color: '#111927', fontWeight: 600, fontSize: 15, textAlign: 'center' }}
									>
										{t(tokens.upcoming_event.view_event.start_date)}
									</Typography>
									{detail?.allDay === 0 && (
										<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 15 }}>
											{t(tokens.upcoming_event.view_event.time_heading)}
										</Typography>
									)}
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography sx={{ color: '#6C737F', fontWeight: 400, fontSize: 14 }}>
										{detail ? dateFormatMilliSeconds(startDate) : ''}
									</Typography>
									{detail?.allDay === 0 && (
										<Typography
											sx={{
												color: '#6C737F',
												fontWeight: 400,
												fontSize: 14,
											}}
										>
											{detail ? dateFormatMilliSeconds(startDate, 'h:mm a') : ''}
										</Typography>
									)}
								</Box>
							</Stack>

							<Stack>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography
										sx={{ color: '#111927', fontWeight: 600, fontSize: 15, textAlign: 'center' }}
									>
										{t(tokens.upcoming_event.view_event.end_date)}
									</Typography>

									{detail?.allDay === 0 && (
										<Typography sx={{ color: '#111927', fontWeight: 600, fontSize: 15 }}>
											{t(tokens.upcoming_event.view_event.time_heading)}
										</Typography>
									)}
								</Box>

								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									<Typography sx={{ color: '#6C737F', fontWeight: 400, fontSize: 14 }}>
										{detail ? dateFormatMilliSeconds(endDate) : ''}
									</Typography>

									{detail?.allDay === 0 && (
										<Typography
											sx={{
												color: '#6C737F',
												fontWeight: 400,
												fontSize: 14,
											}}
										>
											{detail ? dateFormatMilliSeconds(endDate, 'h:mm a') : ''}
										</Typography>
									)}
								</Box>
							</Stack>
						</Box>
						<Divider sx={{ mt: 1 }} />
					</Stack>
				</Stack>
			</DialogContent>
		</Dialog>
	)
}
