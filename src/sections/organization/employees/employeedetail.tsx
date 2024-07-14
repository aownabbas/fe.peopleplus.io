import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { File } from '@components/file-dropzone'
import { FileDropzone } from '@components/file-dropzone'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Container from '@mui/material/Container'
import { useRouter } from '@hooks/use-router'
import { createTheme } from '@mui/system'
import { useAppSelector } from '@redux/hooks.ts'
// import { assetCategorySelector } from '@redux/features/assetCategorySlice.ts'
import CountrySelect from '@components/countryselect'
import MultipleSelectCheckmarks from '@components/benefitmultiselect'
import MultipleSelectdays from '@components/workingdaysmultiselect'
import Camera01Icon from '@untitled-ui/icons-react/build/esm/Camera01'
import User01Icon from '@untitled-ui/icons-react/build/esm/User01'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import { neutral } from '@theme/colors'

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
// import { paths } from 'src/paths';

interface EmployeeStatus {
	label: string
	value: string
}

const employeestatus: EmployeeStatus[] = [
	{
		label: 'Active',
		value: 'active',
	},
	{
		label: 'Not Active',
		value: 'not active',
	},
]

interface Currency {
	label: string
	value: string
}

const currency: Currency[] = [
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

interface TimeZone {
	label: string
	value: string
}

const timezone: TimeZone[] = [
	{
		label: 'PST UTC−08:00',
		value: 'pst utc−08:00',
	},
	{
		label: 'PST UTC−09:00',
		value: 'pst utc−09:00',
	},
	{
		label: 'PST UTC−10:00',
		value: 'pst utc−10:00',
	},
]

interface Employeetype {
	label: string
	value: string
}

const employeetype: Employeetype[] = [
	{
		label: 'Full Time',
		value: 'full time',
	},
	{
		label: 'Part Time',
		value: 'part time ',
	},
]

interface Department {
	label: string
	value: string
}

const department: Department[] = [
	{
		label: 'Management',
		value: 'management',
	},
	{
		label: 'Frontend Developer',
		value: 'frontend developer',
	},
	{
		label: 'Backend Developer',
		value: 'backend developer',
	},
	{
		label: 'UI/UX Designer',
		value: 'ui/ux designer',
	},
]

interface Manager {
	label: string
	value: string
}

const Manager: Manager[] = [
	{
		label: 'Hamad Pervaiz ',
		value: 'Hamad pervaiz',
	},
	{
		label: 'Ibrahim Hammayun',
		value: 'ibrahim hammayun',
	},
	{
		label: 'Muhammad Saad',
		value: 'muhammad saad',
	},
	{
		label: 'Taimoor Imam',
		value: 'taimor imaam',
	},
]

interface PayFrequency {
	label: string
	value: string
}

const payfrequency: PayFrequency[] = [
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

interface Gender {
	label: string
	value: string
}

const gender: Gender[] = [
	{
		label: 'Male',
		value: 'male',
	},
	{
		label: 'Female',
		value: 'female',
	},
]

interface Values {
	firstname: string
	lastname: string
	email: string
	phonenumber: number
	streetaddress: string
	city: string
	state: string
	postalcode: number
	employeeid: number
	jobtitle: string
	salary: number
	workhours: string
	images: string[]
}

interface Option {
	label: string
	value: string
}

const initialValues: Values = {
	firstname: '',
	lastname: '',
	email: '',
	phonenumber: 0,
	streetaddress: '',
	city: '',
	state: '',
	postalcode: 0,
	employeeid: 0,
	jobtitle: '',
	salary: 0,
	workhours: '',
	images: [],
}

const validationSchema = Yup.object({
	firstname: Yup.string().required('First Name is required'),
	lastname: Yup.string().required('Last Name is required'),
	email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
	phonenumber: Yup.number().required('Phone Number is required'),
	streetaddress: Yup.string().required('Street Address is required'),
	city: Yup.string().required('City is required'),
	state: Yup.string().required('State is required'),
	postalcode: Yup.number().required('Postal Code is required'),
	employeeid: Yup.number().required('Employee id is required'),
	jobtitle: Yup.string().required('Job Title is required'),
	salary: Yup.number().required('Salary is required'),
	images: Yup.array(),
})

export const Employeedetail: FC = (props) => {
	const router = useRouter()
	// const data = useAppSelector(assetCategorySelector)
	const [files, setFiles] = useState<File[]>([])
	const [categoryOptions, setCategoryOptions] = useState<Option[]>([])

	// useEffect(() => {
	// 	if (data.data) {
	// 		const updatedOptions: Option[] = data.data.map((category: any) => ({
	// 			label: category.name,
	// 			value: category.id,
	// 		}))
	// 		setCategoryOptions(updatedOptions)
	// 	}
	// }, [data])
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values, helpers): Promise<void> => {
			try {
				// NOTE: Make API request
				toast.success('New employee created')
				// router.push(paths.dashboard.products.index);
			} catch (err) {
				console.error(err)
				toast.error('Something went wrong!')
				helpers.setStatus({ success: false })
				// helpers.setErrors({ submit: err.message });
				helpers.setSubmitting(false)
			}
		},
	})
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

	return (
		<form
			onSubmit={formik.handleSubmit}
			{...props}
		>
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
									<Typography variant="h6">Personal Information</Typography>
								</Stack>
							</Grid>
							<Grid
								xs={12}
								md={9}
							>
								<Stack
									alignItems="center"
									direction="row"
									spacing={2}
								>
									<Box
										sx={{
											borderColor: 'neutral.300',
											borderRadius: '50%',
											borderStyle: 'dashed',
											borderWidth: 1,
											p: '4px',
										}}
									>
										<Box
											sx={{
												borderRadius: '50%',
												height: '100%',
												width: '100%',
												position: 'relative',
											}}
										>
											<Box
												sx={{
													alignItems: 'center',
													backgroundColor: 'black',
													borderRadius: '50%',
													color: 'common.white',
													cursor: 'pointer',
													display: 'flex',
													height: '100%',
													justifyContent: 'center',
													left: 0,
													opacity: 0,
													position: 'absolute',
													top: 0,
													width: '100%',
													zIndex: 1,
													'&:hover': {
														opacity: 1,
													},
												}}
											>
												<Stack
													alignItems="center"
													direction="row"
													spacing={1}
												>
													<SvgIcon color="inherit">
														<Camera01Icon />
													</SvgIcon>
													<Typography
														color="inherit"
														variant="subtitle2"
														sx={{ fontWeight: 700 }}
													>
														Select
													</Typography>
												</Stack>
											</Box>
											<Avatar
												// src={avatar}
												sx={{
													height: 100,
													width: 100,
												}}
											>
												<SvgIcon>
													<User01Icon />
												</SvgIcon>
											</Avatar>
										</Box>
									</Box>
									<Button
										color="inherit"
										size="small"
									>
										Change
									</Button>
								</Stack>

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
											>
												<TextField
													error={!!(formik.touched.firstname && formik.errors.firstname)}
													fullWidth
													helperText={formik.touched.firstname && formik.errors.firstname}
													label="First name"
													name="firstname"
													onBlur={formik.handleBlur}
													onChange={formik.handleChange}
													value={formik.values.firstname}
												/>
											</Grid>

											{/* last name */}
											<Grid
												xs={12}
												md={6}
											>
												<TextField
													error={!!(formik.touched.lastname && formik.errors.lastname)}
													fullWidth
													helperText={formik.touched.lastname && formik.errors.lastname}
													label="Last Name"
													name="lastname"
													onBlur={formik.handleBlur}
													onChange={formik.handleChange}
													value={formik.values.lastname}
												/>
											</Grid>

											{/* dob */}
											<Grid
												xs={12}
												md={6}
											>
												<DatePicker
													onChange={(newDate) => setSelectedDate(newDate)}
													label="Date OF Birth"
													value={selectedDate}
													sx={{ width: '100%' }} // Set the desired width
												/>
											</Grid>

											{/* gender */}
											<Grid
												xs={12}
												md={6}
											>
												<TextField
													fullWidth
													label="Gender"
													name="gender"
													select
													SelectProps={{ native: true }}
												>
													{gender.map((option) => (
														<option
															key={option.value}
															value={option.value}
														>
															{option.label}
														</option>
													))}
												</TextField>
											</Grid>
										</Grid>
									</Stack>
								</Grid>
							</Grid>
						</Grid>
						{/* contact information */}
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
									<Typography variant="h6">Contact Information</Typography>
								</Stack>
							</Grid>
							<Grid
								xs={12}
								md={9}
							>
								<Stack
									spacing={3}
									sx={{ width: '100%' }}
								>
									<Grid
										container
										spacing={2}
									>
										{/* email */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.email && formik.errors.email)}
												fullWidth
												helperText={formik.touched.email && formik.errors.email}
												label="Email"
												name="email"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.email}
											/>
										</Grid>

										{/* phone number*/}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.phonenumber && formik.errors.phonenumber)}
												fullWidth
												helperText={formik.touched.phonenumber && formik.errors.phonenumber}
												label="Phone Number"
												name="phonenumber"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.phonenumber}
											/>
										</Grid>

										{/* street address */}
										<Grid xs={12}>
											<Typography
												sx={{
													pb: 2,
													mt: 2,
												}}
												variant="h6"
											>
												Address
											</Typography>
											<TextField
												error={!!(formik.touched.streetaddress && formik.errors.streetaddress)}
												fullWidth
												helperText={formik.touched.streetaddress && formik.errors.streetaddress}
												label="Street Address"
												name="streetaddress"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.streetaddress}
											/>
										</Grid>

										{/* city */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.city && formik.errors.city)}
												fullWidth
												helperText={formik.touched.city && formik.errors.city}
												label="City"
												name="city"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.city}
											/>
										</Grid>
										{/* state */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.state && formik.errors.state)}
												fullWidth
												helperText={formik.touched.state && formik.errors.state}
												label="State"
												name="state"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.state}
											/>
										</Grid>

										{/* postal-code*/}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.postalcode && formik.errors.postalcode)}
												fullWidth
												helperText={formik.touched.postalcode && formik.errors.postalcode}
												label="Postal Code"
												name="postalcode"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.postalcode}
											/>
										</Grid>

										{/* gender */}
										<Grid
											xs={12}
											md={6}
										>
											<CountrySelect label="Country" />
										</Grid>
									</Grid>
								</Stack>
							</Grid>
						</Grid>

						{/* Employment Details  */}
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
									<Typography variant="h6">Employment Details</Typography>
								</Stack>
							</Grid>
							<Grid
								xs={12}
								md={9}
							>
								<Stack
									spacing={3}
									sx={{ width: '100%' }}
								>
									<Grid
										container
										spacing={2}
									>
										{/* employee ID*/}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.employeeid && formik.errors.employeeid)}
												fullWidth
												helperText={formik.touched.employeeid && formik.errors.employeeid}
												label="employee ID"
												name="employeeid"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.employeeid}
											/>
										</Grid>

										{/* Employment Status */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												fullWidth
												label="Employment Status"
												name="employeestatus"
												select
												SelectProps={{ native: true }}
											>
												{employeestatus.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
											</TextField>
										</Grid>

										{/* Employment Type */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												fullWidth
												label="Employment Type"
												name="employeetype"
												select
												SelectProps={{ native: true }}
											>
												{employeetype.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
											</TextField>
										</Grid>

										{/* Hire Date */}
										<Grid
											xs={12}
											md={6}
										>
											<DatePicker
												onChange={(newDate) => setSelectedDate(newDate)}
												label="Hire Date"
												value={selectedDate}
												sx={{ width: '100%' }} // Set the desired width
											/>
										</Grid>

										{/* Probation End Date */}
										<Grid
											xs={12}
											md={6}
										>
											<DatePicker
												onChange={(newDate) => setSelectedDate(newDate)}
												label="Probation End Date (optional)"
												value={selectedDate}
												sx={{ width: '100%' }} // Set the desired width
											/>
										</Grid>

										{/* Termination Date */}
										<Grid
											xs={12}
											md={6}
										>
											<DatePicker
												onChange={(newDate) => setSelectedDate(newDate)}
												label="Termination Date (optional)"
												value={selectedDate}
												sx={{ width: '100%' }} // Set the desired width
											/>
										</Grid>

										{/*Job Title*/}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.jobtitle && formik.errors.jobtitle)}
												fullWidth
												helperText={formik.touched.jobtitle && formik.errors.jobtitle}
												label="Job Title"
												name="jobtitle"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.jobtitle}
											/>
										</Grid>

										{/* Department */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												fullWidth
												label="Department "
												name="department"
												select
												SelectProps={{ native: true }}
											>
												{department.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
											</TextField>
										</Grid>

										{/* Manager / Supervisor */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												fullWidth
												label="Manager / Supervisor "
												name="manager/supervisor"
												select
												SelectProps={{ native: true }}
											>
												{Manager.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
											</TextField>
										</Grid>
										{/* Work Location */}
										<Grid
											xs={12}
											md={6}
										>
											<CountrySelect label="Work location" />
										</Grid>
									</Grid>
								</Stack>
							</Grid>
						</Grid>

						{/* Compensation  */}
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
									<Typography variant="h6">Compensation</Typography>
								</Stack>
							</Grid>
							<Grid
								xs={12}
								md={9}
							>
								<Stack
									spacing={3}
									sx={{ width: '100%' }}
								>
									<Grid
										container
										spacing={2}
									>
										{/* salary*/}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.salary && formik.errors.salary)}
												fullWidth
												helperText={formik.touched.salary && formik.errors.salary}
												label="Salary"
												name="salary"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.salary}
											/>
										</Grid>

										{/* payfrequency */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												fullWidth
												label="Pay Frequency"
												name="payfrequency"
												select
												SelectProps={{ native: true }}
											>
												{payfrequency.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
											</TextField>
										</Grid>

										{/*Currency */}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												fullWidth
												label="Currency"
												name="currency"
												select
												SelectProps={{ native: true }}
											>
												{currency.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
											</TextField>
										</Grid>

										{/*Benefits Package */}
										<Grid
											xs={12}
											md={6}
										>
											<MultipleSelectCheckmarks />
										</Grid>
									</Grid>
								</Stack>
							</Grid>
						</Grid>

						{/* Compensation  */}
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
									<Typography variant="h6">Work Schedule</Typography>
								</Stack>
							</Grid>
							<Grid
								xs={12}
								md={9}
							>
								<Stack
									spacing={3}
									sx={{ width: '100%' }}
								>
									<Grid
										container
										spacing={2}
									>
										{/* workhours*/}
										<Grid
											xs={12}
											md={6}
										>
											<TextField
												error={!!(formik.touched.workhours && formik.errors.workhours)}
												fullWidth
												helperText={formik.touched.workhours && formik.errors.workhours}
												label="Work Hours"
												name="workhours"
												placeholder="i.e 9am to 5pm"
												onBlur={formik.handleBlur}
												onChange={formik.handleChange}
												value={formik.values.workhours}
											/>
										</Grid>

										{/* payfrequency */}
										<Grid
											xs={12}
											md={6}
										>
											<MultipleSelectdays />
										</Grid>

										{/*Currency */}
										<Grid xs={12}>
											<TextField
												fullWidth
												label="TimeZone"
												name="timezone"
												select
												SelectProps={{ native: true }}
											>
												{timezone.map((option) => (
													<option
														key={option.value}
														value={option.value}
													>
														{option.label}
													</option>
												))}
											</TextField>
										</Grid>
									</Grid>
								</Stack>
							</Grid>
						</Grid>

						{/* custom fields */}
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
									<Typography variant="h6">Custom Fields</Typography>
								</Stack>
							</Grid>
							<Grid
								xs={12}
								md={9}
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
											{/* field name */}
											<Grid
												xs={12}
												md={6}
											>
												<TextField
													fullWidth
													label="Field Name"
													name="firstname"
													onBlur={formik.handleBlur}
													onChange={formik.handleChange}
													value={formik.values.firstname}
												/>
											</Grid>

											{/* field value */}
											<Grid
												xs={12}
												md={6}
											>
												<TextField
													fullWidth
													label="Field Value"
													name="lastname"
													onBlur={formik.handleBlur}
													onChange={formik.handleChange}
													value={formik.values.lastname}
												/>
											</Grid>
										</Grid>
									</Stack>
								</Grid>

								<Stack sx={{ display: 'flex', justifyContent: 'start', width: '100%' }}>
									<Button
										fullWidth
										size="large"
										sx={{
											background: theme.palette.background.default,
											color: 'transparent',
											WebkitBackgroundClip: 'text',
											display: 'flex',
											alignItems: 'center',
											ml: 1,
											justifyContent: 'left',
											// Other styles for the button as needed
										}}
										type="button"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#357DBC"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="feather feather-plus"
										>
											<line
												x1="12"
												y1="5"
												x2="12"
												y2="19"
											></line>
											<line
												x1="5"
												y1="12"
												x2="19"
												y2="12"
											></line>
										</svg>

										<span> Add Another Subject</span>
									</Button>
								</Stack>
							</Grid>
						</Grid>

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
							<Button color="inherit">Draft</Button>
							<Button sx={{ mt: 2, background: theme.palette.background.default, color: 'white' }}>
								Save
							</Button>
						</Stack>
					</Stack>
				</Card>
			</Stack>
		</form>
	)
}
