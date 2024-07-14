/* eslint-disable prettier/prettier */
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// mui imports
import { Box, createTheme } from '@mui/system'
import { Button, Card, Stack } from '@mui/material'

import { Employee, Department, NewEmployee } from 'type/employee'
import PersonalInfo from '@sections/organization/employees/create/PersonalInfo'
import ContactInfo from '@sections/organization/employees/create/ContactInfo'
import DetailInfo from '@sections/organization/employees/create/DetailInfo'
import Compensation from './create/Compensation'
import WorkSchedule from './create/WorkSchedule'
import { AuthState } from 'type/auth'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { authUserSelector } from '@redux/features/authSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '@components/Loading'
import { nextEmployeeIdRequest } from '@service/employee'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

import {
	employeeSelector,
	employeeListAction,
	updateEmployeeProfileAction,
	employeeStoreAction,
} from '@redux/features/employeeSlice'
import {
	departmentListAction,
	workLocationListAction,
	benefitPackageListAction,
} from '@redux/features/settingsSlice'
import { urlPreFix } from '@config/index'

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

export const Create = () => {
	const { t } = useTranslation()
	const { detail } = useAppSelector(employeeSelector)

	const { uuid } = useParams()
	const [employee, setEmployee] = useState<Employee | null>(null)

	const [nextEmployeeId, setNextEmployeeId] = useState('')

	useEffect(() => {
		nextEmployeeIdRequest()
			.then((data) => {
				const { employee_id } = data.data
				setNextEmployeeId(employee_id)
			})
			.catch((error) => {
				console.error('Error fetching next employee ID:', error)
			})
	}, [])

	useEffect(() => {
		setEmployee(detail as Employee)
	}, [uuid])

	useEffect(() => {
		dispatch(employeeListAction())
	}, [])

	const initialValues: NewEmployee = {
		first_name: employee?.first_name ?? '',
		last_name: employee?.last_name ?? '',
		photo: employee?.photo ?? '',
		gender: employee?.gender ?? '',
		cnic: employee?.cnic ?? '',
		dob: employee?.dob ? new Date(employee.dob) : null,
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
		employee_type: employee?.employee_type ?? '',
		employee_id: employee?.employee_id ?? nextEmployeeId,
		employee_status: employee?.employee_status ?? '',
		designation: employee?.designation?.uuid ?? '',
		department_id: employee?.department?.uuid ?? '',
		pay_frequency: employee?.pay_frequency ?? '',
		currency: employee?.currency ?? 'pkr',
		working_hours: employee?.working_hours ?? '',
		uuid: employee?.uuid ?? '',
		degree: employee?.degree ?? '',
		institute: employee?.institute ?? '',
		about: employee?.about ?? '',
		time_zone: employee?.time_zone ?? '',
		work_location_id: employee?.work_location?.id ?? '',
		country_id: employee?.country_id ?? '25',
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
		setStatus(true)
		Promise.all([
			dispatch(departmentListAction()),
			dispatch(workLocationListAction()),
			dispatch(benefitPackageListAction()),
		])
			.then((results) => {
				setStatus(false)
			})
			.catch((error) => {
				setStatus(false)
			})
	}, [user])

	useEffect(() => {
		if (uuid && employee) {
			formHook.reset(initialValues)
		} else {
			formHook.reset({ employee_id: nextEmployeeId })
		}
	}, [uuid, employee, nextEmployeeId])

	const onSubmit: SubmitHandler<NewEmployee> = async (values) => {
		const { photo, ...restForm } = values

		const formData = new FormData()

		Object.entries(restForm).forEach(([key, value]) => {
			if (value) {
				if (key === 'benefit' && Array.isArray(value) && value.length > 0) {
					value.forEach((uuid) => {
						formData.append('benefit[]', uuid)
					})
				} else if (key === 'working_days' && Array.isArray(value) && value.length > 0) {
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
			setButtonLoading(true)
			if (!uuid) {
				dispatch(employeeStoreAction(formData)).then(({ type }) => {
					setButtonLoading(false)
					if (type.includes('fulfilled')) {
						toast.success('Employee Added Successfully')
						navigate(`/${urlPreFix.employee}`)
					}
				})
			} else {
				dispatch(updateEmployeeProfileAction({ uuid, formData })).then(({ type }) => {
					setButtonLoading(false)
					if (type.includes('fulfilled')) {
						toast.success('Profile Updated Successfully')
					}
				})
			}
		} catch (err: unknown) {
			console.log(err, 'Error')
			setButtonLoading(false)
			if (err instanceof Error) {
				toast.error((err as any).response.data.message)
			} else {
				toast.error('Something went wrong!')
			}
		}
	}

	return (
		<FormProvider {...formHook}>
			<form onSubmit={formHook.handleSubmit(onSubmit)}>
				<Card
					sx={{
						boxShadow: 'none !important',
						border: '1px solid #E5E7EB',
					}}
				>
					<Stack
						sx={{
							py: 5,
							px: 2,

							'@media (min-width:600px)': {
								py: 5,
								px: 4,
							},
						}}
						spacing={3}
					>
						<PersonalInfo />

						<ContactInfo />

						<DetailInfo />

						<Compensation />

						<WorkSchedule />

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
								<Button color="inherit">
									{t(tokens.employee.create_employee.form.cancel_button.btn_text)}
								</Button>
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
										? t(tokens.employee.create_employee.form.save_changes.btn_text)
										: t(tokens.employee.create_employee.form.create.btn_text)
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
			</form>
		</FormProvider>
	)
}
