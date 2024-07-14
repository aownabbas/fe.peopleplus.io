import React, { useEffect, useState } from 'react'
import { Seo } from '@components/seo'
import { Box, Container, Stack, Typography, Card } from '@mui/material'
import TeamChart from '@sections/OrganizationChart/TeamChart'
import TeamListTable from '@sections/OrganizationChart/TeamListTable'
import SearchEmployee from '@sections/OrganizationChart/SearchEmployee'
import { useAppDispatch } from '@redux/hooks'
import { getOrganizationalChartAction, orgChartSelector } from '@redux/features/organizationalChart'
import BackdropLoader from '@components/BackdropLoader'
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { createTheme } from '@mui/system'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { unLinkedEmployeeListRequest } from '@service/employee'
import { employeeListAction } from '@redux/features/employeeSlice'

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
	{ label: tokens.organizational_chart.breadcrumbs.parent, url: '/' },
	{ label: tokens.organizational_chart.breadcrumbs.child, color: 'black' },
]

interface PaginationState {
	page: number
	per_page: number
}

function OrganizationChart() {
	const { t } = useTranslation()
	const [searchLoading, setSearchLoading] = useState(false)
	const [unlinkedEmployees, setUnlinkedEmployees] = useState([])
	const [pagination, setPagination] = useState<PaginationState>({
		page: 0,
		per_page: 10,
	})

	const dispatch = useAppDispatch()

	const handlePageChange = (paginationRecord: any) => {
		setPagination(paginationRecord)
	}

	useEffect(() => {
		Promise.all([dispatch(getOrganizationalChartAction()), dispatch(employeeListAction())])
	}, [])

	return (
		<>
			<Seo title={t(tokens.seo_titles.organization_chart)} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<CustomBreadcrumbs links={breadcrumbsLinks} />
						<Box>
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
								{t(tokens.organizational_chart.heading)}
							</Typography>
						</Box>

						<SearchEmployee />
						<TeamChart />
						<TeamListTable
							onPageChangeProp={handlePageChange}
							loading={searchLoading}
						/>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default OrganizationChart
