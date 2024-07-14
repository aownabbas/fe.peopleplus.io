/* eslint-disable prettier/prettier */
// Import necessary components and hooks
import { useState, useCallback, ChangeEvent, MouseEvent, useEffect, useMemo } from 'react'

// mui imports
import { createTheme } from '@mui/system'
import { Box, Card, Container, Stack } from '@mui/material'

// local imports
import { DocumentCategory, DocumentListing } from '@sections/employee/profile/document'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getEmployeeDocumentAction, employeeSelector } from '@redux/features/employeeSlice'
import { Seo } from '@components/seo'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

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

// Define Filters and State types
interface Filters {
	name?: string
	category_uuid?: string
	hasAcceptedMarketing?: boolean
	isProspect?: boolean
	isReturning?: boolean
}

interface EmployeesSearchState {
	filters: Filters
	page: number
	per_page: number
	sortBy: string
	sortDir: 'asc' | 'desc'
}

// Custom hook for handling employee search
const useDocumentSearch = () => {
	const [state, setState] = useState<EmployeesSearchState>({
		filters: {
			name: '',
			category_uuid: '',
			hasAcceptedMarketing: undefined,
			isProspect: undefined,
			isReturning: undefined,
		},
		page: 0,
		per_page: 10,
		sortBy: 'updatedAt',
		sortDir: 'desc',
	})

	const handleFiltersChange = useCallback((filters: Filters): void => {
		console.log(filters)
		setState((prevState) => ({
			...prevState,
			filters,
		}))
	}, [])

	const handleSortChange = useCallback(
		(sort: { sortBy: string; sortDir: 'asc' | 'desc' }): void => {
			setState((prevState) => ({
				...prevState,
				sortBy: sort.sortBy,
				sortDir: sort.sortDir,
			}))
		},
		[],
	)

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
			per_page: parseInt(event.target.value, 10),
		}))
	}, [])

	return {
		handleFiltersChange,
		handleSortChange,
		handlePageChange,
		handleRowsPerPageChange,
		state,
	}
}

type docsType = { data: any[]; total: number }

// Main Page Component
const Document = () => {
	const [isSearchLoading, setSearchLoading] = useState(false)

	const { documents: empDocument } = useAppSelector(employeeSelector)
	const [documents, setDocument] = useState<docsType>({ data: [], total: 0 })
	const dispatch = useAppDispatch()

	useEffect(() => {
		setDocument(empDocument as unknown as docsType)
		return () => {}
	}, [empDocument])

	const documentSearch = useDocumentSearch()

	const mapSearchStateToDocumentParams = useMemo(() => {
		setSearchLoading(true)
		return () => {
			const { name, category_uuid } = documentSearch.state.filters
			const { page, per_page, sortDir } = documentSearch.state

			return {
				category_uuid,
				page,
				search: name,
				per_page,
				orderBy: sortDir,
				isPagination: true,
			}
		}
	}, [documentSearch.state])

	const handleDocumentGet = useCallback(async () => {
		try {
			dispatch(getEmployeeDocumentAction(mapSearchStateToDocumentParams()))
				.then(() => {
					setSearchLoading(false)
				})
				.catch((error) => {
					console.log(error)
				})
		} catch (err) {
			console.error(err)
		}
	}, [mapSearchStateToDocumentParams])

	useEffect(() => {
		handleDocumentGet()
	}, [handleDocumentGet])

	return (
		<>
			<Seo title={t(tokens.seo_titles.employees.document)} />

			<Card
				sx={{
					boxShadow: 'none !important',
					border: '1px solid #E5E7EB',
				}}
			>
				{/* Department Component */}
				<DocumentCategory
					onFiltersChange={documentSearch.handleFiltersChange}
					onSortChange={documentSearch.handleSortChange}
					sortBy={documentSearch.state.sortBy}
					sortDir={documentSearch.state.sortDir}
					setDocument={setDocument}
				/>
				{/* Listing table Component */}
				<DocumentListing
					isSearchLoading={isSearchLoading}
					count={documents.total}
					items={documents.data}
					onPageChange={documentSearch.handlePageChange}
					onRowsPerPageChange={documentSearch.handleRowsPerPageChange}
					page={documentSearch.state.page}
					rowsPerPage={documentSearch.state.per_page}
				/>
			</Card>
		</>
	)
}

export default Document
