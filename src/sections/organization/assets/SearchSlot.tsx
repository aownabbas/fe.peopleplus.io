import type { FC } from 'react'
import { FormEvent, useCallback, useMemo, useRef, useState, useEffect } from 'react'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import {
	Box,
	TextField,
	InputAdornment,
	Chip,
	Divider,
	Stack,
	SvgIcon,
	Typography,
	Input,
} from '@mui/material'

import { MultiSelect } from '@components/multi-select'
import { useUpdateEffect } from '@hooks/use-upate-effect'
import { assetListAction, settingsSelector } from '@redux/features/settingsSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { useDebounce } from '@uidotdev/usehooks'
import { useParams } from 'react-router-dom'
import { assetsSelector } from '@redux/features/assetsSlice'

interface Filters {
	name?: string
	category: string[]
	status: string[]
	inStock?: boolean
	isLoading?: boolean
}

interface SearchChip {
	label: string
	field: 'name' | 'category' | 'status' | 'inStock' | 'isLoading'
	value: unknown
	displayValue?: unknown
}

interface Option {
	label: string
	value: string
}

interface ProductListSearchProps {
	onFiltersChange?: (filters: Filters) => void
}

export const SearchSlot: FC<ProductListSearchProps> = (props) => {
	const { uuid } = useParams()
	const [isLoading, setIsLoading] = useState(false)

	const searchLabel = uuid
		? tokens.asset.search_slot.filter.asset_name
		: tokens.asset.search_slot.filter.placeholder

	const { t } = useTranslation()

	const statusOptions: Option[] = [
		{
			label: t(tokens.asset.status.active),
			value: 'active',
		},
		{
			label: t(tokens.asset.status.deactivate),
			value: 'deactive',
		},
	]

	const [categoryOptions, setCategoryOptions] = useState<Option[]>([])
	const { category } = useAppSelector(assetsSelector)

	const [searchValue, setSearchValue] = useState('')
	const debouncedSearchValue = useDebounce(searchValue, 500)

	useEffect(() => {
		handleQueryChange(debouncedSearchValue)
	}, [debouncedSearchValue])

	useEffect(() => {
		if (category) {
			const updatedOptions: Option[] = category.map((category: any) => ({
				label: category.name,
				value: category.name,
			}))
			setCategoryOptions(updatedOptions)
		}
	}, [category])

	const { onFiltersChange, ...other } = props
	const queryRef = useRef<HTMLInputElement | null>(null)
	const [chips, setChips] = useState<SearchChip[]>([])

	const handleChipsUpdate = useCallback(() => {
		const filters: Filters = {
			name: undefined,
			category: [],
			status: [],
			inStock: undefined,
			isLoading: isLoading,
		}

		chips.forEach((chip) => {
			switch (chip.field) {
				case 'name':
					filters.name = chip.value as string
					break
				case 'category':
					filters.category.push(chip.value as string)
					break
				case 'status':
					filters.status.push(chip.value as string)
					break
				case 'inStock':
					// The value can be "available" or "outOfStock" and we transform it to a boolean
					filters.inStock = chip.value === 'available'
					break
				default:
					break
			}
		})

		onFiltersChange?.(filters)
	}, [chips, onFiltersChange])

	useUpdateEffect(() => {
		handleChipsUpdate()
	}, [chips, handleChipsUpdate])

	const handleChipDelete = useCallback((deletedChip: SearchChip): void => {
		setChips((prevChips) => {
			return prevChips.filter((chip) => {
				return !(deletedChip.field === chip.field && deletedChip.value === chip.value)
			})
		})
	}, [])

	const handleQueryChange = useCallback((value: string): void => {
		setIsLoading(true)
		setChips((prevChips) => {
			const found = prevChips.find((chip) => chip.field === 'name')

			if (found && value) {
				return prevChips.map((chip) => {
					if (chip.field === 'name') {
						return {
							...chip,
							value,
						}
					}

					return chip
				})
			}

			if (found && !value) {
				return prevChips.filter((chip) => chip.field !== 'name')
			}

			if (!found && value) {
				const chip: SearchChip = {
					label: t(tokens.asset.search_slot.filter.name),
					field: 'name',
					value,
				}

				return [...prevChips, chip]
			}

			return prevChips
		})
	}, [])

	const handleCategoryChange = useCallback(
		(values: string[]): void => {
			setChips((prevChips) => {
				const valuesFound: string[] = []

				const newChips = prevChips.filter((chip) => {
					if (chip.field !== 'category') {
						return true
					}

					const found = values.includes(chip.value as string)

					if (found) {
						valuesFound.push(chip.value as string)
					}

					return found
				})

				// Nothing changed
				if (values.length === valuesFound.length) {
					return newChips
				}

				values.forEach((value) => {
					if (!valuesFound.includes(value)) {
						const option = categoryOptions.find((option) => option.value == value)

						newChips.push({
							label: t(tokens.asset.search_slot.filter.category),
							field: 'category',
							value,
							displayValue: option!.label,
						})
					}
				})

				return newChips
			})
		},
		[categoryOptions],
	)

	const handleStatusChange = useCallback((values: string[]): void => {
		setChips((prevChips) => {
			const valuesFound: string[] = []

			// First cleanup the previous chips
			const newChips = prevChips.filter((chip) => {
				if (chip.field !== 'status') {
					return true
				}

				const found = values.includes(chip.value as string)

				if (found) {
					valuesFound.push(chip.value as string)
				}

				return found
			})

			// Nothing changed
			if (values.length === valuesFound.length) {
				return newChips
			}

			values.forEach((value) => {
				if (!valuesFound.includes(value)) {
					const option = statusOptions.find((option) => option.value === value)

					newChips.push({
						label: 'Status',
						field: 'status',
						value,
						displayValue: option!.label,
					})
				}
			})

			return newChips
		})
	}, [])

	// const handleStockChange = useCallback((values: string[]): void => {
	//   // Stock can only have one value, even if displayed as multi-select, so we select the first one.
	//   // This example allows you to select one value or "All", which is not included in the
	//   // rest of multi-selects.

	//   setChips((prevChips) => {
	//     // First cleanup the previous chips
	//     const newChips = prevChips.filter((chip) => chip.field !== 'inStock');
	//     const latestValue = values[values.length - 1];

	//     switch (latestValue) {
	//       case 'available':
	//         newChips.push({
	//           label: 'Stock',
	//           field: 'inStock',
	//           value: 'available',
	//           displayValue: 'Available',
	//         });
	//         break;
	//       case 'outOfStock':
	//         newChips.push({
	//           label: 'Stock',
	//           field: 'inStock',
	//           value: 'outOfStock',
	//           displayValue: 'Out of Stock',
	//         });
	//         break;
	//       default:
	//         // Should be "all", so we do not add this filter
	//         break;
	//     }

	//     return newChips;
	//   });
	// }, []);

	// We memoize this part to prevent re-render issues
	const categoryValues = useMemo(
		() => chips.filter((chip) => chip.field === 'category').map((chip) => chip.value) as string[],
		[chips],
	)

	const statusValues = useMemo(
		() => chips.filter((chip) => chip.field === 'status').map((chip) => chip.value) as string[],
		[chips],
	)

	return (
		<div {...other}>
			<Stack
				alignItems="center"
				component="form"
				direction="row"
				onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
					e.preventDefault()
				}}
				spacing={2}
				sx={{ p: 2 }}
			>
				<SvgIcon>
					<SearchMdIcon />
				</SvgIcon>
				<Input
					defaultValue=""
					disableUnderline
					fullWidth
					inputProps={{ ref: queryRef }}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
					placeholder={t(searchLabel)}
					sx={{ flexGrow: 1 }}
				/>
			</Stack>
			<Divider />
			<Stack
				alignItems="center"
				direction="row"
				flexWrap="wrap"
				spacing={1}
				sx={{ p: 1 }}
			>
				{/* {categoryOptions.length === 0 ? null : ( */}
				<MultiSelect
					label={t(tokens.asset.search_slot.filter.category)}
					onChange={handleCategoryChange}
					options={categoryOptions}
					value={categoryValues}
				/>
				{/* )} */}
				<MultiSelect
					label={t(tokens.asset.search_slot.filter.status)}
					onChange={handleStatusChange}
					options={statusOptions}
					value={statusValues}
				/>
			</Stack>
		</div>
	)
}
