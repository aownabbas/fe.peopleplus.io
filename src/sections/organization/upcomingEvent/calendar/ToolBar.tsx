import type { ChangeEvent, FC, ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import ChevronLeftIcon from '@untitled-ui/icons-react/build/esm/ChevronLeft'
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import { Button, IconButton, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import type { Theme } from '@mui/material/styles/createTheme'
import type { CalendarToolbarProps, CalendarView } from 'type/upcomingevents'
import { CreateEvent } from './CreateEvent'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { viewOptions } from '@config/index'
import { closeModal, eventSelector, openModal } from '@redux/features/eventsSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

export const Toolbar: FC<CalendarToolbarProps> = (props) => {
	const dispatch = useAppDispatch()

	const status = useAppSelector(eventSelector).status
	const isModalOpen = useAppSelector(eventSelector).isModalOpen

	const { t } = useTranslation()

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

	// const availableViewOptions = useMemo(() => {
	// 	return mdUp
	// 		? viewOptions
	// 		: viewOptions.filter((option: any) => ['timeGridDay', 'listWeek'].includes(option.value))
	// }, [mdUp])

	const availableViewOptions = useMemo(() => {
		return viewOptions
	}, [])

	const [isDialogOpen, setDialogOpen] = useState(false)

	const handleOpenDialog = () => {
		dispatch(openModal())
	}

	const handleCloseDialog = () => {
		dispatch(closeModal())
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
					{availableViewOptions.map((option: any) => (
						<option
							key={option.value}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</TextField>
				<Button
					onClick={onAddClick}
					variant="gradient"
					sx={{
						gap: 1,
					}}
				>
					<SvgIcon
						sx={{
							margin: '0px',
							width: '20px',
						}}
					>
						<PlusIcon />
					</SvgIcon>
					<Typography sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500, fontSize: 14 }}>
						{t(tokens.upcoming_event.toolbar.button.text)}{' '}
					</Typography>
				</Button>
			</Box>
		</Stack>
	)
}
