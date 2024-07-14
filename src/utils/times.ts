import { format, parseISO } from 'date-fns'

// 'MMM dd, h:mm a'
export function formatTime(isoDateString: string, fmt: string = 'MMM dd, h:mm a'): string {
	const date = parseISO(isoDateString)
	const formattedDate = format(date, fmt)
	return formattedDate
}
