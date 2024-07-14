import { CalendarEvent } from 'type/upcomingevents'

type EventCategory = 'event' | 'holidays' | 'birthday' | 'misc'

export const countCategoryEvents = (events: CalendarEvent[]): Record<EventCategory, number> => {
	const categoryCounts: Record<EventCategory, number> = {
		event: 0,
		holidays: 0,
		birthday: 0,
		misc: 0,
	}

	events.forEach((event: CalendarEvent) => {
		const category = event.category as EventCategory
		if (categoryCounts[category] !== undefined) {
			categoryCounts[category]++
		}
	})

	return categoryCounts
}
