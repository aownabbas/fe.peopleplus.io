import React, { FC, useState, useEffect } from 'react'
import { Box, Card, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@redux/hooks'
import { eventSelector } from '@redux/features/eventsSlice'
import CardSkeleton from '@components/Skeletons/Card'

const UpcomingEventsWidgets: FC = () => {
	const { t } = useTranslation()
	const categoryCounts = useAppSelector(eventSelector).event.categoryCounts
	const listing = useAppSelector(eventSelector).event.listing
	const status = useAppSelector(eventSelector).status

	const categories = [
		{ label: 'events', count: categoryCounts.event, icon: '/Party.svg' },
		{ label: 'holidays', count: categoryCounts.holidays, icon: '/Diamond.svg' },
		{ label: 'birthdays', count: categoryCounts.birthday, icon: '/Birthday.svg' },
		{ label: 'misc', count: categoryCounts.misc, icon: '/Rocket.svg' },
	]

	const filteredCategories = categories.filter((category) => category.count > 0)

	return (
		<Box>
			<Grid
				container
				spacing={3}
			>
				{status === 'LOADING'
					? Array.from(new Array(4)).map((_, index) => (
							<Grid
								key={index}
								xs={12}
								md={6}
								lg={3}
								xl={3}
							>
								<CardSkeleton
									direction="row"
									avatar
									titleLines={1}
									contentLines={1}
								/>
							</Grid>
						))
					: filteredCategories.map((event, index) => (
							<Grid
								key={index}
								xs={12}
								md={6}
								lg={3}
								xl={3}
							>
								<Card>
									<Stack
										alignItems="center"
										direction="row"
										spacing={2}
										sx={{ p: 2 }}
									>
										<img
											src={event.icon}
											style={{ width: '50px', height: '50px' }}
										/>
										<Stack sx={{ flexGrow: 1 }}>
											<Typography
												color="text.secondary"
												variant="overline"
											>
												{t(event.label)}
											</Typography>
											<Typography variant="h5">{event.count}</Typography>
										</Stack>
									</Stack>
								</Card>
							</Grid>
						))}
			</Grid>
		</Box>
	)
}

export default UpcomingEventsWidgets
