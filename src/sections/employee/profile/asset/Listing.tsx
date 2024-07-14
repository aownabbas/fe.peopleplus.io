/* eslint-disable prettier/prettier */
import type { ChangeEvent, FC, MouseEvent } from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { Scrollbar } from '@components/scrollbar'
import { SeverityPill } from '@components/severity-pill'
import { Asset } from 'type/asset'
import { Avatar, Table, Tooltip } from '@mui/material'
import RecordNotFound from '@components/RecordNotFound'
import { CircularProgress } from '@mui/material'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import NoRecordFound from '@components/NoRecordFound'
import { TableSkeleton } from '@components/Skeletons'
import { useAppSelector } from '@redux/hooks'
import ArrowIcon from '@untitled-ui/icons-react/build/esm/ArrowNarrowRight'
import { dateFormat } from '@utils/date-format'

interface AssetListingProps {
	count?: number
	isSearchLoading: boolean
	items?: Asset[]
	onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void
	onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void
	page?: number
	rowsPerPage?: number
}

export const AssetListing: FC<AssetListingProps> = (props) => {
	const isLoading = useAppSelector((state) => state.assets.isLoading)

	const {
		count = 0,
		isSearchLoading = false,
		items = [],
		onPageChange = () => {},
		onRowsPerPageChange,
		page = 0,
		rowsPerPage = 0,
	} = props

	const { t } = useTranslation()

	return (
		<div>
			<Fragment>
				<Scrollbar>
					<Table sx={{ minWidth: 1200 }}>
						<TableHead>
							<TableRow>
								<TableCell width="25%">{t(tokens.asset.table_heading.name)}</TableCell>
								<TableCell>{t(tokens.asset.table_heading.serial_no)}</TableCell>
								<TableCell width="25%">{t(tokens.asset.table_heading.last_assigned)} </TableCell>
								<TableCell>{t(tokens.asset.table_heading.asset_value)}</TableCell>
								<TableCell>{t(tokens.asset.table_heading.status)}</TableCell>
								<TableCell align="right">{t(tokens.asset.table_heading.action)}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{items.length === 0 && isLoading ? (
								<TableSkeleton
									columns={6}
									rows={10}
									avatarColumn={0}
								/>
							) : items.length === 0 ? (
								<TableRow>
									<TableCell colSpan={7}>
										<NoRecordFound />
									</TableCell>
								</TableRow>
							) : (
								<>
									{items.map((product) => {
										const statusColor = product.status === 'active' ? 'success' : 'error'
										const imageToRender =
											product.asset_images &&
											product.asset_images.length > 0 &&
											product.asset_images[0]
												? product.asset_images[0].url
												: null

										return (
											<Fragment key={product.id}>
												<TableRow
													hover
													key={product.id}
												>
													<TableCell>
														<Box
															sx={{
																alignItems: 'center',
																display: 'flex',
															}}
														>
															<Box
																sx={{
																	alignItems: 'center',
																	backgroundColor: 'neutral.50',
																	backgroundImage: `url(${imageToRender})`,
																	backgroundPosition: 'center',
																	backgroundSize: 'cover',
																	borderRadius: '100%',
																	display: 'flex',
																	height: 40,
																	justifyContent: 'center',
																	overflow: 'hidden',
																	width: 40,
																}}
															/>
															<Box
																sx={{
																	cursor: 'pointer',
																	ml: 2,
																}}
															>
																<Tooltip title={product.name}>
																	<Link
																		style={{
																			textDecoration: 'none',
																		}}
																		to={`/profile/asset/detail/${product.uuid}`}
																	>
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
																			{product.name}
																		</Typography>
																	</Link>
																</Tooltip>

																<Tooltip title={product.asset_category?.name}>
																	<Typography
																		sx={{
																			color: '#6C737F',
																			fontWeight: 400,
																			lineHeight: '22px',
																			fontSize: 14,
																			textWrap: 'nowrap',
																			overflow: 'hidden',
																			maxWidth: '300px',
																			textOverflow: 'ellipsis',
																		}}
																	>
																		in {product.asset_category?.name}
																	</Typography>
																</Tooltip>
															</Box>
														</Box>
													</TableCell>
													<TableCell>
														<Tooltip title={product.tag_id}>
															<Typography
																sx={{
																	color: '#111927',
																	fontWeight: 500,
																	fontSize: 14,
																	textWrap: 'nowrap',
																	overflow: 'hidden',
																	maxWidth: '100px',
																	textOverflow: 'ellipsis',
																}}
															>
																{product.tag_id}
															</Typography>
														</Tooltip>
													</TableCell>

													<TableCell>
														{product.employee && (
															<Box
																sx={{
																	alignItems: 'center',
																	display: 'flex',
																}}
															>
																<Avatar src={product.employee?.photo}></Avatar>

																<Box
																	sx={{
																		cursor: 'pointer',
																		ml: 2,
																	}}
																>
																	<Tooltip
																		title={`${product.employee?.first_name} ${product.employee?.last_name}`}
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
																			{product.employee?.first_name} {product.employee?.last_name}
																		</Typography>
																	</Tooltip>
																	<Typography
																		sx={{
																			color: '#6C737F',
																			fontSize: 14,
																			fontWeight: 400,
																			lineHeight: '22px',
																		}}
																	>
																		{product?.allocation_date
																			? dateFormat(product.allocation_date)
																			: ''}
																	</Typography>
																</Box>
															</Box>
														)}
													</TableCell>

													<TableCell>
														<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
															<Typography
																sx={{
																	color: '#111927',
																	fontSize: 14,
																	fontWeight: 500,
																	textWrap: 'nowrap',
																	overflow: 'hidden',
																	maxWidth: '200px',
																	textOverflow: 'ellipsis',
																}}
															>
																{product.purchase_currency
																	? product.purchase_currency.toUpperCase()
																	: ''}
															</Typography>
															<Typography
																sx={{
																	color: '#111927',
																	fontSize: 14,
																	fontWeight: 500,
																	textWrap: 'nowrap',
																	overflow: 'hidden',
																	maxWidth: '200px',
																	textOverflow: 'ellipsis',
																}}
															>
																{' '}
																{product.purchase_price}
															</Typography>
														</Box>
													</TableCell>
													<TableCell>
														<SeverityPill
															color={statusColor}
															sx={{
																fontWeight: 600,
																fontSize: 12,
																lineHeight: '24px',
															}}
														>
															{product.status}
														</SeverityPill>
													</TableCell>
													<TableCell
														sx={{
															display: 'flex',
															flexDirection: 'row',
															alignItems: 'center',
															justifyContent: 'right',
														}}
													>
														<Tooltip title="Detail">
															<Link to={`/profile/asset/detail/${product.uuid}`}>
																<IconButton>
																	<ArrowIcon />
																</IconButton>
															</Link>
														</Tooltip>
													</TableCell>
												</TableRow>
											</Fragment>
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
			</Fragment>
		</div>
	)
}
