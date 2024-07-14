import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { tokens } from '@locales/tokens'
import { BreadcrumbsSeparator } from '@components/breadcrumb-seperator'
import { RouterLink } from '@components/router-link'
import { useMounted } from '@hooks/use-mounted'
import { useTranslation } from 'react-i18next'
import { SearchSlot } from '@sections/organization/assets/SearchSlot'
import { AssetListing } from '@sections/organization/assets/Listing'
import { Link, useParams } from 'react-router-dom'
import { createTheme } from '@mui/system'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { assetListAction } from '@redux/features/settingsSlice'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink } from 'type/config'
import {
	assetsSelector,
	filterAsset,
	getAssetListAction,
	getAssetCategoryListAction,
} from '@redux/features/assetsSlice'
import { Asset } from 'type/asset'
import { Seo } from '@components/seo'

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

interface Filters {
	name?: string
	isLoading?: boolean
	category: string[]
	status: string[]
	//   inStock?: boolean;
}

interface ProductsSearchState {
	filters: Filters
	page: number
	rowsPerPage: number
}

const breadcrumbsLinks: BreadcrumbLink[] = [
	{ label: tokens.asset.breadcrumbs.dashboard, url: '/' },
	{ label: tokens.employee.profile_layout.tabs.assets.label, color: 'black' },
]
const Page = () => {
	const { pagination } = useAppSelector(assetsSelector)
	const { list }: { list: Asset[] } = useAppSelector(assetsSelector)

	const [isSearchLoading, setSearchLoading] = useState(false)
	const dispatch = useAppDispatch()

	const { uuid } = useParams()
	const { t } = useTranslation()

	const useProductsSearch = () => {
		const [state, setState] = useState<ProductsSearchState>({
			filters: {
				name: undefined,
				isLoading: false,
				category: [],
				status: [],
			},
			page: 0,
			rowsPerPage: 10,
		})

		const handleFiltersChange = useCallback((filters: Filters): void => {
			if (filters.isLoading) {
				setSearchLoading(true)
			}
			setState((prevState) => {
				return {
					...prevState,
					filters: filters,
				}
			})
		}, [])

		const handlePageChange = useCallback(
			(event: MouseEvent<HTMLButtonElement> | null, page: number): void => {
				setState((prevState) => ({
					...prevState,
					page,
				}))
			},
			[],
		)

		const handleRowsPerPageChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
			setState((prevState) => ({
				...prevState,
				rowsPerPage: parseInt(event.target.value, 10),
				page: 0,
			}))
		}, [])

		return {
			handleFiltersChange,
			handlePageChange,
			handleRowsPerPageChange,
			state,
		}
	}

	interface ProductsStoreState {
		products: any
		productsCount: number
	}

	const mapSearchStateToAssetParams = (searchState: ProductsSearchState, employeeId: string) => {
		const { filters, page, rowsPerPage } = searchState
		const { name, category, status } = filters

		return {
			name,
			category,
			status,
			employee_id: employeeId,
			page,
			per_page: rowsPerPage,
		}
	}

	const useProductsStore = (searchState: ProductsSearchState) => {
		const isMounted = useMounted()
		const [state, setState] = useState<ProductsStoreState>({
			products: [],
			productsCount: 0,
		})
		useEffect(() => {
			Promise.all([dispatch(getAssetListAction({})), dispatch(getAssetCategoryListAction({}))])
		}, [])

		useEffect(() => {
			const filters = mapSearchStateToAssetParams(searchState, uuid as string)
			dispatch(filterAsset({ filters }))
		}, [searchState])

		return {
			...state,
		}
	}

	const productsSearch = useProductsSearch()
	const productsStore = useProductsStore(productsSearch.state)
	return (
		<>
			<Seo title={t(tokens.seo_titles.assets.list_asset)} />

			<Box
				component="main"
				sx={{
					flexGrow: 1,
				}}
			>
				<Container maxWidth="xl">
					<Stack spacing={3}>
						{!uuid && (
							<>
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
											{t(tokens.asset.header.heading)}
										</Typography>
									</Box>
									<Link to={'/assets/create'}>
										<Button
											sx={{
												background: theme.palette.background.default,
												color: 'white',
												gap: 1,
											}}
										>
											<SvgIcon
												sx={{
													margin: '0px',
													width: '20px',
												}}
											>
												<PlusIcon />
											</SvgIcon>
											<Typography
												sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500, fontSize: 14 }}
											>
												{t(tokens.asset.button.add_text)}
											</Typography>
										</Button>
									</Link>
								</Box>
							</>
						)}
						<Card
							sx={{
								boxShadow: 'none !important',
								border: '1px solid #EAECF0',
							}}
						>
							<SearchSlot onFiltersChange={productsSearch.handleFiltersChange} />
							<AssetListing
								isSearchLoading={isSearchLoading}
								onPageChange={productsSearch.handlePageChange}
								onRowsPerPageChange={productsSearch.handleRowsPerPageChange}
								page={pagination.page}
								items={list}
								count={pagination.total_records}
								rowsPerPage={pagination.per_page}
							/>
						</Card>
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default Page
