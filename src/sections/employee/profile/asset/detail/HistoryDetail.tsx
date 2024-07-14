// import type { FC } from 'react'

// // mui imports
// import {
// 	Grid,
// 	Avatar,
// 	Box,
// 	Card,
// 	CardContent,
// 	CardHeader,
// 	Container,
// 	Stack,
// 	List,
// 	ListItem,
// 	ListItemAvatar,
// 	ListItemText,
// 	Typography,
// } from '@mui/material'

// import { assetsSelector } from '@redux/features/assetsSlice'
// import { useAppSelector } from '@redux/hooks'
// import { formatTime } from '@utils/times'
// import { useTranslation } from 'react-i18next'
// import { tokens } from '@locales/tokens'
// import { Scrollbar } from '@components/scrollbar'

// const HistoryDetail: FC = () => {
// 	const { t } = useTranslation()
// 	const { asset, status } = useAppSelector(assetsSelector)

// 	const { assign_history } = asset

import type { FC } from 'react'
import { useState } from 'react'
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
} from '@mui/material'

import { assetsSelector } from '@redux/features/assetsSlice'
import { useAppSelector } from '@redux/hooks'
import { formatTime } from '@utils/times'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { createTheme } from '@mui/system'
import { Scrollbar } from '@components/scrollbar'

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
	const [loading, setLoading] = useState(false) // State to manage loading state
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
					mb: 2,
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
						<Stack
							spacing={1}
							sx={{
								pb: 3,
							}}
						>
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
									{/* <Typography
										sx={{ color: '#6C737F', fontWeight: 400, lineHeight: '22px', fontSize: 14 }}
									>
										{asset.purchase_price}{' '}
										{asset.purchase_currency ? asset.purchase_currency.toUpperCase() : ''}
									</Typography> */}
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
						</Stack>
					</Box>
				</Stack>
			</Card>
		</Grid>
	)
}

export default HistoryDetail
