import { Link } from 'react-router-dom'
// mui imports
import { Box, Breadcrumbs, Container, Stack, Typography } from '@mui/material'

import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { Seo } from '@components/seo'
import { Create } from '@sections/organization/employees/Create'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { createTheme } from '@mui/system'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { urlPreFix } from '@config/index'
const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const breadcrumbsLinks: BreadcrumbLink[] = [
	{ label: tokens.employee.listing.breadcrumbs.dashboard, url: '/' },
	{ label: tokens.employee.listing.breadcrumbs.employee, url: `/${urlPreFix.employee}` },
	{ label: tokens.employee.listing.button.add_employee },
]

const CreateEmployee = () => {
	const { t } = useTranslation()

	return (
		<>
			<Seo title={t(tokens.seo_titles.employees.create_emp)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<CustomBreadcrumbs links={breadcrumbsLinks} />

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
							{t(tokens.employee.create_employee.header.heading)}
						</Typography>

						<Create />
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default CreateEmployee
