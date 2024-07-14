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

import { DropdownOption } from 'type/config.ts'
import { settingsSelector } from '@redux/features/settingsSlice'
import { useAppSelector } from '@redux/hooks'

import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import InputSelector from '@components/InputSelector'

const Compensation = () => {
	const { benefitsPackagesOption } = useAppSelector(settingsSelector)

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

	const [personName, setPersonName] = React.useState<string[]>([])

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		)

		console.log(personName, 'personName')
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

	const { register, control, getValues } = useFormContext()
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
									label={t(tokens.employee.create_employee.form.compensation.salary.label)}
									placeholder={t(
										tokens.employee.create_employee.form.compensation.salary.place_holder,
									)}
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
								<InputSelector
									mainProps={{
										label: t(tokens.employee.create_employee.form.compensation.pay_frequency.label),
										placeholder: t(
											tokens.employee.create_employee.form.compensation.pay_frequency.place_holder,
										),
									}}
									name="pay_frequency"
									options={payfrequency}
									searchable
								/>
							</Grid>

							{/* Currency */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<InputSelector
									mainProps={{
										label: t(tokens.employee.create_employee.form.compensation.currency.label),
										placeholder: t(
											tokens.employee.create_employee.form.compensation.currency.place_holder,
										),
									}}
									name="currency"
									options={currency}
									searchable
								/>
							</Grid>

							{/* Work Days  */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								{/* <FormControl sx={{ minWidth: 200, width: '100%' }}>
									<InputLabel id="demo-multiple-checkbox-label">Benefits Package</InputLabel>
									<Controller
										name="benefit"
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												labelId="demo-multiple-checkbox-label"
												id="demo-multiple-checkbox"
												multiple
												input={<OutlinedInput label="Tag" />}
												renderValue={(selected) => {
													return benefitsPackagesOption
														.filter((option) => selected.includes(option.uuid))
														.map((option) => option.name)
														.join(', ')
												}}
												onChange={(event) => {
													const selectedValues = event.target.value
													field.onChange(selectedValues)
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
											</Select>
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
												label={t(
													tokens.employee.create_employee.form.compensation.benefit_package.label,
												)}
												placeholder={t(
													tokens.employee.create_employee.form.compensation.benefit_package
														.place_holder,
												)}
												select
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
												{/* {benefitsPackagesOption.map((object) => (
													<MenuItem
														key={object.uuid}
														value={object.uuid}
													>
														<Checkbox checked={field.value.includes(object.uuid)} />
														<ListItemText primary={object.name} />
													</MenuItem>
												))} */}

												{benefitsPackagesOption.length === 0 ? (
													<MenuItem>No options</MenuItem>
												) : (
													benefitsPackagesOption.map((object) => (
														<MenuItem
															key={object.uuid}
															value={object.uuid}
														>
															<Checkbox checked={field.value.includes(object.uuid)} />
															<ListItemText primary={object.name} />
														</MenuItem>
													))
												)}
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
