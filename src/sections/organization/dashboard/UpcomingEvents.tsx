import React from 'react' // Make sure to import React
import type { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { useAppSelector } from '@redux/hooks'
import { dashboardEventsSelector } from '@redux/features/dashboardSlice'
import RecordNotFound from '@components/NoRecordFound'
import { Box, Tooltip } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'
import { eventSelector } from '@redux/features/eventsSlice'
import { dateFormatMilliSeconds } from '@utils/date-format'

export const UpcomingEvents: FC = () => {
	const eventData = useAppSelector(eventSelector).event.listing

	const currentDate = Date.now()
	const events = eventData
		.filter((event: { start: number }) => event.start > currentDate)
		.slice(0, 5)

	// Check if there are no events
	if (!events || events.length === 0) {
		return <RecordNotFound />
	}

	return (
		<List disablePadding>
			{events.length > 0 ? (
				events.map((e: any) => (
					<ListItem
						key={e.uuid}
						sx={{ pl: 1 }}
						dense
						disableGutters
					>
						<img
							src={e.eventIcon}
							style={{ width: '40px' }}
						/>
						<Link
							style={{
								color: 'black',
								textDecoration: 'none',
								fontWeight: '500',
								width: '100%',
							}}
							to={e.uuid ? `/employee/profile/${e.uuid}` : '/events'}
						>
							<ListItemText
								sx={{ px: 2 }}
								primary={
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 1,
											width: '100%',
											justifyContent: 'space-between',
										}}
									>
										<Tooltip title={e.title}>
											<Typography
												sx={{
													color: '#111927',
													fontWeight: 500,
													fontSize: 14,
													textWrap: 'nowrap',
													overflow: 'hidden',
													maxWidth: '230px',
													textOverflow: 'ellipsis',
												}}
											>
												{e.title}
											</Typography>
										</Tooltip>

										<Typography sx={{ fontSize: 12, fontWeight: 400, color: '6C737F' }}>
											{dateFormatMilliSeconds(e.start)}
										</Typography>
									</Box>
								}
								secondary={
									<Tooltip title={capitalizeFirstLetter(e.category)}>
										<Typography
											sx={{
												color: '#111927',
												fontWeight: 600,
												fontSize: 14,
												textWrap: 'nowrap',
												overflow: 'hidden',
												maxWidth: '150px',
												textOverflow: 'ellipsis',
											}}
										>
											{capitalizeFirstLetter(e.category)}
										</Typography>
									</Tooltip>
								}
							/>
						</Link>
					</ListItem>
				))
			) : (
				<RecordNotFound />
			)}
		</List>
	)
}
