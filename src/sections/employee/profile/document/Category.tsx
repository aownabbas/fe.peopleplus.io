/* eslint-disable prettier/prettier */
import { FC, useState, useCallback, useRef, ChangeEvent, FormEvent, useEffect } from 'react'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'

import { useUpdateEffect } from '@hooks/use-upate-effect.ts'
import { DropdownOption } from 'type/config.ts'
import { documentCategoryListRequest } from '@service/employee'
import UploadDocument from '@components/UploadDocument'
import { useDebounce } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

import { createTheme } from '@mui/system'
import { DocumentsLoading } from '@loading/employees'
import { employeeSelector, getEmployeeProfileCategoriesAction } from '@redux/features/employeeSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'

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

interface Filters {
	name?: string
	category_uuid?: string
	hasAcceptedMarketing?: boolean
	isProspect?: boolean
	isReturning?: boolean
}

type SortValue = 'updatedAt|desc' | 'updatedAt|asc' | 'totalOrders|desc' | 'totalOrders|asc'

interface SortOption {
	label: string
	value: SortValue
}

const sortOptions: SortOption[] = [
	{
		label: 'Last update (newest)',
		value: 'updatedAt|desc',
	},
	{
		label: 'Last update (oldest)',
		value: 'updatedAt|asc',
	},
]

type SortDir = 'asc' | 'desc'

interface EmployeeListSearchProps {
	onFiltersChange?: (filters: Filters) => void
	onSortChange?: (sort: { sortBy: string; sortDir: SortDir }) => void
	sortBy?: string
	sortDir?: SortDir
	setDocument: any
}

const Category: FC<EmployeeListSearchProps> = (props) => {
	const { t } = useTranslation()
	const [category, setCategory] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const debouncedSearchValue = useDebounce(searchValue, 500)
	const dispatch = useAppDispatch()
	const { document_categories, documentCategoryLoading } = useAppSelector(employeeSelector)

	useEffect(() => {
		handleQueryChange(debouncedSearchValue)
	}, [debouncedSearchValue])

	useEffect(() => {
		dispatch(getEmployeeProfileCategoriesAction())
	}, [])

	// useEffect(() => {
	// 	// Define a function to fetch data using the API
	// 	const fetchData = async () => {
	// 		try {
	// 			const { data } = await documentCategoryListRequest()
	// 			const { document_categories } = data
	// 			setCategory(document_categories)
	// 		} catch (error) {
	// 			console.error('Error fetching data:', error)
	// 		}

	// 		// Update the state with the fetched data
	// 	}

	// 	// Call the fetchData function
	// 	fetchData()
	// }, [])

	const [categoryOptions, setCategoryOptions] = useState<DropdownOption[]>([])

	const { onFiltersChange, onSortChange, sortBy, sortDir } = props
	const queryRef = useRef<HTMLInputElement | null>(null)
	const [currentTab, setCurrentTab] = useState('all')
	const [filters, setFilters] = useState<Filters>({})

	const handleFiltersUpdate = useCallback(() => {
		onFiltersChange?.(filters)
	}, [filters, onFiltersChange])

	useUpdateEffect(() => {
		handleFiltersUpdate()
	}, [filters, handleFiltersUpdate])

	useUpdateEffect(() => {
		const updatedOptions: DropdownOption[] = document_categories.map((document: any) => ({
			label: document.name,
			value: document.uuid,
		}))

		const categoryOptionsWithAll = [...updatedOptions]
		categoryOptionsWithAll.unshift({
			label: 'All',
			value: 'all',
		})

		setCategoryOptions(categoryOptionsWithAll)
	}, [document_categories])

	const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
		event.preventDefault()
		setCurrentTab(value)
		setFilters((prevState) => {
			const updatedFilters: Filters = {
				...prevState,
				hasAcceptedMarketing: undefined,
				isProspect: undefined,
				isReturning: undefined,
				category_uuid: value !== 'all' ? value : undefined,
			}
			return updatedFilters
		})
	}, [])

	const handleQueryChange = (value: string): void => {
		setFilters((prevState) => ({
			...prevState,
			name: queryRef.current?.value,
		}))
	}

	const handleSortChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>): void => {
			const [sortBy, sortDir] = event.target.value.split('|') as [string, SortDir]

			onSortChange?.({
				sortBy,
				sortDir,
			})
		},
		[onSortChange],
	)

	const categoryOptionsWithoutAll = categoryOptions.filter((option) => option.value !== 'all')

	return (
		<>
			{documentCategoryLoading && document_categories.length == 0 ? (
				<DocumentsLoading />
			) : (
				<Tabs
					indicatorColor="primary"
					onChange={handleTabsChange}
					scrollButtons="auto"
					textColor="primary"
					value={currentTab}
					variant="scrollable"
					sx={{
						px: 3,
						'& .MuiTabs-indicator': {
							background: theme.palette.background.default,
						},
						'& .MuiTab-root': {
							color: '#6C737F',
							'&.Mui-selected': {
								background: theme.palette.background.default,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								MozBackgroundClip: 'text',
								MozTextFillColor: 'transparent',
							},
						},
					}}
				>
					{categoryOptions?.map((tab, index) => (
						<Tab
							key={index}
							label={tab.label}
							value={tab.value}
						/>
					))}
				</Tabs>
			)}
			<Divider />
			<Stack
				alignItems="center"
				direction="row"
				spacing={2}
				sx={{ p: 3, pr: 0 }}
			>
				<Box
					component="form"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
					sx={{ flexGrow: 1 }}
				>
					<OutlinedInput
						defaultValue=""
						fullWidth
						inputProps={{ ref: queryRef }}
						placeholder={t(tokens.employee.document.search_input.place_holder)}
						startAdornment={
							<InputAdornment position="start">
								<SvgIcon>
									<SearchMdIcon />
								</SvgIcon>
							</InputAdornment>
						}
					/>
				</Box>
				<UploadDocument
					listUpdate={props.setDocument}
					category={categoryOptionsWithoutAll}
				/>
			</Stack>
		</>
	)
}
export default Category
