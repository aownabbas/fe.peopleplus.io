import { Link } from 'react-router-dom'

// mui imports
import { Box, Breadcrumbs, Card, Container, Stack, Typography } from '@mui/material'

// local imports
import { Seo } from '@components/seo'
import EmptyState from '@sections/organization/recruitment/emptyState'
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'

const EmptyRecord = () => {
	return (
		<>
			<Seo title="Dashboard: Product List" />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={4}>
						<Stack spacing={4}>
							<Breadcrumbs separator={<BreadcrumbsSeparator />}>
								<Typography
									color="text.primary"
									variant="subtitle2"
								>
									<Link to={'/'}>Dashboard</Link>
								</Typography>
								<Typography
									color="text.primary"
									variant="subtitle2"
								>
									<Link to={'/recruitment'}>Recruitment</Link>
								</Typography>
								<Typography
									sx={{}}
									color="text.secondary"
									variant="subtitle2"
								>
									Dashboard
								</Typography>
							</Breadcrumbs>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<Box>
									<Typography variant="h4">Recruitment Directory</Typography>
								</Box>
							</Box>
						</Stack>
						<Card>
							<EmptyState />
						</Card>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default EmptyRecord
