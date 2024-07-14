/* eslint-disable prettier/prettier */
import { Controller, useFormContext } from 'react-hook-form'
import {
	TextField,
	Grid,
	Typography,
	Stack,
	MenuItem,
	FormControl,
	InputLabel,
	OutlinedInput,
	ListItemText,
	Checkbox,
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'

import { DropdownOption } from 'type/config.ts'

import { useAppSelector } from '@redux/hooks'
import { settingsSelector } from '@redux/features/settingsSlice'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

const WorkSchedule = () => {
	const { timezoneOptions } = useAppSelector(settingsSelector)
	const { t } = useTranslation()

	const ITEM_HEIGHT = 48
	const ITEM_PADDING_TOP = 8
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 458,
			},
		},
	}

	const names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
	const [personName, setPersonName] = React.useState<string[]>([])

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		setValue('working_days', event.target.value)
		const {
			target: { value },
		} = event
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		)
	}

	const payfrequency: DropdownOption[] = [
		{
			label: 'Daily',
			value: 'daily',
		},

		{
			label: 'Weekly',
			value: 'weekly',
		},

		{
			label: 'Fortnightly',
			value: 'fortnightly',
		},
		{
			label: 'Monthly',
			value: 'monthly',
		},

		{
			label: 'Biannully',
			value: 'biannully',
		},
		{
			label: 'Annually ',
			value: 'annually ',
		},
	]

	const currency: DropdownOption[] = [
		{
			label: 'PKR',
			value: 'pkr',
		},
		{
			label: 'INR',
			value: 'inr',
		},
		{
			label: 'USD',
			value: 'usd',
		},
	]

	const { register, control, setValue, watch, getValues } = useFormContext()
	const isAddMode = getValues('isAddMode')

	return (
		<Grid
			container
			spacing={3}
		>
			<Grid
				xs={12}
				md={3}
			>
				<Stack
					sx={{
						pl: 1,
					}}
					spacing={1}
				>
					<Typography variant="h6">
						{t(tokens.employee.create_employee.form.work_schedule.title)}
					</Typography>
				</Stack>
			</Grid>
			<Grid
				xs={12}
				md={9}
				sx={{ pr: 4 }}
			>
				<Grid
					xs={12}
					md={12}
				>
					<Stack
						spacing={3}
						sx={{ width: '100%' }}
					>
						<Grid
							container
							spacing={2}
						>
							{/* first name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('working_hours')}
									fullWidth
									placeholder={t(
										tokens.employee.create_employee.form.work_schedule.work_hours.place_holder,
									)}
									label={t(tokens.employee.create_employee.form.work_schedule.work_hours.label)}
									InputProps={{
										readOnly: true,
									}}
									disabled
									InputLabelProps={{
										shrink: Boolean(getValues('working_hours')) || isAddMode,
									}}
								/>
							</Grid>

							{/* Work Days  */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<FormControl sx={{ minWidth: 200, width: '100%' }}>
									<Controller
										name="working_days"
										control={control}
										render={({ field }) => (
											<TextField
												sx={{ height: '55px' }}
												{...field}
												fullWidth
												InputProps={{
													readOnly: true,
												}}
												disabled
												label={t(
													tokens.employee.create_employee.form.work_schedule.work_days.label,
												)}
												select
												SelectProps={{
													multiple: true,
													renderValue: (selected: any) => (selected as string[]).join(', '),
													onChange: (event) => {
														field.onChange(event.target.value)
													},
												}}
												InputLabelProps={{
													shrink: Boolean(getValues('working_days')) || isAddMode,
												}}
											>
												{names.map((name) => (
													<MenuItem
														key={name}
														value={name}
													>
														<Checkbox checked={field.value.indexOf(name) > -1} />
														<ListItemText primary={name} />
													</MenuItem>
												))}
											</TextField>
										)}
									/>
								</FormControl>
							</Grid>

							{/* TimeZone */}

							<Grid
								xs={12}
								md={12}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('time_zone')}
									fullWidth
									label="Time Zone"
									InputProps={{
										readOnly: true,
									}}
									disabled
									InputLabelProps={{
										shrink: Boolean(getValues('time_zone')) || isAddMode,
									}}
								/>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			</Grid>
		</Grid>
	)
}
export default WorkSchedule
