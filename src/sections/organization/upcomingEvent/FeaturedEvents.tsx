import NoRecordFound from '@components/NoRecordFound'
import { Scrollbar } from '@components/scrollbar'
import {
	Avatar,
	Box,
	Card,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Table,
	TableBody,
	Tooltip,
	Typography,
	createTheme,
} from '@mui/material'
import { maxHeight } from '@mui/system'
import { eventSelector } from '@redux/features/eventsSlice'
import { useAppSelector } from '@redux/hooks'
import { dateFormatMilliSeconds } from '@utils/date-format'
import React from 'react'
import type { CalendarEvent } from 'type/upcomingevents'
import FeaturedEventsSkeleton from '@components/Skeletons/FeaturedEventsSkeleton'
import CardSkelton from '@components/Skeletons/Card'
import { TableSkeleton } from '@components/Skeletons'
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter'

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)', // Adjust colors as needed
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const FeaturedEvents = () => {
	const featuredEvent = useAppSelector(eventSelector).event.listing
	const filteredEvents = featuredEvent.filter((event: { featured: number }) => event.featured == 1)
	const status = useAppSelector(eventSelector).status

	return (
		<Card
			sx={{
				boxShadow: 'none !important',
				border: '1px solid #EAECF0',
				padding: '20px',
				mt: 3,
				'@media (min-width:600px)': {
					mt: 0,
					ml: 3,
				},
			}}
		>
			<Typography sx={{ fontSize: 14, color: '#6C737F', lineHeight: '24px', fontWeight: 500 }}>
				Featured Events
			</Typography>
			{status == 'LOADING' && featuredEvent.length == 0 ? (
				Array.from(new Array(5)).map((_, index) => (
					<Table key={index}>
						<TableBody>
							<TableSkeleton
								columns={1}
								rows={1}
								avatarColumn={0}
							/>
						</TableBody>
					</Table>
				))
			) : (
				<Scrollbar sx={{ maxHeight: 715 }}>
					<Box sx={{ maxHeight: 720 }}>
						<List disablePadding>
							{filteredEvents.length > 0 ? (
								filteredEvents.map((e: CalendarEvent) => (
									<ListItem
										dense
										disableGutters
										key={e.id}
									>
										<img
											src={e.eventIcon}
											style={{ width: '40px' }}
										/>
										<ListItemText
											sx={{ pl: 2 }}
											primary={
												<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
													<Tooltip title={e.title}>
														<Typography
															sx={{
																color: '#111927',
																fontWeight: 500,
																fontSize: 14,
																textWrap: 'nowrap',
																overflow: 'hidden',
																maxWidth: '150px',
																textOverflow: 'ellipsis',
															}}
														>
															{e.title}
														</Typography>
													</Tooltip>
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
												</Box>
											}
											secondary={
												<Typography sx={{ fontSize: 14, fontWeight: 400, color: '6C737F' }}>
													{dateFormatMilliSeconds(e.start)}
												</Typography>
											}
										/>
									</ListItem>
								))
							) : (
								// Render NoRecordFound component if there is no featured data
								<NoRecordFound />
							)}
						</List>
					</Box>
				</Scrollbar>
			)}
		</Card>
	)
}

export default FeaturedEvents
