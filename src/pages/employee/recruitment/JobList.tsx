import { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
} from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'

// Internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

// local imports
import { Seo } from '@components/seo'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	jobListAction,
	recruitmentSelector,
	recruitmentStatusSelector,
} from '@redux/features/recruitmentSlice'
import { JobStatusSection, JobListSection } from '@sections/organization/recruitment/dashboard'
import { createTheme } from '@mui/system'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import { useDebounce } from '@uidotdev/usehooks'
import { PageLoading } from '@loading/recruitment'

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

const Dashboard = () => {
	const [search, setSearch] = useState<string>('')

	const { t } = useTranslation()
	const { dashboard } = tokens.recruitment

	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { jobPaginateData } = useAppSelector(recruitmentSelector)
	const jobStatus = useAppSelector(recruitmentStatusSelector)

	const debouncedSearch = useDebounce(search, 500)

	const onFiltersChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value.toLowerCase())
	}
	const breadcrumbsLinks: BreadcrumbLink[] = [
		{ label: tokens.nav.dashboard, url: '/' }, // Set color for this link
		{ label: tokens.nav.recruitment, color: 'black' }, // Concatenate first_name and last_name
	]

	useEffect(() => {
		dispatch(jobListAction({ paginationData: jobPaginateData, search: debouncedSearch }))
		return () => {}
	}, [debouncedSearch])

	return (
		<>
			<Seo title={t(tokens.seo_titles.recruitment.list_job)} />

			{jobStatus === 'LOADING' ? (
				<PageLoading />
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
										{t(dashboard.main_heading)}
									</Typography>
								</Box>
							</Box>
							<JobStatusSection />

							<Card>
								<div>
									<Stack
										alignItems="center"
										component="form"
										direction="row"
										spacing={2}
										sx={{ p: 2 }}
									>
										<SvgIcon>
											<SearchMdIcon />
										</SvgIcon>
										<Input
											value={search}
											disableUnderline
											fullWidth
											placeholder={t(dashboard.search)}
											sx={{ flexGrow: 1 }}
											onChange={onFiltersChange}
										/>
									</Stack>
									<Divider />
								</div>
								<JobListSection />
							</Card>
						</Stack>
					</Container>
				</Box>
			)}
		</>
	)
}

export default Dashboard
