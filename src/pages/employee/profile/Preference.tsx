/* eslint-disable prettier/prettier */
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// mui imports
import { Box, createTheme } from '@mui/system'
import { Button, Card, Stack } from '@mui/material'

import { Employee, NewEmployee } from 'type/employee'
import PersonalInfo from '@sections/employee/profile/preference/PersonalInfo'
import ContactInfo from '@sections/employee/profile/preference/ContactInfo'
import DetailInfo from '@sections/employee/profile/preference/DetailInfo'
import Compensation from '@sections/employee/profile/preference/Compensation'
import WorkSchedule from '@sections/employee/profile/preference/WorkSchedule'
import { AuthState } from 'type/auth'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { authUserSelector } from '@redux/features/authSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '@components/Loading'
import {
	employeeListAction,
	employeeSelector,
	employeeSelectorStatus,
	updateEmployeeProfileAction,
} from '@redux/features/employeeSlice'
import { FieldCardSkeleton } from '@components/Skeletons'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { benefitPackageListAction } from '@redux/features/settingsSlice'
import { Seo } from '@components/seo'

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)', // Adjust colors as needed
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const Preference = () => {
	const { detail } = useAppSelector(employeeSelector)

	const isLoading = useAppSelector(employeeSelectorStatus).status

	const { uuid } = useParams()

	const [employee, setEmployee] = useState<Employee | null>(null)

	useEffect(() => {
		setEmployee(detail as Employee)
	}, [detail])

	const initialValues: NewEmployee = {
		first_name: employee?.first_name ?? '',
		last_name: employee?.last_name ?? '',
		photo: employee?.photo ?? '',
		gender: employee?.gender ?? 'male',
		cnic: employee?.cnic ?? '',
		dob: employee?.dob ? new Date(employee.dob) : new Date(),
		email: employee?.email ?? '',
		password: '',
		is_top_level: employee?.is_top_level ?? 0,
		city: employee?.city ?? '',
		state: employee?.state ?? '',
		postcode: employee?.postcode ?? 0,
		street_address: employee?.street_address ?? '',
		phone_number: employee?.phone_number ?? '',
		emergency_contact: employee?.emergency_contact ?? '',
		joining_date: employee?.joining_date ? new Date(employee.joining_date) : null,
		probation_end_date: employee?.probation_end_date ? new Date(employee.probation_end_date) : null,
		termination_date: employee?.termination_date ? new Date(employee.termination_date) : null,
		employee_type: employee?.employee_type ?? 'full-time',
		employee_id: employee?.employee_id ?? '',
		employee_status: employee?.employee_status ?? 'active',
		designation:
			(employee?.designation?.first_name ?? '') + ' ' + (employee?.designation?.last_name ?? ''),
		department_id: employee?.department?.name ?? '',
		pay_frequency: employee?.pay_frequency ?? '',
		currency: employee?.currency ?? 'pkr',
		working_hours: employee?.working_hours ?? '',
		uuid: employee?.uuid ?? '',
		degree: employee?.degree ?? '',
		institute: employee?.institute ?? '',
		about: employee?.about ?? '',
		time_zone: employee?.time_zone ?? '',
		work_location_id: employee?.work_location?.name ?? '',
		country_id: employee?.country_id ?? '',
		working_days: employee?.working_days ? JSON.parse(employee.working_days) : [],
		salary: employee?.salary ?? '',
		job_title: employee?.job_title ?? '',
		benefit: employee?.benefit ?? [],
	}

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const { user }: AuthState = useAppSelector(authUserSelector)
	const [status, setStatus] = useState<boolean>(true)
	const [buttonLoading, setButtonLoading] = useState(false)

	const formHook = useForm<NewEmployee>({ defaultValues: initialValues })

	useEffect(() => {
		// setStatus(true)
		Promise.all([
			// dispatch(departmentListAction()),
			// dispatch(workLocationListAction()),
			dispatch(benefitPackageListAction()),
		])
		// .then((results) => {
		// 	setStatus(false)
		// })
		// .catch((error) => {
		// 	setStatus(false)
		// })
	}, [user])

	useEffect(() => {
		if (employee) {
			formHook.reset(initialValues)
		}
	}, [employee])

	const onSubmit: SubmitHandler<NewEmployee> = async (values) => {
		let response
		let message

		const { photo, ...restForm } = values

		const formData = new FormData()

		Object.entries(restForm).forEach(([key, value]) => {
			if (value) {
				if (key === 'working_days' && Array.isArray(value) && value.length > 0) {
					value.forEach((day) => {
						formData.append('working_days[]', day)
					})
				} else {
					formData.append(key, value)
				}
			}
		})

		if (photo && (photo as any) instanceof FileList) formData.append('photo', values.photo[0])

		try {
			const uuid = user?.employee?.uuid
			setButtonLoading(true)
			if (uuid) {
				dispatch(updateEmployeeProfileAction({ uuid, formData })).then(({ type }) => {
					if (type.includes('fulfilled')) {
						setButtonLoading(false)
						toast.success('Profile Updated Successfully')
					}
				})
			}

			if (response) {
				const { status } = response
				if (status == 200 && !uuid) {
					navigate('/employee')
				}
				setButtonLoading(false)
				toast.success('Record Added Successfully')
			}
		} catch (err: unknown) {
			console.log(err)
			setButtonLoading(false)
			if (err instanceof Error) {
				toast.error((err as any).response.data.message)
			} else {
				toast.error('Something went wrong!')
			}
		}
	}
	const { headers, form } = tokens.recruitment.add_job
	const { t } = useTranslation()

	if (isLoading === 'LOADING') {
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

			<FormProvider {...formHook}>
				<form onSubmit={formHook.handleSubmit(onSubmit)}>
					<Stack spacing={4}>
						<Card>
							<Stack
								sx={{
									py: 5,
									px: 0,

									'@media (min-width:600px)': {
										py: 5,
										px: 4,
									},
								}}
								spacing={3}
							>
								{/* personal information */}

								<PersonalInfo />

								{/* contact information */}
								<ContactInfo />

								{/* Employment Details  */}
								<DetailInfo />

								{/* Compensation  */}
								<Compensation />

								{/* WorkSchedule  */}
								<WorkSchedule />

								{/* custom fields */}

								{/* save & cancel button */}
								<Stack
									alignItems="center"
									direction="row"
									justifyContent="flex-end"
									spacing={1}
									sx={{
										mt: 5,
										px: 3,
									}}
								>
									<Link
										style={{ color: 'black' }}
										to="/employee"
									>
										<Button color="inherit">{t(tokens.employee.Preferences.cancel)}</Button>
									</Link>
									<Button
										type="submit"
										disabled={buttonLoading}
										sx={{
											mt: 2,
											background: theme.palette.background.default,
											color: 'white', // Set text color to white
											'&:disabled': {
												color: 'white',
											},
										}}
									>
										{!buttonLoading
											? uuid
												? t(tokens.employee.Preferences.save_changes)
												: t(tokens.employee.Preferences.submit)
											: null}
										{buttonLoading && (
											<Loading
												size={20}
												showMessage={true}
											/>
										)}
									</Button>
								</Stack>
							</Stack>
						</Card>
					</Stack>
				</form>
			</FormProvider>
		</>
	)
}
export default Preference
