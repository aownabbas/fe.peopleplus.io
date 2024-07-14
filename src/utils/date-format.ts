/* eslint-disable prettier/prettier */
import { format, parseISO } from 'date-fns'

export const dateFormat = (isoDateString: string): string => {
	const date = parseISO(isoDateString)
	const formattedDate = format(date, 'MMMM dd, yyyy')
	return formattedDate
}

export const dateFormatMilliSeconds = (
	milliseconds: number,
	dateFormat: string = 'MMM dd, yyyy',
) => {
	const start = new Date(milliseconds)
	const formattedStartDate = format(start, dateFormat)
	return formattedStartDate
}
