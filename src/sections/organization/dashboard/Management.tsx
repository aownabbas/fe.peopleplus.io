// mui imports
import { Button, Card, Box, Container, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { createTheme } from '@mui/system'

// local imports
import { EmployeeManagementTable } from './EmployeeManagementTable'
import ActivePipeline from './ActivePipeline'
import SectionWithHeader from '@components/SectionWithHeader'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
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
const Management = () => {
	const { t } = useTranslation()
	return (
		<Grid
			xs={12}
			md={8}
		>
			<Stack spacing={3}>
				<SectionWithHeader
					heading={t(tokens.org_dashboard.management.employee_management.header.heading)}
					subHeading={t(tokens.org_dashboard.management.employee_management.header.sub_heading)}
					link={{
						text: t(tokens.org_dashboard.management.employee_management.header.link),
						path: `/${urlPreFix.employee}`,
					}}
				>
					<EmployeeManagementTable />
				</SectionWithHeader>

				<SectionWithHeader
					heading={t(tokens.org_dashboard.management.active_pipeline.header.heading)}
					subHeading={t(tokens.org_dashboard.management.active_pipeline.header.sub_heading)}
					link={{
						text: t(tokens.org_dashboard.management.active_pipeline.header.link),
						path: '/recruitment',
					}}
				>
					<ActivePipeline />
				</SectionWithHeader>
			</Stack>
		</Grid>
	)
}

export default Management
