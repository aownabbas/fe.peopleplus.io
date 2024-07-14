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
	Tooltip,
} from '@mui/material'
import Edit from '@untitled-ui/icons-react/build/esm/Edit03'

// local imports
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { Seo } from '@components/seo'
import { SeverityPill } from '@components/severity-pill'
import BackdropLoader from '@components/BackdropLoader'
import { FeedbackDetailSection, HistoryDetailSection } from '@sections/organization/assets/detail'
import { assetsSelector, getAssetAction } from '@redux/features/assetsSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import { createTheme } from '@mui/system'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { AssetDetailLoading } from '@loading/assets'

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
const Detail = () => {
	const { uuid } = useParams()
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
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

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.asset.breadcrumbs.dashboard, url: '/' },
		{ label: tokens.asset.detail_page.breadcrumbs.parent, url: '/assets' },
		{ label: asset.name, color: 'black' },
	]

	return (
		<>
			<Seo title={t(tokens.seo_titles.assets.detail_asset)} />

			{isPageLoading ? (
				// <BackdropLoader />
				<AssetDetailLoading />
			) : (
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

								<Box>
									<Button
										sx={{ background: theme.palette.background.default, color: 'white' }}
										onClick={() => navigate(`/assets/edit/${asset.uuid}`)}
										startIcon={
											<SvgIcon>
												<Edit />
											</SvgIcon>
										}
									>
										<Typography
											sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500, fontSize: 14 }}
										>
											{t(tokens.asset.button.edit)}
										</Typography>
									</Button>
								</Box>
							</Box>

							<Grid container>
								<FeedbackDetailSection />
								<HistoryDetailSection />
							</Grid>
						</Stack>
					</Container>
				</Box>
			)}
		</>
	)
}

export default Detail
