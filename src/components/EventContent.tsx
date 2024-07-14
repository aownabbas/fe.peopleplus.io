import * as React from 'react'
import type { EventContentArg } from '@fullcalendar/core'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { format } from 'date-fns'

export interface EventContentProps extends EventContentArg {
	event: EventContentArg['event'] & {
		extendedProps: { description?: string; priority?: 'high' | 'medium' | 'low' }
	}
}

export function EventContent(arg: EventContentProps): React.JSX.Element {
	const { priority = 'low' } = arg.event.extendedProps

	const color = priority === 'low' ? 'red' : priority === 'high' ? '#fb9c0c' : 'transparent'

	const startTime = arg.event.start ? format(arg.event.start, 'h:mm a') : null
	const endTime = arg.event.end ? format(arg.event.end, 'h:mm a') : null

	return (
		<Paper
			sx={{
				border: '1px solid black',
				boxShadow: 'var(--mui-shadows-1)',
				borderRadius: 1,
				overflowX: 'auto',
				overflowY: 'hidden',
				cursor: 'pointer',
			}}
		>
			<Stack
				direction="row"
				spacing={1}
			>
				<Box sx={{ bgcolor: color, flex: '0 0 auto', width: '4px' }} />
				<div>
					{!arg.event.allDay ? (
						<Typography
							noWrap
							sx={{
								color: '#111927',
								fontSize: 13,
								fontWeight: 500,
							}}
						>
							{startTime} - {endTime}
						</Typography>
					) : null}
					<Typography
						noWrap
						sx={{
							color: '#6C737F',
							fontWeight: 400,
							fontSize: 13,
							wordBreak: 'break-all',
							maxWidth: '134px',
						}}
					>
						{arg.event.title}
					</Typography>
				</div>
			</Stack>
		</Paper>
	)
}
