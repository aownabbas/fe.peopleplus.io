import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch } from '@redux/hooks'

// mui imports
import { Box, Breadcrumbs, Container, Stack, Typography } from '@mui/material'

// local imports
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { assetListAction } from '@redux/features/settingsSlice.ts'
import { fetchDepartment } from '@redux/features/departmentSlice'
import { employeeListAction } from '@redux/features/employeeSlice'
import { Seo } from '@components/seo'
import { AssetCreateForm } from '@sections/organization/assets/Create'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import { createTheme } from '@mui/system'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'

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

const Create = () => {
	const { uuid } = useParams()

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	//   usePageView();

	useEffect(() => {
		dispatch(assetListAction())
		dispatch(fetchDepartment())
		dispatch(employeeListAction())
	}, [])

	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.asset.breadcrumbs.dashboard, url: '/' },
		{ label: tokens.asset.create_page.breadcrumbs.parent, url: '/assets' },
		{
			label: uuid
				? tokens.asset.update_page.breadcrumbs.child
				: tokens.asset.create_page.breadcrumbs.child,
			color: 'black',
		},
	]

	return (
		<>
			<Seo title={t(tokens.seo_titles.assets.add_asset)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						{/* <Breadcrumbs separator={<BreadcrumbsSeparator />}>
							<Link
								to="/assets"
								color="text.primary"
							>
								{t(tokens.asset.create_page.breadcrumbs.parent)}
							</Link>
							<Typography
								color="text.secondary"
								variant="subtitle2"
							>
								{uuid
									? t(tokens.asset.update_page.breadcrumbs.child)
									: t(tokens.asset.create_page.breadcrumbs.child)}
							</Typography>
						</Breadcrumbs> */}

						<Breadcrumbs separator={<BreadcrumbsSeparator />}>
							<Typography>
								<Link
									to={'/'}
									style={{
										textDecoration: 'none',
										background: theme.palette.background.default,
										color: 'transparent',
										WebkitBackgroundClip: 'text',
										fontWeight: 500,
										fontSize: 14,
									}}
								>
									{t(tokens.asset.breadcrumbs.dashboard)}
								</Link>
							</Typography>
							<Typography>
								<Link
									to="/assets"
									style={{
										textDecoration: 'none',
										background: theme.palette.background.default,
										color: 'transparent',
										WebkitBackgroundClip: 'text',
										fontWeight: 500,
										fontSize: 14,
									}}
								>
									{t(tokens.asset.create_page.breadcrumbs.parent)}
								</Link>
							</Typography>
							<Typography
								sx={{
									textDecoration: 'none',
									color: '#6C737F',
									fontWeight: 500,
									fontSize: 14,
								}}
							>
								{uuid
									? t(tokens.asset.update_page.breadcrumbs.child)
									: t(tokens.asset.create_page.breadcrumbs.child)}
							</Typography>
						</Breadcrumbs>
						{uuid ? (
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
								{t(tokens.asset.update_page.heading)}
							</Typography>
						) : (
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
								{t(tokens.asset.create_page.heading)}
							</Typography>
						)}

						<AssetCreateForm />
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default Create
