import React, { FC, useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import {
	Stack,
	SvgIcon,
	Switch,
	TextField,
	Typography,
	IconButton,
	Divider,
	Button,
	Box,
	createTheme,
	MenuItem,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import CloseIcon from '@untitled-ui/icons-react/build/esm/XClose'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	closeModal,
	eventStoreAction,
	eventDeleteAction,
	setSelectedDate,
} from '@redux/features/eventsSlice'
import Loading from '@components/Loading'
import DeleteBtn from '@components/DeleteButton'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import InputSelector from '@components/InputSelector'
import useScrollPosition from '@hooks/use-scroll-position'

interface CreateEventDialogProps {
	open?: boolean
	range?: any
}

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

export const CreateEvent: FC<CreateEventDialogProps> = ({ open = false, range }) => {
	// useScrollPosition(open)

	// Use the prop
	const dispatch = useAppDispatch()
	const [buttonLoading, setButtonLoading] = useState(false)
	const detail = useAppSelector((state) => state.event.event.detail)

	// zod validation schema
	const schema = z
		.object({
			id: z.union([z.string(), z.null()]).optional(),
			title: z.string().min(1, 'Title is required').max(255),
			description: z.string().max(5000).optional(),
			category: z.enum(['event', 'birthday', 'holidays', 'misc'], {
				errorMap: () => ({ message: 'Category is required' }),
			}),
			start_date_time: z.date(),
			end_date_time: z.date(),
			full_day: z.number(),
			featured: z.number(),
		})
		.refine((data) => data.start_date_time <= data.end_date_time, {
			message: 'End date should be greater than or equal to start date',
			path: ['end_date_time'],
		})

	const modifyDateByDays = (endDate: any, days: number) => {
		const date = new Date(endDate)
		date.setDate(date.getDate() + days)
		return date
	}

	const initialValues = {
		id: detail?.uuid || null,
		category: detail?.category || 'event',
		title: detail?.title || '',
		description: detail?.description || '',
		full_day: detail?.allDay ? 1 : 0,
		featured: detail?.featured ? 1 : 0,
		start_date_time: detail?.start ? new Date(detail.start) : new Date(range?.start || new Date()),
		end_date_time: detail?.end
			? detail.allDay
				? modifyDateByDays(new Date(detail.end), -1)
				: new Date(detail.end)
			: new Date(range?.end || new Date().setHours(new Date().getHours() + 1)),
	}

	const [isFullDay, setIsFullDay] = useState(initialValues.full_day === 1)

	const methods = useForm({
		defaultValues: initialValues,
		resolver: zodResolver(schema),
	})

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = methods

	// Reset form and state when detail, selectedStartDate, or range changes
	useEffect(() => {
		reset(initialValues)
		setIsFullDay(initialValues.full_day === 1)
	}, [detail, range, open])

	const onSubmit = (values: any) => {
		setButtonLoading(true)
		const updatedValues = {
			...values,
			end_date_time:
				values.full_day === 1 ? modifyDateByDays(values.end_date_time, +1) : values.end_date_time,
		}

		dispatch(eventStoreAction(updatedValues)).then(({ type }) => {
			console.log('Values', values)
			setButtonLoading(false)
			if (type.includes('fulfilled')) {
				reset()
				dispatch(closeModal())
			}
		})
	}

	const deleteEvent = () => {
		setButtonLoading(true)
		const uuid = detail.uuid
		dispatch(eventDeleteAction({ uuid })).then(({ type }) => {
			setButtonLoading(false)
			if (type.includes('fulfilled')) {
				dispatch(closeModal())
			}
		})
	}

	const { t } = useTranslation()
	const category = [
		{ value: 'event', label: 'Events' },
		{ value: 'birthday', label: 'Birthdays' },
		{ value: 'holidays', label: 'Holidays' },
		{ value: 'misc', label: 'Misc' },
	]

	const handleClose = () => {
		setIsFullDay(false)
		dispatch(closeModal())
		dispatch(setSelectedDate(new Date())) // reset selectedDate to current date
		reset(initialValues) // reset form values to initial values
	}
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>
				<Typography
					sx={{
						color: '#111927',
						fontWeight: 700,
						fontSize: 18,
					}}
				>
					{detail ? 'Edit Event' : t(tokens.upcoming_event.toolbar.button.text)}
				</Typography>
				<IconButton
					onClick={handleClose}
					sx={{ position: 'absolute', right: 6, top: 6 }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent dividers>
						<Stack spacing={2}>
							<Controller
								name="title"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label={t(tokens.upcoming_event.add_event.form.title.label)}
										placeholder={t(tokens.upcoming_event.add_event.form.title.place_holder)}
										error={Boolean(errors.title)}
										helperText={errors.title && (errors.title.message as string)}
										fullWidth
									/>
								)}
							/>
							<Controller
								name="description"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label={t(tokens.upcoming_event.add_event.form.description.label)}
										placeholder={t(tokens.upcoming_event.add_event.form.description.place_holder)}
										error={Boolean(errors.description)}
										fullWidth
									/>
								)}
							/>
							{/* <Controller
							name="category"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									label="Category"
									select
								>
									{category.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}
										>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							)}
						/> */}
							<InputSelector
								mainProps={{
									label: t(tokens.upcoming_event.add_event.form.category.label),
									placeholder: t(tokens.upcoming_event.add_event.form.category.placeholder),
								}}
								name="category"
								options={category}
								searchable
							/>
							<Controller
								name="start_date_time"
								control={control}
								render={({ field }) =>
									isFullDay ? (
										<DatePicker
											{...field}
											label={t(tokens.upcoming_event.add_event.form.start_date.label)}
											slotProps={{
												textField: {
													sx: { width: '100%' },
													error: !!errors.start_date_time,
													helperText: errors.start_date_time ? errors.start_date_time.message : '',
												},
											}}
										/>
									) : (
										<DateTimePicker
											{...field}
											label={t(tokens.upcoming_event.add_event.form.start_date.label)}
											slotProps={{
												textField: {
													sx: { width: '100%' },
													error: !!errors.start_date_time,
													helperText: errors.start_date_time ? errors.start_date_time.message : '',
												},
											}}
										/>
									)
								}
							/>
							<Controller
								name="end_date_time"
								control={control}
								render={({ field }) =>
									isFullDay ? (
										<DatePicker
											{...field}
											label={t(tokens.upcoming_event.add_event.form.end_date.label)}
											slotProps={{
												textField: {
													sx: { width: '100%' },
													error: !!errors.end_date_time,
													helperText: errors.end_date_time ? errors.end_date_time.message : '',
												},
											}}
										/>
									) : (
										<DateTimePicker
											{...field}
											label={t(tokens.upcoming_event.add_event.form.end_date.label)}
											slotProps={{
												textField: {
													sx: { width: '100%' },
													error: !!errors.end_date_time,
													helperText: errors.end_date_time ? errors.end_date_time.message : '',
												},
											}}
										/>
									)
								}
							/>
							<Controller
								name="full_day"
								control={control}
								render={({ field: { onChange, value, name } }) => (
									<div>
										<label
											htmlFor={name}
											style={{ fontSize: 12, fontWeight: 500, color: '#111927' }}
										>
											{t(tokens.upcoming_event.add_event.form.all_day.label)}
										</label>
										<Switch
											onChange={(e) => {
												const isChecked = e.target.checked
												onChange(isChecked ? 1 : 0)
												setIsFullDay(isChecked)
											}}
											checked={value === 1}
											name={name}
											inputProps={{ 'aria-label': 'controlled' }}
										/>
									</div>
								)}
							/>
							{/* <Controller
								name="featured"
								control={control}
								render={({ field: { onChange, value, name } }) => (
									<div>
										<label
											htmlFor={name}
											style={{ fontSize: 12, fontWeight: 500, color: '#111927' }}
										>
											{t(tokens.upcoming_event.add_event.form.featured.label)}
										</label>
										<Switch
											onChange={(e) => {
												const isChecked = e.target.checked
												onChange(isChecked ? 1 : 0)
											}}
											checked={value === 1}
											name={name}
											inputProps={{ 'aria-label': 'controlled' }}
										/>
									</div>
								)}
							/> */}
						</Stack>
					</DialogContent>
					<DialogActions>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								width: '100%',
								justifyContent: 'space-between',
								px: 1,
							}}
						>
							{/* <Box>
								{detail && !buttonLoading ? (
									<DeleteBtn
										onClick={() => deleteEvent()}
										label={t(tokens.upcoming_event.add_event.form.delete_btn.text)}
									/>
								) : (
									<Button
										disabled={buttonLoading}
										color="inherit"
										onClick={() => reset()}
									>
										{t(tokens.upcoming_event.add_event.form.clear_btn.text)}
									</Button>
								)}
							</Box> */}

							<Box>
								{detail ? (
									<DeleteBtn
										disabled={buttonLoading}
										onClick={() => deleteEvent()}
										label={t(tokens.upcoming_event.add_event.form.delete_btn.text)}
									/>
								) : (
									<Button
										disabled={buttonLoading}
										color="inherit"
										onClick={() => reset()}
									>
										{t(tokens.upcoming_event.add_event.form.clear_btn.text)}
									</Button>
								)}
							</Box>
							<Stack
								alignItems="center"
								direction="row"
								spacing={1}
							>
								<Button
									disabled={buttonLoading}
									color="inherit"
									onClick={handleClose}
								>
									{t(tokens.upcoming_event.add_event.form.cancel_btn.text)}
								</Button>
								<Button
									type="submit"
									disabled={buttonLoading}
									sx={{
										mt: 2,
										background: theme.palette.background.default,
										color: 'white',
										'&:disabled': {
											color: 'white',
										},
									}}
								>
									{!buttonLoading ? (
										detail ? (
											'Update'
										) : (
											'Save'
										)
									) : (
										<Loading
											size={20}
											showMessage={true}
										/>
									)}
								</Button>
							</Stack>
						</Box>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	)
}
