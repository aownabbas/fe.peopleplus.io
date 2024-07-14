import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import { BreadcrumbLink } from 'type/config'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
	DateSelectArg,
	EventClickArg,
	EventDropArg,
	EventContentArg,
} from '@fullcalendar/core'
import Calendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import timelinePlugin from '@fullcalendar/timeline'
import { Avatar, Box, Card, Container, Stack, useMediaQuery, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import type { Theme } from '@mui/material/styles/createTheme'
import { Seo } from '@components/seo'
import CalendarSkeleton from '@components/Skeletons/CalendarSkeleton'
import { useDialog } from '@hooks/use-dialog'
import { CreateEvent, CalendarToolbar } from '@sections/organization/upcomingEvent/calendar'
import { CalendarContainer } from '@components/Container'

import type {
	CalendarEvent,
	CalendarView,
	CreateDialogData,
	UpdateDialogData,
} from 'type/upcomingevents'
import UpcomingEventsWidgets from '@sections/organization/upcomingEvent/UpcomingEventsWidgets'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	editEvent,
	eventListAction,
	eventSelector,
	eventStoreAction,
	openModal,
} from '@redux/features/eventsSlice'
import FeaturedEvents from '@sections/organization/upcomingEvent/FeaturedEvents'
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

const plugins = [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin, timelinePlugin]

const UpcomingEvent = () => {
	const events = useAppSelector(eventSelector).event.listing
	const detail = useAppSelector(eventSelector).event.detail
	const status = useAppSelector(eventSelector).status
	const isModalOpen = useAppSelector(eventSelector).isModalOpen

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

	const modifiedViewState = () => {
		let modified
		if (view === 'timeGridDay') {
			modified = 'day'
		} else if (view === 'dayGridMonth') {
			modified = 'month'
		} else if (view === 'timeGridWeek') {
			modified = 'week'
		}
		return modified
	}

	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.upcoming_event.breadcrumbs.dashboard, url: '/' },
		{ label: tokens.upcoming_event.breadcrumbs.upcoming_events, color: 'black' },
	]

	const calendarRef = useRef<Calendar | null>(null)

	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
	const [date, setDate] = useState<Date>(new Date())
	const [view, setView] = useState<CalendarView>(mdUp ? 'dayGridMonth' : 'timeGridDay')
	const [dateRange, setDateRange] = useState<string>('')
	const createDialog = useDialog<CreateDialogData>()
	const updateDialog = useDialog<UpdateDialogData>()

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
	}, [mdUp, handleScreenResize])

	useEffect(() => {
		const formattedDate = formatDateToString(date)
		dispatch(eventListAction({ date: formattedDate, type: modifiedViewState() }))
	}, [date, dispatch])

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
	}, [dispatch])

	const handleDateNext = useCallback((): void => {
		const calendarEl = calendarRef.current

		if (calendarEl) {
			const calendarApi = calendarEl.getApi()
			calendarApi.next()
			setDate(calendarApi.getDate())
			const formattedDate = formatDateToString(calendarApi.getDate())
			dispatch(eventListAction({ date: formattedDate, type: modifiedViewState() }))
		}
	}, [dispatch])

	const handleAddClick = useCallback((): void => {
		createDialog.handleOpen()
		dispatch(openModal())
	}, [dispatch, createDialog])

	const handleRangeSelect = useCallback(
		(arg: DateSelectArg): void => {
			const calendarEl = calendarRef.current

			if (calendarEl) {
				const calendarApi = calendarEl.getApi()
				calendarApi.unselect() // Unselect previously selected range
			}

			createDialog.handleOpen({
				range: {
					start: arg.start.getTime(),
					end: arg.end.getTime() - 1,
				},
			})
			dispatch(openModal())
		},
		[createDialog, dispatch],
	)

	const handleEventSelect = useCallback(
		(arg: EventClickArg): void => {
			// Get the FullCalendar popover and close it
			const morePopover = document.querySelector('.fc-more-popover') as HTMLElement
			if (morePopover) morePopover.style.display = 'none'

			dispatch(openModal())
			dispatch(editEvent({ eventId: arg.event.id }))
		},
		[dispatch],
	)

	const getEventValues = (event: any) => ({
		id: event.extendedProps.uuid,
		start_date_time: event.start,
		end_date_time: event.end,
		title: event.title,
		category: event.extendedProps.category,
		full_day: event.allDay,
		featured: event.extendedProps.featured,
		description: event.extendedProps.description,
	})

	const handleEventResize = (arg: EventResizeDoneArg) => {
		const values = getEventValues(arg.event)
		dispatch(eventStoreAction(values as any))
	}

	const handleEventDrop = (arg: any) => {
		const { event, revert } = arg

		if (!event.extendedProps.draggable) {
			revert()
			return
		}

		const values = getEventValues(event)
		dispatch(eventStoreAction(values as any))
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
			<Box component="main">
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<CustomBreadcrumbs links={breadcrumbsLinks} />
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
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 2,
								width: '100%',
								justifyContent: 'end',
							}}
						>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<Box
									sx={{ width: 10, height: 10, borderRadius: '100%', backgroundColor: '#fb9c0c' }}
								/>
								<Typography>Editable</Typography>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<Box sx={{ width: 10, height: 10, borderRadius: '100%', backgroundColor: 'red' }} />
								<Typography>Read-Only</Typography>
							</Box>
						</Box>

						<Box sx={{ width: '100%' }}>
							<Card>
								{status === 'LOADING' && events.length === 0 ? (
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
											droppable
											editable
											eventClick={handleEventSelect}
											eventContent={EventContent}
											eventDisplay="block"
											eventDrop={handleEventDrop}
											eventResizableFromStart
											eventResize={handleEventResize}
											events={Array.from(events.values())}
											headerToolbar={false}
											height={1200}
											initialDate={date}
											initialView={view}
											plugins={plugins}
											ref={calendarRef}
											rerenderDelay={10}
											select={handleRangeSelect}
											selectable
											weekends
											datesSet={handleDatesSet}
											views={{
												timeGridDay: {
													dayHeaderFormat: {
														weekday: 'long',
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
						</Box>
					</Stack>
				</Container>
			</Box>
			<CreateEvent
				open={isModalOpen}
				range={createDialog.data?.range}
			/>
			<ViewEvent open={detail?.type === 'employee'} />
		</>
	)
}

export default UpcomingEvent
