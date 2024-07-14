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

import { useAppSelector } from '@redux/hooks.ts'
import { settingsSelector } from '@redux/features/settingsSlice.ts'
import { DropdownOption } from 'type/config.ts'
import { useDebounce } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { createTheme } from '@mui/system'
import { employeeSelector } from '@redux/features/employeeSlice'

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
	department_id?: string
	hasAcceptedMarketing?: boolean
	isProspect?: boolean
	isReturning?: boolean
	isLoading?: boolean
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
}

export const Department: FC<EmployeeListSearchProps> = (props) => {
	const [searchValue, setSearchValue] = useState('')
	const debouncedSearchValue = useDebounce(searchValue, 100)

	const { departments } = useAppSelector(employeeSelector)
	const { t } = useTranslation()

	const [departmentOptions, setDocumentOptions] = useState<DropdownOption[]>([])

	const { onFiltersChange, sortBy, sortDir } = props
	const queryRef = useRef<HTMLInputElement | null>(null)
	const [currentTab, setCurrentTab] = useState('all')
	const [filters, setFilters] = useState<Filters>({})
	const [isLoading, setIsLoading] = useState(false)

	const handleFiltersUpdate = useCallback(() => {
		onFiltersChange?.(filters)
	}, [filters, onFiltersChange])

	useEffect(() => {
		handleFiltersUpdate()
	}, [filters, handleFiltersUpdate])

	useEffect(() => {
		const updatedOptions: DropdownOption[] = departments.map((document: any) => ({
			label: document.name,
			value: document.id,
		}))

		updatedOptions.unshift({
			label: 'All',
			value: 'all',
		})

		setDocumentOptions(updatedOptions)
	}, [departments])

	const handleTabsChange = useCallback((event: ChangeEvent<any>, value: string): void => {
		event.preventDefault()
		setCurrentTab(value)
		setFilters((prevState) => {
			const updatedFilters: Filters = {
				...prevState,
				hasAcceptedMarketing: undefined,
				isProspect: undefined,
				isReturning: undefined,
				department_id: value !== 'all' ? value : undefined,
				isLoading: true,
			}
			return updatedFilters
		})
	}, [])

	useEffect(() => {
		handleQueryChange(debouncedSearchValue)
	}, [debouncedSearchValue])

	const handleQueryChange = (value: string): void => {
		setFilters((prevState) => ({
			...prevState,
			name: value,
			isLoading: isLoading,
		}))
	}

	return (
		<>
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
				{departmentOptions?.map((tab, index) => (
					<Tab
						key={index}
						label={tab.label}
						value={tab.value}
					/>
				))}
			</Tabs>
			<Divider />

			<Stack
				alignItems="center"
				direction="row"
				flexWrap="wrap"
				spacing={3}
				sx={{ p: 3 }}
			>
				<Box
					component="form"
					sx={{ flexGrow: 1 }}
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
						e.preventDefault()
					}}
				>
					<TextField
						defaultValue=""
						fullWidth
						variant="outlined"
						placeholder={t(tokens.employee.listing.department.search_emp.place_holder)}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setSearchValue(e.target.value), setIsLoading(true)
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SvgIcon>
										<SearchMdIcon />
									</SvgIcon>
								</InputAdornment>
							),
						}}
					/>
				</Box>
			</Stack>
		</>
	)
}
