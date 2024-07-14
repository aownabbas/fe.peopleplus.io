/* eslint-disable prettier/prettier */
import { ChangeEvent, FC, MouseEvent } from 'react'
import {
	Box,
	Button,
	Checkbox,
	IconButton,
	Table,
	Stack,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	CircularProgress,
	Avatar,
	useMediaQuery,
	useTheme,
	Tooltip,
} from '@mui/material'
import { Link } from 'react-router-dom'
import RecordNotFound from '@components/RecordNotFound'
import { Scrollbar } from '@components/scrollbar.tsx'
import type { Employee } from 'type/employee.ts'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { TableSkeleton } from '@components/Skeletons'
import { useAppSelector } from '@redux/hooks'
import { employeeSelector } from '@redux/features/employeeSlice'
import { urlPreFix } from '@config/index'
interface EmployeeListTableProps {
	count?: number
	isSearchLoading: boolean
	items?: Employee[]
	onDeselectAll?: () => void
	onDeselectOne?: (employeeId: string) => void
	onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
	onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
	onSelectAll?: () => void
	onSelectOne?: (employeeId: string) => void
	page?: number
	rowsPerPage?: number
	selected?: string[]
}

export const EmployeeListing: FC<EmployeeListTableProps> = (props) => {
	const { t } = useTranslation()
	const { list } = useAppSelector(employeeSelector)
	const isLoading = useAppSelector((state) => state.employee.isLoading)

	const {
		count = 0,
		isSearchLoading = false,
		items = [],
		onDeselectAll,
		onPageChange = () => {},
		onRowsPerPageChange,
		onSelectAll,
		page = 0,
		rowsPerPage = 0,
		selected = [],
	} = props

	const selectedSome = selected.length > 0 && selected.length < items.length
	const selectedAll = items.length > 0 && selected.length === items.length
	const enableBulkActions = selected.length > 0
	const theme = useTheme()
	const isXsDown = useMediaQuery(theme.breakpoints.down('md'))

	return (
		<Box sx={{ position: 'relative' }}>
			{enableBulkActions && (
				<Stack
					direction="row"
					spacing={2}
					sx={{
						alignItems: 'center',
						backgroundColor: (theme) =>
							theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
						display: enableBulkActions ? 'flex' : 'none',
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						px: 2,
						py: 0.5,
						zIndex: 10,
					}}
				>
					<Checkbox
						checked={selectedAll}
						indeterminate={selectedSome}
						onChange={(event) => {
							if (event.target.checked) {
								onSelectAll?.()
							} else {
								onDeselectAll?.()
							}
						}}
					/>
					<Button
						color="inherit"
						size="small"
					>
						Delete
					</Button>
					<Button
						color="inherit"
						size="small"
					>
						Edit
					</Button>
				</Stack>
			)}
			<Scrollbar>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width={300}>
								{t(tokens.employee.listing.listing_table.table.name)}
							</TableCell>
							<TableCell width={250}>
								{t(tokens.employee.listing.listing_table.table.designation)}
							</TableCell>
							{!isXsDown && (
								<TableCell width={300}>
									{' '}
									{t(tokens.employee.listing.listing_table.table.address)}
								</TableCell>
							)}
							{!isXsDown && (
								<TableCell width={250}>
									{t(tokens.employee.listing.listing_table.table.last_activity)}
								</TableCell>
							)}
							<TableCell
								width={100}
								align="right"
							>
								{t(tokens.employee.listing.listing_table.table.action)}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{list.length === 0 && isLoading ? (
							<TableSkeleton
								columns={5}
								rows={10}
								avatarColumn={0}
							/>
						) : list.length === 0 && !isLoading ? (
							<TableRow>
								<TableCell colSpan={5}>
									<RecordNotFound />
								</TableCell>
							</TableRow>
						) : (
							<>
								{items.map((employee, idx) => {
									return (
										<TableRow key={idx}>
											<TableCell>
												<Stack
													alignItems="center"
													direction="row"
													spacing={1}
												>
													<Box
														sx={{
															position: 'relative',
														}}
													>
														<Avatar
															src={employee.photo}
															style={{
																height: 42,
																width: 42,
																objectFit: 'cover',
															}}
														/>
													</Box>

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
																		maxWidth: '250px',
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
																	maxWidth: '250px',
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
												<Stack>
													<Tooltip title={employee.job_title}>
														<Typography
															sx={{
																color: '#111927',
																fontWeight: 500,
																fontSize: 14,
																textWrap: 'nowrap',
																overflow: 'hidden',
																maxWidth: '220px',
																textOverflow: 'ellipsis',
															}}
														>
															{employee.job_title}
														</Typography>
													</Tooltip>
													<Tooltip title={employee.department?.name}>
														<Typography
															sx={{
																color: '#111927',
																fontWeight: 400,
																fontSize: 14,
																textWrap: 'nowrap',
																overflow: 'hidden',
																maxWidth: '220px',
																textOverflow: 'ellipsis',
															}}
														>
															{employee.department?.name}
														</Typography>
													</Tooltip>
												</Stack>
											</TableCell>

											{!isXsDown && (
												<TableCell>
													<Tooltip title={employee.address}>
														<Typography
															sx={{
																color: '#111927',
																fontWeight: 400,
																fontSize: 14,
																textWrap: 'nowrap',
																overflow: 'hidden',
																maxWidth: '300px',
																textOverflow: 'ellipsis',
															}}
														>
															{employee.address}
														</Typography>
													</Tooltip>
												</TableCell>
											)}

											{!isXsDown && (
												<TableCell>
													<Typography>N/A</Typography>
												</TableCell>
											)}
											<TableCell align="right">
												<IconButton>
													<Link to={`/${urlPreFix.employee}/profile/${employee.uuid}`}>
														<IconButton>
															<img
																style={{ width: 20 }}
																src={`/arrow.png`}
																alt={`detail`}
															/>
														</IconButton>
													</Link>
												</IconButton>
											</TableCell>
										</TableRow>
									)
								})}
							</>
						)}
					</TableBody>
				</Table>
			</Scrollbar>

			<TablePagination
				component="div"
				count={count}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Box>
	)
}
