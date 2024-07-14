/* eslint-disable prettier/prettier */
// Import necessary components and hooks
import { useState, useCallback, ChangeEvent, MouseEvent, useEffect, useMemo } from 'react'

// mui imports
import { createTheme } from '@mui/system'
import { Box, Button, Card, Container, Stack, SvgIcon, Typography } from '@mui/material'

// local imports
import { Seo } from '@components/seo'

import { Department } from '@sections/organization/employees/Department'
import { EmployeeListing } from '@sections/organization/employees/EmployeeListing'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { EmpListWidget } from '@components/empListWidget'
import { Link } from 'react-router-dom'

import { employeeListRequest } from '@service/employee.ts'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { departmentListAction } from '@redux/features/settingsSlice.ts'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import BackdropLoader from '@components/BackdropLoader'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import {
	employeeDepartmentListAction,
	employeeListAction,
	employeeSelector,
	filterEmployee,
} from '@redux/features/employeeSlice'
import Table from '@components/Skeletons/Table'

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

// Define Filters and State types
interface Filters {
	name?: string
	department_id?: string
	hasAcceptedMarketing?: boolean
	isProspect?: boolean
	isReturning?: boolean
	isLoading?: boolean
}

interface EmployeesSearchState {
	filters: Filters
	page: number
	per_page: number
	sortBy: string
	sortDir: 'asc' | 'desc'
}

const useEmployeesSearch = () => {
	const [state, setState] = useState<EmployeesSearchState>({
		filters: {
			name: '',
			department_id: '',
			hasAcceptedMarketing: undefined,
			isProspect: undefined,
			isReturning: undefined,
			isLoading: false,
		},
		page: 0,
		per_page: 10,
		sortBy: 'updatedAt',
		sortDir: 'desc',
	})

	const handleFiltersChange = useCallback((filters: Filters): void => {
		setState((prevState) => ({
			...prevState,
			filters,
		}))
	}, [])

	const handleSortChange = useCallback(
		(sort: { sortBy: string; sortDir: 'asc' | 'desc' }): void => {
			setState((prevState) => ({
				...prevState,
				sortBy: sort.sortBy,
				sortDir: sort.sortDir,
			}))
		},
		[],
	)

	const handlePageChange = useCallback(
		(event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
			setState((prevState) => ({
				...prevState,
				page,
			}))
		},
		[],
	)

	const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
		setState((prevState) => ({
			...prevState,
			per_page: parseInt(event.target.value, 10),
			page: 0,
		}))
	}, [])

	return {
		handleFiltersChange,
		handleSortChange,
		handlePageChange,
		handleRowsPerPageChange,
		state,
	}
}

const Listing = () => {
	const { list, tempList, employeePagination } = useAppSelector(employeeSelector)

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.employee.profile_layout.breadcrumbs.dashboard, url: '/' },
		{ label: tokens.employee.listing.breadcrumbs.employee, color: 'black' },
	]

	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const [isSearchLoading, setSearchLoading] = useState(false)

	useEffect(() => {
		Promise.all([dispatch(employeeDepartmentListAction()), dispatch(employeeListAction())])
	}, [])

	const employeesSearch = useEmployeesSearch()

	const mapSearchStateToEmployeeParams = useMemo(() => {
		return () => {
			if (employeesSearch.state.filters.isLoading) {
				setSearchLoading(true)
			}
			const { department_id, name } = employeesSearch.state.filters
			const { page, per_page, sortDir } = employeesSearch.state

			return {
				department_id,
				name,
				page,
				per_page,
				sortDir,
				isPagination: true,
			}
		}
	}, [employeesSearch.state])

	const applyFilters = useMemo(() => {
		return () => {
			const items = tempList
			const paginationStateKey = 'employeePagination'
			const listPropertyKey = 'list'
			const filters = mapSearchStateToEmployeeParams()
			dispatch(filterEmployee({ filters, items, paginationStateKey, listPropertyKey }))
		}
	}, [dispatch, mapSearchStateToEmployeeParams])

	useEffect(() => {
		applyFilters()
	}, [applyFilters])

	const [employees, setEmployee] = useState<{ data: any[]; total: number }>({ data: [], total: 0 })

	// if (list.length==0  && !employeesSearch.state.filters.isLoading) {
	// 	return <Table rows={6} columns={2} />
	// }

	return (
		<>
			<Seo title={t(tokens.seo_titles.employees.listing)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<CustomBreadcrumbs links={breadcrumbsLinks} />

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Box>
								<Typography
									sx={{
										fontSize: '24px',
										fontWeight: 600,
										color: '#111927',

										'@media (min-width:600px)': {
											fontSize: '32px',
											fontWeight: 700,
										},
									}}
								>
									{t(tokens.employee.listing.header.heading)}
								</Typography>
							</Box>
							<Link to={'/employees/create'}>
								<Button
									sx={{
										background: theme.palette.background.default,
										color: 'white',
										gap: 1,
									}}
								>
									<SvgIcon
										sx={{
											margin: '0px',
											width: '20px',
										}}
									>
										<PlusIcon />
									</SvgIcon>
									<Typography
										sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500, fontSize: 14 }}
									>
										{t(tokens.employee.listing.button.add_employee)}
									</Typography>
								</Button>
							</Link>
						</Box>

						<EmpListWidget employeeCount={employeePagination.total_records} />
						<Card>
							{/* Department Component */}
							<Department
								onFiltersChange={employeesSearch.handleFiltersChange}
								onSortChange={employeesSearch.handleSortChange}
								sortBy={employeesSearch.state.sortBy}
								sortDir={employeesSearch.state.sortDir}
							/>
							{/* Listing table Component */}

							<EmployeeListing
								count={employeePagination.total_records}
								isSearchLoading={isSearchLoading}
								items={list}
								onPageChange={employeesSearch.handlePageChange}
								onRowsPerPageChange={employeesSearch.handleRowsPerPageChange}
								page={employeePagination.page}
								rowsPerPage={employeePagination.per_page}
							/>
						</Card>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default Listing
