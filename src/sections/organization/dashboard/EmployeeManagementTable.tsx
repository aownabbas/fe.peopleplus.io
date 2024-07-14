import React from 'react' // Ensure React is imported
import type { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { Scrollbar } from '@components/scrollbar'
import { useAppSelector } from '@redux/hooks'
import { dashboardEmployeesSelector, statusSelector } from '@redux/features/dashboardSlice'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import NoRecordFound from '@components/NoRecordFound'
import { TableSkeleton } from '@components/Skeletons'
import { Tooltip } from '@mui/material'
import { urlPreFix } from '@config/index'

export const EmployeeManagementTable: FC = () => {
	const { t } = useTranslation()

	const employees = useAppSelector(dashboardEmployeesSelector)
	const status = useAppSelector(statusSelector)
	const navigate = useNavigate()

	return (
		<Scrollbar>
			<Table sx={{ minWidth: 700 }}>
				<TableHead>
					<TableRow>
						<TableCell width={'50%'}>
							{t(tokens.org_dashboard.management.employee_management.table.name)}
						</TableCell>
						<TableCell width={'25%'}>
							{t(tokens.org_dashboard.management.employee_management.table.department)}
						</TableCell>
						<TableCell width={'25%'}>
							{t(tokens.org_dashboard.management.employee_management.table.designation)}
						</TableCell>
					</TableRow>
				</TableHead>
				{status === 'LOADING' && employees.length === 0 ? (
					<TableBody>
						<TableSkeleton
							columns={3}
							rows={6}
							avatarColumn={0}
						/>
					</TableBody>
				) : employees.length === 0 ? (
					<TableRow>
						<TableCell colSpan={3}>
							<NoRecordFound />
						</TableCell>
					</TableRow>
				) : (
					<TableBody>
						{employees.map((employee) => (
							<TableRow
								sx={{
									cursor: 'pointer',
									borderRadius: '50px',
									padding: '5px 10px',
									'&:hover': {
										background: 'linear-gradient(to right, #357DBC2c, #B591DB2a)',
									},
								}}
								hover
								key={employee.id}
							>
								<TableCell>
									<Stack
										alignItems="center"
										direction="row"
										spacing={1}
									>
										<Avatar
											src={employee?.photo}
											sx={{
												height: 42,
												width: 42,
											}}
										/>
										<Box>
											<Tooltip title={`${employee?.first_name} ${employee?.last_name}`}>
												<Typography
													sx={{
														color: '#111927',
														fontWeight: 500,
														fontSize: 14,
														textWrap: 'nowrap',
														overflow: 'hidden',
														maxWidth: '280px',
														textOverflow: 'ellipsis',
													}}
													onClick={() =>
														navigate(`/${urlPreFix.employee}/profile/${employee.uuid}`)
													}
												>
													{`${employee?.first_name} ${employee?.last_name}`}
												</Typography>
											</Tooltip>

											<Tooltip title={employee?.email}>
												<Typography
													sx={{
														color: '#6C737F',
														fontWeight: 400,
														fontSize: 14,
														textWrap: 'nowrap',
														overflow: 'hidden',
														maxWidth: '280px',
														textOverflow: 'ellipsis',
													}}
												>
													{employee?.email}
												</Typography>
											</Tooltip>
										</Box>
									</Stack>
								</TableCell>
								<TableCell>
									<Tooltip title={employee.department?.name}>
										<Typography
											sx={{
												color: '#111927',
												fontWeight: 400,
												fontSize: 14,
												textWrap: 'nowrap',
												overflow: 'hidden',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
											}}
										>
											{employee.department?.name}
										</Typography>
									</Tooltip>
								</TableCell>
								<TableCell>
									<Tooltip title={employee?.designation}>
										<Typography
											sx={{
												color: '#111927',
												fontWeight: 400,
												fontSize: 14,
												textWrap: 'nowrap',
												overflow: 'hidden',
												maxWidth: '200px',
												textOverflow: 'ellipsis',
											}}
										>
											{employee?.designation}
										</Typography>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
		</Scrollbar>
	)
}
