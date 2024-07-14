import { ReactNode } from 'react'

export interface CreateDialogData {
	range?: {
		start: number
		end: number
	}
}

export interface UpdateDialogData {
	eventId?: string
}

export interface CalendarEvent {
	id: string
	allDay: boolean
	color?: string
	description: string
	end: number
	start: number
	title: string
	category: string
	eventIcon?: string
}

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek'

export interface ViewOption {
	label: string
	value: CalendarView
}

export interface CalendarToolbarProps {
	children?: ReactNode
	date: Date
	onAddClick?: () => void
	onDateNext?: () => void
	onDatePrev?: () => void
	onDateToday?: () => void
	onViewChange?: (view: CalendarView) => void
	view: CalendarView
}
