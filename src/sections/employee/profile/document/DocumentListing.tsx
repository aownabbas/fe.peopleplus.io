/* eslint-disable prettier/prettier */
import { ChangeEvent, FC, MouseEvent } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { Link } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import toast from 'react-hot-toast'

import { Scrollbar } from '@components/scrollbar.tsx'
import type { Document } from 'type/employee.ts'
import { bytesToSize } from '@utils/bytes-to-size'
import { dateFormat } from '@utils/date-format'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	deleteEmployeeDocumentAction,
	employeeSelector,
	openModal,
} from '@redux/features/employeeSlice'
import EditIcon from '@untitled-ui/icons-react/build/esm/Edit01'
import Trash01 from '@untitled-ui/icons-react/build/esm/Trash01'
import { CircularProgress, Tooltip } from '@mui/material'
import NoRecordFound from '@components/NoRecordFound'
import { TableSkeleton } from '@components/Skeletons'

interface EmployeeListTableProps {
	count?: number
	isSearchLoading: boolean
	items?: Document[]
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

function getIconForMimeType(mimeType: string): string {
	const mimeTypeToIconMap: Record<string, string> = {
		'application/pdf': 'pdf.png',
		'image/png': 'pngfile.png',
		'image/jpg': 'jpg.png',
		'image/jpeg': 'jpg.png',
		'application/msword': 'document.png',
	}
	return mimeTypeToIconMap[mimeType] || 'pngfile.png'
}

const DocumentListing: FC<EmployeeListTableProps> = (props) => {
	const dispatch = useAppDispatch()

	// TODO: why this code is here , i commented
	// function deleteDocument(uuid: string) {
	// 	dispatch(deleteEmployeeDocumentAction(uuid))
	// 		.then(() => {
	// 			toast.success('Record Deleted successfully!')
	// 		})
	// 		.catch((error) => {
	// 			// Handle error if any
	// 			console.error('Error Store Employee Document:', error)
	// 		})
	// }

	// const handleEditDocument = (documentId: string, categoryId: string) => {
	// 	dispatch(openModal({ documentId, categoryId }))
	// }
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

	const status = useAppSelector(employeeSelector).isLoading

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
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<TableCell width={400}>Name</TableCell>
							<TableCell width={250}>Last Update</TableCell>
							<TableCell width={300}>Created By</TableCell>
						</TableRow>
					</TableHead>
					{status === true ? (
						<TableSkeleton
							columns={3}
							rows={10}
							avatarColumn={0}
						/>
					) : (
						<TableBody>
							{isSearchLoading ? (
								<TableRow>
									<TableCell
										colSpan={5}
										align="center"
									>
										<CircularProgress />
									</TableCell>
								</TableRow>
							) : count === 0 ? (
								<TableRow>
									<TableCell colSpan={5}>
										<NoRecordFound />
									</TableCell>
								</TableRow>
							) : (
								<>
									{items.map((object, idx) => {
										return (
											<TableRow key={idx}>
												<TableCell>
													<Link
														to={object.file_path}
														target={'_blank'}
														style={{
															fontWeight: 500,
															fontSize: 14,
															lineHeight: '22px',
															color: '#111927',
															textDecoration: 'none',
														}}
													>
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
																	src={`/fileformat/${getIconForMimeType(object.mime_type)}`}
																	sx={{
																		height: 50,
																		width: 42,
																		borderRadius: 0,
																		backgroundColor: 'transparent',
																	}}
																/>
															</Box>

															<Stack>
																<Tooltip title={object.file_name}>
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
																		{object.file_name}
																	</Typography>
																</Tooltip>

																<Typography
																	sx={{
																		color: '#6C737F',
																		fontWeight: 400,
																		fontSize: 14,
																		textWrap: 'nowrap',
																		overflow: 'hidden',
																		maxWidth: '200px',
																		textOverflow: 'ellipsis',
																	}}
																>
																	{bytesToSize(object.size)}
																</Typography>
															</Stack>
														</Stack>
													</Link>
												</TableCell>

												<TableCell>
													<Stack>
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
															{dateFormat(object.created_at)}
														</Typography>
														<Tooltip title={object.document_category?.name}>
															<Typography
																sx={{
																	color: '#6C737F',
																	fontWeight: 400,
																	fontSize: 14,
																	textWrap: 'nowrap',
																	overflow: 'hidden',
																	maxWidth: '180px',
																	textOverflow: 'ellipsis',
																}}
															>
																{object.document_category?.name}
															</Typography>
														</Tooltip>
													</Stack>
												</TableCell>

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
																src={object?.uploadBy?.photo}
																sx={{
																	height: 40,
																	width: 40,
																	borderRadius: '100%',
																	backgroundColor: 'transparent',
																}}
															/>
														</Box>

														<Stack>
															<Tooltip
																title={`${object.uploadBy.first_name} ${object.uploadBy.last_name}`}
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
																	{object.uploadBy.first_name} {object.uploadBy.last_name}
																</Typography>
															</Tooltip>
															<Tooltip title={object.uploadBy.email}>
																<Typography
																	sx={{
																		color: '#6C737F',
																		fontWeight: 400,
																		fontSize: 14,
																		textWrap: 'nowrap',
																		overflow: 'hidden',
																		maxWidth: '180px',
																		textOverflow: 'ellipsis',
																	}}
																>
																	{object.uploadBy.email}
																</Typography>
															</Tooltip>
														</Stack>
													</Stack>
												</TableCell>
											</TableRow>
										)
									})}
								</>
							)}
						</TableBody>
					)}
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

export default DocumentListing
