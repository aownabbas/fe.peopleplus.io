/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { Controller, useFormContext, FieldValues, Control } from 'react-hook-form'
import { TextField, Grid, Typography, Stack, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DropdownOption } from 'type/config.ts'
import { settingsSelector } from '@redux/features/settingsSlice'
import { useAppSelector } from '@redux/hooks'
import { employeeSelector } from '@redux/features/employeeSlice'
import { useParams } from 'react-router-dom'
import { t } from 'i18next'
import { tokens } from '@locales/tokens'

const DetailInfo = () => {
	const { departments } = useAppSelector(settingsSelector)
	const [employeeOptions, setEmployeeOptions] = useState<DropdownOption[]>([])
	const { uuid } = useParams()
	const { list } = useAppSelector(employeeSelector)

	useEffect(() => {
		const specificObjectUUID = uuid
		const filteredList = list.filter((object) => object.uuid !== specificObjectUUID)
		const updatedOptions: DropdownOption[] = filteredList.map((object: any) => ({
			label: object.first_name + ' ' + object.last_name,
			value: object.uuid,
		}))

		setEmployeeOptions(updatedOptions)
	}, [list])

	const status = [
		{ value: 'active', label: 'Active' },
		{ value: 'InActive', label: 'deactive' },
	]

	const type: DropdownOption[] = [
		{
			label: 'Full Time',
			value: 'full-time',
		},
		{
			label: 'Part Time',
			value: 'part-time',
		},
	]

	const {
		register,
		control,
		watch,
		getValues,
		formState: { errors },
	} = useFormContext()
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
						{t(tokens.employee.create_employee.form.employment_details.title)}
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
							{/* Employee id */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('employee_id', { required: 'Employee id is required' })}
									error={!!errors.employee_id}
									helperText={errors.employee_id ? (errors.employee_id.message as string) : ''}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									disabled
									label="Employee ID"
									InputLabelProps={{
										shrink: Boolean(getValues('employee_id')) || isAddMode,
									}}
								/>
							</Grid>

							{/* last name */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('job_title', { required: 'Job title d is required' })}
									error={!!errors.job_title}
									helperText={errors.job_title ? (errors.job_title.message as string) : ''}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									disabled
									label="Job Title"
									InputLabelProps={{
										shrink: Boolean(getValues('job_title')) || isAddMode,
									}}
								/>
							</Grid>

							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('degree')}
									fullWidth
									label="Degree"
									InputLabelProps={{
										shrink: Boolean(getValues('degree')) || isAddMode,
									}}
								/>
							</Grid>

							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('institute')}
									fullWidth
									label="Institute"
									InputLabelProps={{
										shrink: Boolean(getValues('institute')) || isAddMode,
									}}
								/>
							</Grid>

							{/* Hire  Date */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="joining_date"
									control={control}
									render={({ field }) => (
										<DatePicker
											label="Hire Date"
											{...field}
											sx={{ width: '100%' }}
											readOnly
											disabled
										/>
									)}
								/>
							</Grid>

							{/* Probation End Date */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="probation_end_date"
									control={control}
									render={({ field }) => (
										<DatePicker
											label="Probation Date"
											{...field}
											sx={{ width: '100%' }}
											readOnly
											disabled
										/>
									)}
								/>
							</Grid>

							{/* Termination Date */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="termination_date"
									control={control}
									render={({ field }) => (
										<DatePicker
											label="Termination Date"
											{...field}
											sx={{ width: '100%' }}
											readOnly
											disabled
										/>
									)}
								/>
							</Grid>

							{/* Employment Status */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="employee_status"
									control={control}
									render={({ field }) => (
										<TextField
											sx={{ height: '55px' }}
											InputProps={{
												readOnly: true,
											}}
											disabled
											{...field}
											fullWidth
											label="Employment Status"
											select
										>
											{status.map((option) => (
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

							{/* Employment Status */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<Controller
									name="employee_type"
									control={control}
									render={({ field }) => (
										<TextField
											sx={{ height: '55px' }}
											{...field}
											fullWidth
											label="Employment Type"
											InputProps={{
												readOnly: true,
											}}
											disabled
											select
										>
											{type.map((option) => (
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

							{/* Manager / Supervisor */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									sx={{ height: '55px' }}
									{...register('designation')}
									error={!!errors.employee_id}
									helperText={errors.employee_id ? (errors.employee_id.message as string) : ''}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									disabled
									label="Manager / Supervisor"
									InputLabelProps={{
										shrink: Boolean(getValues('designation')) || isAddMode,
									}}
								/>
							</Grid>

							{/* Department  */}

							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('department_id')}
									error={!!errors.employee_id}
									helperText={errors.employee_id ? (errors.employee_id.message as string) : ''}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									disabled
									label="Department"
									InputLabelProps={{
										shrink: Boolean(getValues('department_id')) || isAddMode,
									}}
								/>
							</Grid>

							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('work_location_id')}
									fullWidth
									InputProps={{
										readOnly: true,
									}}
									disabled
									label="Work Location"
									InputLabelProps={{
										shrink: Boolean(getValues('work_location_id')) || isAddMode,
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
export default DetailInfo
