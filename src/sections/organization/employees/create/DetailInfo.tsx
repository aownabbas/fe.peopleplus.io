/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext, FieldValues, Control } from 'react-hook-form'
import { TextField, Grid, Typography, Stack, MenuItem } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DropdownOption } from 'type/config.ts'
import { settingsSelector } from '@redux/features/settingsSlice'
import { useAppSelector } from '@redux/hooks'
import { employeeSelector, filterEmployee } from '@redux/features/employeeSlice'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import InputSelector from '@components/InputSelector'
import { generateDropdownOptions } from '@utils/generate-dropdown-option'
import { limitItems, filterItems } from '@utils/filterItems'

const DetailInfo = () => {
	const { t } = useTranslation()
	const { departmentsOptions, workLocationOptions } = useAppSelector(settingsSelector)

	const [employeeOptions, setEmployeeOptions] = useState<DropdownOption[]>([])
	const { uuid } = useParams()
	const { list, tempList } = useAppSelector(employeeSelector)

	useEffect(() => {
		const specificObjectUUID = uuid
		const currentEmployees = list.find((em: { uuid: string }) => em.uuid === specificObjectUUID)

		const filteredList = list.filter((object: any) => {
			return object.uuid !== currentEmployees?.uuid && object.parent_id !== currentEmployees?.id
		})

		const updatedOptions = generateDropdownOptions(filteredList)
		setEmployeeOptions(updatedOptions)
	}, [list])

	const handleChange = (searchValue: string) => {
		const filteredItems = filterItems(tempList, searchValue, uuid)
		const limitedItems = limitItems(filteredItems, 10)
		const updatedOptions = generateDropdownOptions(limitedItems)
		setEmployeeOptions(updatedOptions)
	}

	const status = [
		{ value: 'active', label: 'Active' },
		{ value: 'deactive', label: 'Deactive' },
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
		getValues,
		formState: { errors },
	} = useFormContext()

	const isAddMode = getValues('isAddMode')

	// focus code
	const employeementStatus: any = useRef<HTMLDivElement>(null)
	const employeementType: any = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const empStatus: any = document.querySelector('[name="employee_status"]')
		const empType: any = document.querySelector('[name="employee_type"]')

		if (errors.employee_status) {
			empStatus.focus()
		} else if (errors.employee_type) {
			empType.focus()
		}
	}, [errors.employee_status, errors.employee_type])

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
									disabled={true}
									{...register('employee_id', {
										required: t(
											tokens.employee.create_employee.form.employment_details.emp_id.required,
										),
									})}
									error={!!errors.employee_id}
									helperText={errors.employee_id ? (errors.employee_id.message as string) : ''}
									fullWidth
									label={t(tokens.employee.create_employee.form.employment_details.emp_id.label)}
									placeholder={t(
										tokens.employee.create_employee.form.employment_details.emp_id.place_holder,
									)}
									InputProps={{
										readOnly: true,
									}}
									InputLabelProps={{
										shrink: Boolean(getValues('employee_id')) || isAddMode,
									}}
								/>
							</Grid>

							{/* job title */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<TextField
									{...register('job_title', {
										required: t(
											tokens.employee.create_employee.form.employment_details.job_title.required,
										),
									})}
									error={!!errors.job_title}
									helperText={errors.job_title ? (errors.job_title.message as string) : ''}
									fullWidth
									label={t(tokens.employee.create_employee.form.employment_details.job_title.label)}
									placeholder={t(
										tokens.employee.create_employee.form.employment_details.job_title.place_holder,
									)}
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
									label={t(tokens.employee.create_employee.form.employment_details.degree.label)}
									placeholder={t(
										tokens.employee.create_employee.form.employment_details.degree.place_holder,
									)}
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
									label={t(tokens.employee.create_employee.form.employment_details.institute.label)}
									placeholder={t(
										tokens.employee.create_employee.form.employment_details.institute.place_holder,
									)}
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
											label={t(
												tokens.employee.create_employee.form.employment_details.hire_date.label,
											)}
											{...field}
											sx={{ width: '100%' }}
											slotProps={{
												field: {
													readOnly: true,
												},
											}}
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
											label={t(
												tokens.employee.create_employee.form.employment_details.probation_end_date
													.label,
											)}
											{...field}
											sx={{ width: '100%' }}
											slotProps={{
												field: {
													readOnly: true,
												},
											}}
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
											label={t(
												tokens.employee.create_employee.form.employment_details.termination_date
													.label,
											)}
											{...field}
											sx={{ width: '100%' }}
											slotProps={{
												field: {
													readOnly: true,
												},
											}}
										/>
									)}
								/>
							</Grid>

							{/* Employment Status */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
								ref={employeementStatus}
							>
								<InputSelector
									mainProps={{
										label: t(
											tokens.employee.create_employee.form.employment_details.employment_status
												.label,
										),
										placeholder: t(
											tokens.employee.create_employee.form.employment_details.employment_status
												.placeholder,
										),
									}}
									helperText={
										errors.employee_status &&
										t(
											tokens.employee.create_employee.form.employment_details.employment_status
												.required,
										)
									}
									rules={{ required: true }}
									name="employee_status"
									options={status}
									searchable
								/>
							</Grid>

							{/* Employment Status */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
								ref={employeementType}
							>
								{/* <Controller
									name="employee_type"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											fullWidth
											label={t(
												tokens.employee.create_employee.form.employment_details.employment_type
													.label,
											)}
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
								/> */}

								<InputSelector
									mainProps={{
										label: t(
											tokens.employee.create_employee.form.employment_details.employment_type.label,
										),
										placeholder: t(
											tokens.employee.create_employee.form.employment_details.employment_type
												.placeholder,
										),
									}}
									helperText={
										errors.employee_type &&
										t(
											tokens.employee.create_employee.form.employment_details.employment_type
												.required,
										)
									}
									rules={{ required: true }}
									name="employee_type"
									options={type}
									searchable
								/>
							</Grid>

							{/* Manager / Supervisor */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<InputSelector
									mainProps={{
										label: t(tokens.employee.create_employee.form.employment_details.manager.label),
										placeholder: t(
											tokens.employee.create_employee.form.employment_details.manager.place_holder,
										),
									}}
									onChange={handleChange}
									name="designation"
									options={employeeOptions}
									searchable
								/>
							</Grid>
							{/* Department  */}
							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<InputSelector
									mainProps={{
										label: t(
											tokens.employee.create_employee.form.employment_details.department.label,
										),
										placeholder: t(
											tokens.employee.create_employee.form.employment_details.department
												.place_holder,
										),
									}}
									name="department_id"
									options={departmentsOptions as any}
									searchable
								/>
							</Grid>

							<Grid
								xs={12}
								md={6}
								sx={{ p: 1 }}
							>
								<InputSelector
									mainProps={{
										label: t(
											tokens.employee.create_employee.form.employment_details.work_location.label,
										),
										placeholder: t(
											tokens.employee.create_employee.form.employment_details.work_location
												.place_holder,
										),
									}}
									name="work_location_id"
									options={workLocationOptions as any}
									searchable
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
function dispatch(arg0: { payload: any; type: 'employee/filterEmployee' }) {
	throw new Error('Function not implemented.')
}
