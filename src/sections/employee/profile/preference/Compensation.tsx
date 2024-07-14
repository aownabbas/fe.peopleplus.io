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
	Checkbox,
	ListItemText,
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'
import { settingsSelector } from '@redux/features/settingsSlice'

import { DropdownOption } from 'type/config.ts'
import { useAppSelector } from '@redux/hooks'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

const Compensation = () => {
	const { benefitsPackagesOption } = useAppSelector(settingsSelector)

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

	const [personName, setPersonName] = React.useState<string[]>([])

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
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

	const { register, control, watch, getValues } = useFormContext()
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
						{t(tokens.employee.create_employee.form.compensation.title)}
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
									{...register('salary')}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									disabled
									label="Salary"
									InputLabelProps={{
										shrink: Boolean(getValues('salary')) || isAddMode,
									}}
								/>
							</Grid>

							{/* Pay Frequency */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="pay_frequency"
									control={control}
									render={({ field }) => (
										<TextField
											sx={{ height: '55px' }}
											{...field}
											fullWidth
											label="Pay Frequency"
											InputProps={{
												readOnly: true,
											}}
											disabled
											select
										>
											{payfrequency.map((option) => (
												<MenuItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</MenuItem>
											))}
										</TextField>
									)}
								/>
							</Grid>

							{/* Currency */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="currency"
									control={control}
									render={({ field }) => (
										<TextField
											sx={{ height: '55px' }}
											{...field}
											fullWidth
											label="Currency"
											select
											InputProps={{
												readOnly: true,
											}}
											disabled
										>
											{currency.map((option) => (
												<MenuItem
													key={option.value}
													value={option.value}
												>
													{option.label}
												</MenuItem>
											))}
										</TextField>
									)}
								/>
							</Grid>

							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								{/* <FormControl sx={{ minWidth: 200, width: '100%' }}>
									<Controller
										name="benefit"
										control={control}
										render={({ field }) => (
											<TextField
												sx={{ height: '55px' }}
												{...field}
												fullWidth
												label="Benefits Package"
												InputProps={{
													readOnly: true,
												}}
												select
												SelectProps={{
													multiple: true,
													renderValue: (selected: any) => {
														return benefitsPackagesOption
															.filter((option) => selected.includes(option.uuid))
															.map((option) => option.name)
															.join(', ')
													},
													// onChange: (event) => {
													// 	const selectedValues = event.target.value
													// 	field.onChange(selectedValues)
													// },
												}}
											>
												{benefitsPackagesOption.map((object) => (
													<MenuItem
														key={object.uuid}
														value={object.uuid}
													>
														<Checkbox checked={field.value.includes(object.uuid)} />
														<ListItemText primary={object.name} />
													</MenuItem>
												))}
											</TextField>
										)}
									/>
								</FormControl> */}

								<FormControl sx={{ minWidth: 200, width: '100%' }}>
									<Controller
										name="benefit"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												fullWidth
												label="Benefits Package"
												select
												InputProps={{
													readOnly: true,
												}}
												disabled
												SelectProps={{
													multiple: true,
													renderValue: (selected: any) => {
														return benefitsPackagesOption
															.filter((option) => selected.includes(option.uuid))
															.map((option) => option.name)
															.join(', ')
													},
													onChange: (event) => {
														const selectedValues = event.target.value
														field.onChange(selectedValues)
													},
												}}
											>
												{benefitsPackagesOption.map((object) => (
													<MenuItem
														key={object.uuid}
														value={object.uuid}
													>
														<Checkbox checked={field.value.includes(object.uuid)} />
														<ListItemText primary={object.name} />
													</MenuItem>
												))}
											</TextField>
										)}
									/>
								</FormControl>
							</Grid>
						</Grid>
					</Stack>
				</Grid>
			</Grid>
		</Grid>
	)
}
export default Compensation
