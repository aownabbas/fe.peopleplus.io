import type { ChangeEvent, FC, ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import ChevronLeftIcon from '@untitled-ui/icons-react/build/esm/ChevronLeft'
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'

import type { CalendarToolbarProps, CalendarView, ViewOption } from 'type/upcomingevents'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { useAppSelector } from '@redux/hooks'
import { eventSelector } from '@redux/features/eventsSlice'

const viewOptions: ViewOption[] = [
	{
		label: 'Month',
		value: 'dayGridMonth',
	},
	{
		label: 'Week',
		value: 'timeGridWeek',
	},
	{
		label: 'Day',
		value: 'timeGridDay',
	},
	{
		label: 'Agenda',
		value: 'listWeek',
	},
]
export const CalendarToolbar: FC<CalendarToolbarProps> = (props) => {
	const { t } = useTranslation()
	const status = useAppSelector(eventSelector).status

	const { date, onAddClick, onDateNext, onDatePrev, onDateToday, onViewChange, view, ...other } =
		props
	const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

	const handleViewChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>): void => {
			onViewChange?.(event.target.value as CalendarView)
		},
		[onViewChange],
	)

	const dateMonth = format(date, 'MMMM')
	const dateDay = format(date, 'y')

	// On mobile allow only timeGridDay and agenda views

	const availableViewOptions = useMemo(() => {
		return mdUp
			? viewOptions
			: viewOptions.filter((option) => ['timeGridDay', 'listWeek'].includes(option.value))
	}, [mdUp])

	const [isDialogOpen, setDialogOpen] = useState(false)

	const handleOpenDialog = () => {
		setDialogOpen(true)
	}

	const handleCloseDialog = () => {
		setDialogOpen(false)
	}

	return (
		<Stack
			alignItems="baseline"
			flexWrap="wrap"
			justifyContent="space-between"
			flexDirection={{
				xs: 'column',
				md: 'row',
			}}
			spacing={3}
			{...other}
		>
			<Box>
				<Typography sx={{ color: '#111927', fontWeight: 700, fontSize: 32 }}>
					{dateMonth} {dateDay}
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'end',
					gap: 2,
					width: {
						xs: '100%',
						md: '460px',
					},
				}}
			>
				<IconButton
					onClick={onDatePrev}
					disabled={status === 'LOADING'}
				>
					<SvgIcon>
						<ChevronLeftIcon />
					</SvgIcon>
				</IconButton>
				<IconButton
					onClick={onDateNext}
					disabled={status === 'LOADING'}
				>
					<SvgIcon>
						<ChevronRightIcon />
					</SvgIcon>
				</IconButton>
				<TextField
					label="View"
					name="view"
					onChange={handleViewChange}
					select
					SelectProps={{ native: true }}
					size="small"
					sx={{
						width: 150,
						order: {
							xs: -1,
							md: 0,
							background: 'white',
							borderRadius: 8,
						},
					}}
					value={view}
				>
					{availableViewOptions.map((option) => (
						<option
							key={option.value}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</TextField>
			</Box>
		</Stack>
	)
}
