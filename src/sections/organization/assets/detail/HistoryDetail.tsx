import type { FC } from 'react'
import { useContext, useState } from 'react'
// mui imports
import {
	Grid,
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	Stack,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	Button,
	CircularProgress,
	Tooltip,
	SvgIcon,
} from '@mui/material'

import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02'

import { assetsSelector } from '@redux/features/assetsSlice'
import { useAppSelector } from '@redux/hooks'
import { formatTime } from '@utils/times'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { deleteAssetRequest } from '@service/asset'
import { Link, useNavigate } from 'react-router-dom'
import { createTheme } from '@mui/system'
import { SHOW_SUCCESS } from '@utils/ToastMessage'
import { Scrollbar } from '@components/scrollbar'
// import DeleteButton from '@components/DeleteButton'
import DeleteBtn from '@components/DeleteButton'
import { ConfirmationContext } from '@contexts/confirmation'
import { deleteAssetAction } from '@redux/features/assetsSlice'
import { useAppDispatch } from '@redux/hooks'
import { urlPreFix } from '@config/index'

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

const HistoryDetail: FC = () => {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(false) // State to manage loading state
	const navigate = useNavigate()
	const { openModal } = useContext(ConfirmationContext)

	const handleDelete = async (uuid: string) => {
		openModal(
			`Are you sure you want to delete this Asset?`,
			async () => {
				dispatch(deleteAssetAction(uuid)).then(() => {
					navigate('/assets')
				})
			},
			() => {
				console.log('Cancelled')
			},
		)
	}

	const { t } = useTranslation()

	const { asset, status } = useAppSelector(assetsSelector)

	const { assign_history } = asset

	return (
		<Grid
			item
			xs={12}
			md={4}
		>
			<Card
				sx={{
					boxShadow: 'none !important',
					border: '1px solid #EAECF0',
					padding: ' 32px 24px',
				}}
			>
				<Stack spacing={3}>
					{assign_history && assign_history.length > 0 && (
						<>
							<Box>
								<Typography
									sx={{
										color: '#6C737F',
										fontSize: 12,
										fontWeight: 600,
										lineHeight: '24px',
										textTransform: 'uppercase',
									}}
								>
									{t(tokens.asset.history_detail.assigned_history)}
								</Typography>
							</Box>

							<Scrollbar sx={{ maxHeight: '290px' }}>
								<Box sx={{ maxHeight: '280px' }}>
									<List disablePadding>
										{assign_history?.map((data, idx) => (
											<ListItem
												disableGutters
												key={idx}
											>
												<ListItemAvatar>
													<Avatar src={data.photo} />
												</ListItemAvatar>
												<ListItemText
													primary={
														<Link
															style={{
																fontWeight: 500,
																fontSize: 14,
																lineHeight: '22px',
																color: '#111927',
																textDecoration: 'none',
															}}
															to={`/${urlPreFix.employee}/profile/${data.employee_uuid}`}
														>
															<Tooltip title={data.employee_name}>
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
																	{data.employee_name}
																</Typography>
															</Tooltip>

															{/* <Typography variant="subtitle2">{data.employee_name}</Typography> */}
														</Link>
													}
													secondary={
														<Typography
															color="text.secondary"
															variant="body2"
														>
															{data.duration}
														</Typography>
													}
												/>
											</ListItem>
										))}
									</List>
								</Box>
							</Scrollbar>
						</>
					)}

					<Box>
						<Typography
							sx={{
								color: '#6C737F',
								fontSize: 12,
								fontWeight: 600,
								lineHeight: '24px',
								textTransform: 'uppercase',
							}}
						>
							{t(tokens.asset.history_detail.information)}
						</Typography>
					</Box>

					<Box>
						<Stack spacing={1}>
							<Stack>
								<Typography
									sx={{ color: '#111927', fontWeight: 500, lineHeight: '22px', fontSize: 14 }}
								>
									{t(tokens.asset.history_detail.category)}
								</Typography>

								<Tooltip title={asset.asset_category?.name}>
									<Typography
										sx={{
											color: '#6C737F',
											fontWeight: 400,
											lineHeight: '22px',
											fontSize: 14,
											textWrap: 'nowrap',
											overflow: 'hidden',
											maxWidth: '400px',
											textOverflow: 'ellipsis',
										}}
									>
										{asset.asset_category?.name}
									</Typography>
								</Tooltip>
							</Stack>
							{asset.purchase_date && (
								<Stack>
									<Typography
										sx={{ color: '#111927', fontWeight: 500, lineHeight: '22px', fontSize: 14 }}
									>
										{t(tokens.asset.history_detail.purchase_date)}
									</Typography>

									<Typography
										sx={{ color: '#6C737F', fontWeight: 400, lineHeight: '22px', fontSize: 14 }}
									>
										{asset.purchase_date &&
											formatTime(asset.purchase_date.toString(), 'MMM dd yyyy')}
									</Typography>
								</Stack>
							)}

							{asset.purchase_price && (
								<Stack>
									<Typography
										sx={{ color: '#111927', fontWeight: 500, lineHeight: '22px', fontSize: 14 }}
									>
										{t(tokens.asset.history_detail.purchase_price)}
									</Typography>

									<Tooltip
										title={`${asset.purchase_currency ? asset.purchase_currency.toUpperCase() : ''} ${asset.purchase_price}`}
									>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<Typography
												sx={{ color: '#6C737F', fontWeight: 400, lineHeight: '22px', fontSize: 14 }}
											>
												{asset.purchase_currency ? asset.purchase_currency.toUpperCase() : ''}
											</Typography>
											<Typography
												sx={{
													color: '#6C737F',
													fontWeight: 400,
													lineHeight: '22px',
													fontSize: 14,
													textWrap: 'nowrap',
													overflow: 'hidden',
													maxWidth: '200px',
													textOverflow: 'ellipsis',
												}}
											>
												{asset.purchase_price}
											</Typography>
										</Box>
									</Tooltip>
								</Stack>
							)}

							{asset.location && (
								<Stack>
									<>
										<Typography
											sx={{ color: '#111927', fontWeight: 500, lineHeight: '22px', fontSize: 14 }}
										>
											{t(tokens.asset.history_detail.location)}
										</Typography>
										<Tooltip title={asset?.location}>
											<Typography
												sx={{
													color: '#6C737F',
													fontWeight: 400,
													lineHeight: '22px',
													fontSize: 14,
													textWrap: 'nowrap',
													overflow: 'hidden',
													maxWidth: '400px',
													textOverflow: 'ellipsis',
												}}
											>
												{asset?.location}
											</Typography>
										</Tooltip>
									</>
								</Stack>
							)}

							{/* <Button
								disabled={loading}
								color="inherit"
								onClick={() => handleDelete(asset.uuid as string)}
								sx={{ my: '2px', width: '130px' }}
							>
								{loading ? (
									<CircularProgress
										size={24}
										sx={{ color: 'white' }}
									/>
								) : (
									<>
										<SvgIcon>
											<Trash02Icon />
										</SvgIcon>
										<Typography>
											{t(tokens.upcoming_event.add_event.form.delete_btn.text)}
										</Typography>
									</>
								)}
							</Button> */}

							<Box
								sx={{
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									pt: 2,
								}}
							>
								{/* <Button
									disabled={loading}
									color="inherit"
									onClick={() => handleDelete(asset.uuid as string)}
									sx={{ my: '2px', width: '160px' }}
									startIcon={
										<SvgIcon>
											<Trash02Icon />
										</SvgIcon>
									}
								>
									Delete Asset
								</Button> */}

								{/* <DeleteButton
									onClick={() => handleDelete(asset.uuid as string)}
									label={t(tokens.policy.button.delete)}
									disabled={loading}
									sx={{ my: '2px', width: '160px' }}
								/> */}
								<DeleteBtn
									onClick={() => handleDelete(asset.uuid as string)}
									label={t(tokens.policy.button.delete)}
								/>
							</Box>

							{/* <Button
								onClick={() => handleDelete(asset.uuid as string)}
								variant="contained"
								color="error"
								disabled={loading}
								sx={{ my: '2px', width: '130px' }}
							>
								{loading ? (
									<CircularProgress
										size={24}
										sx={{ color: 'white' }}
									/>
								) : (
									'Delete Asset'
								)}
							</Button> */}
						</Stack>
					</Box>
				</Stack>
			</Card>
		</Grid>
	)
}

export default HistoryDetail
