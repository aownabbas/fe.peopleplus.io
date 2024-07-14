import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

// mui imports
import {
	Box,
	Breadcrumbs,
	Container,
	Stack,
	Typography,
	Button,
	SvgIcon,
	Grid,
	IconButton,
	Tooltip,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

// local imports
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { Seo } from '@components/seo'
import { SeverityPill } from '@components/severity-pill'
import BackdropLoader from '@components/BackdropLoader'

import {
	FeedbackDetailSection,
	HistoryDetailSection,
} from '@sections/employee/profile/asset/detail'
import { assetsSelector, getAssetAction } from '@redux/features/assetsSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import Back from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { createTheme } from '@mui/system'

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

const AssetDetail = () => {
	const { t } = useTranslation()
	const { uuid } = useParams()
	const dispatch = useAppDispatch()

	const { asset, status } = useAppSelector(assetsSelector)
	const [isPageLoading, setPageLoading] = useState(true)

	const navigate = useNavigate()

	useEffect(() => {
		if (uuid) {
			dispatch(getAssetAction(uuid)).then(() => {
				setPageLoading(false)
			})
		}
	}, [uuid])

	return (
		<>
			<Seo title={t(tokens.seo_titles.assets.detail_asset)} />

			{isPageLoading ? (
				<BackdropLoader />
			) : (
				<>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 2,
						}}
					>
						<Box>
							<IconButton
								sx={{
									background: 'white',
									height: '45px',
									width: '45px',
									border: '1px solid #D1D5DE',
									borderRadius: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
								onClick={() => navigate(`/profile/assets`)}
							>
								<Back
									style={{
										width: '20px',
									}}
								/>
							</IconButton>
						</Box>
						<Stack spacing={1}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									gap: 2,
								}}
							>
								<Tooltip title={asset.name}>
									<Typography
										sx={{
											fontSize: { xs: '14px', sm: '24px' },
											fontWeight: 700,
											color: '#111927',
											maxWidth: '140px',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											'@media (min-width: 600px)': {
												maxWidth: '300px',
											},
										}}
									>
										{asset.name}
									</Typography>
								</Tooltip>
								<SeverityPill
									color={asset.status === 'active' ? 'success' : 'error'}
									sx={{
										fontSize: 12,
										fontWeight: 600,
									}}
								>
									{asset.status}
								</SeverityPill>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									gap: 1,
								}}
							>
								<Typography
									sx={{
										fontWeight: 600,
										fontSize: 14,
									}}
								>
									{t(tokens.asset.detail_page.asset_id)}:
								</Typography>
								<SeverityPill
									color="info"
									sx={{
										fontSize: 12,
										fontWeight: 600,
									}}
								>
									{asset.tag_id}
								</SeverityPill>
							</Box>
						</Stack>
					</Box>

					<Grid container>
						<FeedbackDetailSection />
						<HistoryDetailSection />
					</Grid>
				</>
			)}
		</>
	)
}

export default AssetDetail
