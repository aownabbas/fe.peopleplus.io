import React, { FC, useState, useEffect, useCallback } from 'react'
import {
	Avatar,
	Box,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TablePagination,
	CircularProgress,
	Card,
	Tooltip,
} from '@mui/material'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Scrollbar } from '@components/scrollbar'
import RecordNotFound from '@components/RecordNotFound'
import { unLinkedEmployeeListRequest } from '@service/employee'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import { formatTime } from '@utils/times'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { employeeSelector, filterEmployee } from '@redux/features/employeeSlice'
import { TableSkeleton } from '@components/Skeletons'
import { urlPreFix } from '@config/index'

type EmployeesData = {
	data: any[]
	total: number
}

interface PaginationState {
	page: number
	per_page: number
}

interface TeamListTableProps {
	onPageChangeProp: (pagination: PaginationState) => void
	loading: boolean
}

const type = 'unlinked'
const TeamListTable: FC<TeamListTableProps> = ({ onPageChangeProp, loading }) => {
	const { list, unlinkedList, tempUnLinkedList, unlinkedEmployeePagination, status } =
		useAppSelector(employeeSelector)
	const dispatch = useAppDispatch()

	const { t } = useTranslation()
	const [pagination, setPagination] = useState<PaginationState>({
		page: 0,
		per_page: 10,
	})

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		const filters = { ...pagination, page: newPage }
		setPagination(filters)
		const items = tempUnLinkedList
		const paginationStateKey = 'unlinkedEmployeePagination'
		const listPropertyKey = 'unlinkedList'
		dispatch(filterEmployee({ items, filters, paginationStateKey, listPropertyKey }))

		// onPageChangeProp(newPagination)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const newPagination = { page: 0, per_page: parseInt(event.target.value) }
		setPagination(newPagination)
		const filters = { ...pagination, page: 0, per_page: parseInt(event.target.value) }
		const items = tempUnLinkedList
		const paginationStateKey = 'unlinkedEmployeePagination'
		const listPropertyKey = 'unlinkedList'
		dispatch(filterEmployee({ items, filters, paginationStateKey, listPropertyKey }))
		onPageChangeProp(newPagination)
	}

	return (
		<>
			<Card>
				<Fragment>
					<Scrollbar>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell width={'35%'}>{t(tokens.organizational_chart.table.name)}</TableCell>
									<TableCell width={'20%'}>
										{t(tokens.organizational_chart.table.department)}
									</TableCell>
									<TableCell width={'25%'}>
										{t(tokens.organizational_chart.table.designation)}
									</TableCell>
									<TableCell width={'20%'}>
										{t(tokens.organizational_chart.table.joining_date)}
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{unlinkedList.length === 0 && status === 'LOADING' ? (
									<TableSkeleton
										columns={4}
										rows={10}
										avatarColumn={0}
									/>
								) : unlinkedList.length === 0 && status === 'SUCCESS' ? (
									<TableRow>
										<TableCell colSpan={4}>
											<RecordNotFound />
										</TableCell>
									</TableRow>
								) : (
									<>
										{unlinkedList.map((employee: any) => (
											<TableRow
												key={employee.id}
												sx={{
													cursor: 'pointer',
													borderRadius: '50px',
													padding: '5px 10px',
													'&:hover': {
														background: 'linear-gradient(to right, #357DBC2c, #B591DB2a)',
													},
												}}
												hover
											>
												<TableCell>
													<Stack
														alignItems="center"
														direction="row"
														spacing={1}
													>
														<Avatar
															src={employee.photo}
															sx={{ height: 42, width: 42 }}
														/>
														<Stack>
															<Tooltip title={`${employee.first_name} ${employee.last_name}`}>
																<Link
																	style={{
																		color: 'black',
																		textDecoration: 'none',
																		fontWeight: '500',
																	}}
																	to={`/${urlPreFix.employee}/profile/${employee.uuid}`}
																>
																	<Typography
																		sx={{
																			color: '#111927',
																			fontWeight: 500,
																			fontSize: 14,
																			textWrap: 'nowrap',
																			overflow: 'hidden',
																			maxWidth: '400px',
																			textOverflow: 'ellipsis',
																		}}
																	>
																		{employee.first_name} {employee.last_name}
																	</Typography>
																</Link>
															</Tooltip>

															<Tooltip title={employee.email}>
																<Typography
																	sx={{
																		color: '#6C737F',
																		fontWeight: 400,
																		fontSize: 14,
																		textWrap: 'nowrap',
																		overflow: 'hidden',
																		maxWidth: '400px',
																		textOverflow: 'ellipsis',
																	}}
																>
																	{employee.email}
																</Typography>
															</Tooltip>
														</Stack>
													</Stack>
												</TableCell>
												<TableCell>
													<Tooltip title={employee.department?.name}>
														<Typography
															sx={{
																color: '#111927',
																fontWeight: 500,
																fontSize: 14,
																textWrap: 'nowrap',
																overflow: 'hidden',
																maxWidth: '300px',
																textOverflow: 'ellipsis',
															}}
														>
															{employee.department?.name}
														</Typography>
													</Tooltip>
												</TableCell>
												<TableCell>
													<Tooltip title={employee.job_title}>
														<Typography
															sx={{
																color: '#111927',
																fontWeight: 500,
																fontSize: 14,
																textWrap: 'nowrap',
																overflow: 'hidden',
																maxWidth: '300px',
																textOverflow: 'ellipsis',
															}}
														>
															{employee.job_title}{' '}
														</Typography>
													</Tooltip>
												</TableCell>

												<TableCell>
													<Tooltip
														title={
															employee.joining_date &&
															formatTime(employee.joining_date.toString(), 'MMM dd yyyy')
														}
													>
														<Typography
															sx={{
																color: '#111927',
																fontWeight: 500,
																fontSize: 14,
																textWrap: 'nowrap',
																overflow: 'hidden',
																maxWidth: '200px',
																textOverflow: 'ellipsis',
															}}
														>
															{employee.joining_date &&
																formatTime(employee.joining_date.toString(), 'MMM dd yyyy')}
														</Typography>
													</Tooltip>
												</TableCell>
											</TableRow>
										))}
									</>
								)}
							</TableBody>
						</Table>
					</Scrollbar>

					{!loading && (
						<TablePagination
							component="div"
							count={unlinkedEmployeePagination.total_records}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							page={pagination.page}
							rowsPerPage={pagination.per_page}
							rowsPerPageOptions={[5, 10, 25]}
						/>
					)}
				</Fragment>
			</Card>
		</>
	)
}

export default TeamListTable
