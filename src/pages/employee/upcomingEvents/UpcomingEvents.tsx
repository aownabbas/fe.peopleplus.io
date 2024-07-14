import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import { BreadcrumbLink } from 'type/config'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core'
import Calendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import type { EventResizeDoneArg } from '@fullcalendar/interaction'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'

import { Seo } from '@components/seo'
import { useDialog } from '@hooks/use-dialog'
// import { usePageView } from '@hooks/u'
import { CalendarToolbar } from '@sections/employee/upcomingEvents/Calendar-toolbar'
import { CalendarContainer } from '@components/Container'

import type {
	CalendarEvent,
	CalendarView,
	CreateDialogData,
	UpdateDialogData,
} from 'type/upcomingevents'
import UpcomingEventsWidgets from '@sections/organization/upcomingEvent/UpcomingEventsWidgets'
import { EventsSection } from '@sections/organization/dashboard'
import NoRecordFound from '@components/NoRecordFound'
import { Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { editEvent, eventListAction, eventSelector, openModal } from '@redux/features/eventsSlice'
import CalendarSkeleton from '@components/Skeletons/CalendarSkeleton'
import FeaturedEvents from '@sections/organization/upcomingEvent/FeaturedEvents'
import { CreateEvent } from '@sections/organization/upcomingEvent/calendar'
import { ViewEvent } from '@sections/employee/upcomingEvents/ViewEvent'
import { EventContent } from '@components/EventContent'

const useCurrentEvent = (
	events: CalendarEvent[],
	dialogData?: UpdateDialogData,
): CalendarEvent | undefined => {
	return useMemo((): CalendarEvent | undefined => {
		if (!dialogData) {
			return undefined
		}

		return events.find((event) => event.id === dialogData!.eventId)
	}, [dialogData, events])
}

const UpcomingEvent = () => {
	const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null)
	const isModalOpen = useAppSelector(eventSelector).isModalOpen

	const { t } = useTranslation()
	const events = useAppSelector(eventSelector).event.listing
	const status = useAppSelector(eventSelector).status

	const dispatch = useAppDispatch()

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.upcoming_event.breadcrumbs.dashboard, url: '/' },
		{ label: tokens.upcoming_event.breadcrumbs.upcoming_events, color: 'black' },
	]

	const calendarRef = useRef<Calendar | null>(null)

	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const [date, setDate] = useState<Date>(new Date())
	const [view, setView] = useState<CalendarView>(mdUp ? 'timeGridDay' : 'dayGridMonth')
	const [dateRange, setDateRange] = useState<string>('')

	const createDialog = useDialog<CreateDialogData>()
	const updateDialog = useDialog<UpdateDialogData>()

	const modifiedViewState = () => {
		let modified
		if (view == 'timeGridDay') {
			modified = 'day'
		}
		if (view == 'dayGridMonth') {
			modified = 'month'
		}
		if (view == 'timeGridWeek') {
			modified = 'week'
		}

		return modified
	}

	// const formatDateToString = (date: Date): string => {
	// 	const day = date.getDate().toString().padStart(2, '0')
	// 	const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-indexed
	// 	const year = date.getFullYear().toString()
	// 	return `${day}-${month}-${year}`
	// }

	const formatDateToString = (date: Date): string => {
		const day = date.getDate().toString().padStart(2, '0')
		const monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
		const month = monthNames[date.getMonth()] // Months are zero-indexed
		const year = date.getFullYear().toString()
		return `${day} ${month} ${year}`
	}

	const handleScreenResize = useCallback((): void => {
		const calendarEl = calendarRef.current

		if (calendarEl) {
			const calendarApi = calendarEl.getApi()
			const newView = mdUp ? 'dayGridMonth' : 'timeGridDay'

			calendarApi.changeView(newView)
			setView(newView)
		}
	}, [calendarRef, mdUp])

	useEffect(() => {
		handleScreenResize()
	}, [mdUp])

	useEffect(() => {
		const formattedDate = formatDateToString(date)
		dispatch(eventListAction({ date: formattedDate, type: modifiedViewState() }))
	}, [])

	// const handleViewChange = useCallback((view: CalendarView): void => {
	// 	const calendarEl = calendarRef.current

	// 	if (calendarEl) {
	// 		const calendarApi = calendarEl.getApi()

	// 		calendarApi.changeView(view)
	// 		setView(view)
	// 	}
	// }, [])

	const handleViewChange = useCallback(
		(view: CalendarView): void => {
			const calendarEl = calendarRef.current
			if (calendarEl) {
				const calendarApi = calendarEl.getApi()
				calendarApi.changeView(view)
				setView(view)

				// Add this block to set the date range immediately upon view change
				if (view === 'listWeek') {
					const start = calendarApi.view.currentStart
					const end = calendarApi.view.currentEnd
					const adjustedEnd = new Date(end)
					adjustedEnd.setDate(adjustedEnd.getDate() - 1)
					const formattedStart = formatDateToString(start)
					const formattedEnd = formatDateToString(adjustedEnd)
					setDateRange(`${formattedStart} - ${formattedEnd}`)
				} else {
					setDateRange('')
				}
			}
		},
		[calendarRef],
	)

	const handleDateToday = useCallback((): void => {
		const calendarEl = calendarRef.current

		if (calendarEl) {
			const calendarApi = calendarEl.getApi()

			calendarApi.today()
			setDate(calendarApi.getDate())
		}
	}, [])

	const handleDatePrev = useCallback((): void => {
		const calendarEl = calendarRef.current

		if (calendarEl) {
			const calendarApi = calendarEl.getApi()

			calendarApi.prev()
			setDate(calendarApi.getDate())
			const formattedDate = formatDateToString(calendarApi.getDate())
			dispatch(eventListAction({ date: formattedDate, type: modifiedViewState() }))
		}
	}, [])

	const handleDateNext = useCallback((): void => {
		const calendarEl = calendarRef.current

		if (calendarEl) {
			const calendarApi = calendarEl.getApi()
			calendarApi.next()
			setDate(calendarApi.getDate())
			const formattedDate = formatDateToString(calendarApi.getDate())
			dispatch(eventListAction({ date: formattedDate, type: modifiedViewState() }))
		}
	}, [])

	const handleAddClick = useCallback((): void => {
		createDialog.handleOpen()
	}, [createDialog])

	const handleRangeSelect = useCallback(
		(arg: DateSelectArg): void => {
			const calendarEl = calendarRef.current

			if (calendarEl) {
				const calendarApi = calendarEl.getApi()

				calendarApi.unselect()
			}

			createDialog.handleOpen({
				range: {
					start: arg.start.getTime(),
					end: arg.end.getTime(),
				},
			})
		},
		[createDialog],
	)

	// const handleEventSelect = useCallback(
	// 	(arg: EventClickArg): void => {
	// 		dispatch(openModal())
	// 		dispatch(editEvent({ eventId: arg.event.id }))
	// 	},
	// 	[updateDialog],
	// )

	const handleEventSelect = useCallback(
		(arg: EventClickArg): void => {
			// Get the FullCalendar popover and close it
			const morePopover = document.querySelector('.fc-more-popover') as HTMLElement
			if (morePopover) morePopover.style.display = 'none'

			dispatch(openModal())
			dispatch(editEvent({ eventId: arg.event.id }))
		},
		[updateDialog],
	)

	const handleEventResize = (arg: EventResizeDoneArg) => {
		const { event } = arg
	}

	const handleEventDrop = (arg: EventDropArg) => {
		const { event, revert } = arg
		revert()
	}

	const handleDatesSet = (arg: any) => {
		if (view === 'listWeek') {
			const start = new Date(arg.start)
			const end = new Date(arg.end)
			const adjustedEnd = new Date(end)
			adjustedEnd.setDate(adjustedEnd.getDate() - 1)
			const formattedStart = formatDateToString(start)
			const formattedEnd = formatDateToString(adjustedEnd)
			setDateRange(`${formattedStart} - ${formattedEnd}`)
		} else {
			setDateRange('')
		}
	}

	return (
		<>
			<Seo title={t(tokens.seo_titles.calendar)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						{/* breadcrumbs */}
						<CustomBreadcrumbs links={breadcrumbsLinks} />
						{/* calender toolbar */}
						<CalendarToolbar
							date={date}
							onAddClick={handleAddClick}
							onDateNext={handleDateNext}
							onDatePrev={handleDatePrev}
							onDateToday={handleDateToday}
							onViewChange={handleViewChange}
							view={view}
						/>
						<UpcomingEventsWidgets />
						{/* Calender */}
						<Grid
							container
							spacing={2}
						>
							<Grid
								xs={12}
								md={12}
							>
								<Card>
									{status == 'LOADING' && events.length == 0 ? (
										<CalendarSkeleton />
									) : (
										<CalendarContainer>
											{view === 'listWeek' && (
												<Typography
													variant="h6"
													sx={{ padding: '16px' }}
												>
													{dateRange}
												</Typography>
											)}
											<Calendar
												allDayMaintainDuration
												allDayText="All day"
												dayMaxEventRows={3}
												// droppable
												// editable={false}
												eventClick={handleEventSelect}
												eventContent={EventContent}
												eventDisplay="block"
												eventDrop={handleEventDrop}
												eventResizableFromStart
												eventResize={handleEventResize}
												events={events}
												headerToolbar={false}
												height={1200}
												initialDate={date}
												initialView={view}
												plugins={[
													dayGridPlugin,
													interactionPlugin,
													listPlugin,
													timeGridPlugin,
													timelinePlugin,
												]}
												ref={calendarRef}
												rerenderDelay={10}
												select={handleRangeSelect}
												datesSet={handleDatesSet}
												selectable
												weekends
												views={{
													timeGridDay: {
														dayHeaderFormat: {
															weekday: 'long',
															// month: 'numeric',
															day: 'numeric',
															omitCommas: true,
														},
													},
													listWeek: {
														noEventsContent: 'No events to display',
													},
												}}
											/>
										</CalendarContainer>
									)}
								</Card>
							</Grid>
							{/* <Grid
								xs={12}
								md={4}
							>
								<FeaturedEvents />
							</Grid> */}
						</Grid>
					</Stack>
				</Container>
			</Box>

			<ViewEvent open={isModalOpen} />
		</>
	)
}

export default UpcomingEvent
