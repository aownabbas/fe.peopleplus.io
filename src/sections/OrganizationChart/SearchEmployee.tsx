import React, { useEffect, useState } from 'react'
import { Box, TextField, Autocomplete, MenuItem } from '@mui/material'
import { linkedEmployeeListRequest } from '@service/employee'
import { Employee } from 'type/employee'
import { useAppDispatch } from '@redux/hooks'
import { getOrganizationalChartAction } from '@redux/features/organizationalChart'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import CustomOptionItem from '@components/CustomOptionItem' // Update the path as necessary

interface EmployeeOption {
	label: string
	email?: string
	value?: any
	photo?: string
	job_title?: string
}

export default function SearchEmployee() {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const [employees, setEmployees] = useState<EmployeeOption[]>([])

	useEffect(() => {
		const getEmployees = async () => {
			const { data } = await linkedEmployeeListRequest()
			const uniqueEmployees = data.employees.reduce((acc: EmployeeOption[], current: Employee) => {
				const x = acc.find((item) => item.value === current.id)
				if (!x) {
					return acc.concat([
						{
							label: `${current.first_name} ${current.last_name}`,
							value: current.id,
							email: current.email,
							photo: current.photo, // Assumes photo URL is available in the response
							job_title: current.job_title, // Assumes job title is available in the response
						},
					])
				} else {
					return acc
				}
			}, [])

			setEmployees(uniqueEmployees)
		}

		getEmployees()
	}, [])

	const handleAutoCompleteChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: EmployeeOption | null,
	) => {
		if (newValue) {
			dispatch(getOrganizationalChartAction(newValue.value))
		} else {
			dispatch(getOrganizationalChartAction())
		}
	}

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				justifyContent: 'end',
			}}
		>
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				onChange={handleAutoCompleteChange}
				options={employees}
				getOptionLabel={(option) => option.label}
				renderOption={(props, option) => (
					<MenuItem {...props}>
						<CustomOptionItem option={option} />
					</MenuItem>
				)}
				sx={{
					width: '100%',
					mb: 3,
					'@media (min-width: 600px)': {
						width: 350,
						mb: 3,
					},
				}}
				renderInput={(params) => (
					<TextField
						sx={{
							backgroundColor: 'white',
							borderRadius: 1,
						}}
						{...params}
						label={t(tokens.organizational_chart.search_filed.label)}
						placeholder={t(tokens.organizational_chart.search_filed.placeholder)}
					/>
				)}
			/>
		</Box>
	)
}
