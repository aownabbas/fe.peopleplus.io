import { CardSkeleton, PageHeaderSkeleton, TableSkeleton } from '@components/Skeletons'

// mui imports
import {
	Box,
	Breadcrumbs,
	Button,
	Card,
	Container,
	Divider,
	Input,
	Stack,
	SvgIcon,
	Typography,
	Skeleton,
	Grid,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

const Page = () => {
	const { t } = useTranslation()
	const { dashboard } = tokens.recruitment

	return (
		<>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						<PageHeaderSkeleton />

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Box sx={{ width: '100%' }}>
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
									<Skeleton
										variant="text"
										sx={{ width: '40%', height: '100%' }}
									/>
								</Typography>
							</Box>
						</Box>
						<Box>
							<Grid container>
								<Grid
									xs={12}
									md={6}
									lg={3}
									xl={3}
									sx={{ px: 1 }}
								>
									<CardSkeleton
										titleLines={1}
										contentLines={1}
									/>
								</Grid>
								<Grid
									xs={12}
									md={6}
									lg={3}
									xl={3}
									sx={{ px: 1 }}
								>
									<CardSkeleton
										titleLines={1}
										contentLines={1}
									/>
								</Grid>
								<Grid
									xs={12}
									md={6}
									lg={3}
									xl={3}
									sx={{ px: 1 }}
								>
									<CardSkeleton
										titleLines={1}
										contentLines={1}
									/>
								</Grid>
								<Grid
									xs={12}
									md={6}
									lg={3}
									xl={3}
									sx={{ px: 1 }}
								>
									<CardSkeleton
										titleLines={1}
										contentLines={1}
									/>
								</Grid>
							</Grid>
						</Box>

						<Card>
							<div>
								<Stack
									alignItems="center"
									direction="row"
									spacing={2}
									sx={{ p: 2 }}
								>
									<Skeleton variant="circular">
										<SvgIcon>
											<SearchMdIcon />
										</SvgIcon>
									</Skeleton>
									<Skeleton
										variant="rectangular"
										width="100%"
										sx={{ flexGrow: 1 }}
									>
										<Input
											disableUnderline
											fullWidth
											placeholder="Loading..."
										/>
									</Skeleton>
								</Stack>
								<Divider />
							</div>
							<Table sx={{ minWidth: 1200 }}>
								<TableHead>
									<TableRow>
										<TableCell />
										<TableCell width="15%">{t(dashboard.job_list_heading.name)}</TableCell>
										<TableCell width="20%">{t(dashboard.job_list_heading.pipeline)}</TableCell>
										<TableCell width="20%">{t(dashboard.job_list_heading.posted)}</TableCell>
										<TableCell>{t(dashboard.job_list_heading.hiring)}</TableCell>
										<TableCell>{t(dashboard.job_list_heading.status)}</TableCell>
										<TableCell align="right">{t(dashboard.job_list_heading.actions)}</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									<TableSkeleton
										columns={7}
										rows={10}
										avatarColumn={4}
									/>
								</TableBody>
							</Table>
						</Card>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default Page
