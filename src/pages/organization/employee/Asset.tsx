import type { ChangeEvent, MouseEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import { useMounted } from '@hooks/use-mounted'
import { useTranslation } from 'react-i18next'
import { SearchSlot } from '@sections/organization/assets/SearchSlot'
import { AssetListing } from '@sections/organization/assets/Listing'
import { Link, useParams } from 'react-router-dom'
import { createTheme } from '@mui/system'
import { assetListRequest } from '@service/asset'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { assetListAction } from '@redux/features/settingsSlice'
import { Seo } from '@components/seo'
import { TableSkeleton } from '@components/Skeletons'
import {
	assetsSelector,
	filterAsset,
	getAssetCategoryListAction,
	getAssetListAction,
	resetEmployeeAssets,
} from '@redux/features/assetsSlice'
import { Asset } from 'type/asset'
import { tokens } from '@locales/tokens'

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
	category: string[]
	status: string[]
	//   inStock?: boolean;
}

interface ProductsSearchState {
	filters: Filters
	page: number
	rowsPerPage: number
}

const Asset = () => {
	const { employeeAssets }: { employeeAssets: Asset[] } = useAppSelector(assetsSelector)
	const [isPageLoading, setPageLoading] = useState(true)
	const [isSearchLoading, setSearchLoading] = useState(false)
	const { uuid } = useParams()

	const dispatch = useAppDispatch()
	console.log(employeeAssets, '111111')
	useEffect(() => {
		dispatch(resetEmployeeAssets(uuid))
		Promise.all([
			dispatch(getAssetListAction({ emp_id: uuid })),
			dispatch(getAssetCategoryListAction({ uuid })),
		])
	}, [])

	const { t } = useTranslation()

	const useProductsSearch = () => {
		const [state, setState] = useState<ProductsSearchState>({
			filters: {
				name: undefined,
				category: [],
				status: [],
				//   inStock: undefined,
			},
			page: 0,
			rowsPerPage: 5,
		})
		const handleFiltersChange = useCallback((filters: Filters): void => {
			setState((prevState) => ({
				...prevState,
				filters,
			}))
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
		setSearchLoading(true)
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

		const handleProductsGet = useCallback(async () => {
			try {
				const filters = mapSearchStateToAssetParams(searchState, uuid as string)
				dispatch(filterAsset({ filters, type: 'employee' }))
				setSearchLoading(false)
				setPageLoading(false)
			} catch (err) {
				console.error(err)
			}
		}, [searchState, isMounted])

		useEffect(() => {
			handleProductsGet()
		}, [searchState])

		return {
			...state,
		}
	}

	const productsSearch = useProductsSearch()
	const productsStore = useProductsStore(productsSearch.state)

	return (
		<>
			<Seo title={t(tokens.seo_titles.employees.assets)} />
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
					page={productsSearch.state.page}
					items={employeeAssets}
					count={productsStore.productsCount}
					rowsPerPage={productsSearch.state.rowsPerPage}
				/>
			</Card>
		</>
	)
}

export default Asset
