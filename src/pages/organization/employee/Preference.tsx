/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box'
import { Seo } from '@components/seo'
import { Create } from '@sections/organization/employees/Create'
import { FieldCardSkeleton } from '@components/Skeletons'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { employeeListAction, employeeSelectorStatus } from '@redux/features/employeeSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

const Preference = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(employeeListAction())
	}, [])
	const status = useAppSelector(employeeSelectorStatus).isLoading

	const { headers, form } = tokens.recruitment.add_job
	const { t } = useTranslation()
	if (status === true) {
		return (
			<Box>
				<FieldCardSkeleton
					firstTitle={t(tokens.employee.create_employee.form.personal_info.title)}
					secondTitle={t(tokens.employee.create_employee.form.contact_info.title)}
				/>
			</Box>
		)
	}

	return (
		<>
			<Seo title={t(tokens.seo_titles.employees.preference)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Create />
			</Box>
		</>
	)
}

export default Preference
