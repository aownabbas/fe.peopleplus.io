import { useState, ChangeEvent, useEffect, useRef, FC } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import {
	Box,
	Dialog,
	DialogContent,
	TextField,
	IconButton,
	Tooltip,
	useMediaQuery,
	createTheme,
	SvgIcon,
	Typography,
	CircularProgress, // Import CircularProgress for loading indicator
} from '@mui/material'

import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import CloseIcon from '@untitled-ui/icons-react/build/esm/XClose'
import { Scrollbar } from '@components/scrollbar'
import PersonList from './components/PersonList'
import DetailPerson from './components/DetailPerson'
import { globalSearchAction, searchStSelector } from '@redux/features/appSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'
import NoRecordFound from '@components/NoRecordFound'
import { currentUserTypeSelector } from '@redux/features/authSlice'
import type { Person } from 'type/search'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import User01 from '@untitled-ui/icons-react/build/esm/User01'
import { urlPreFix } from '@config/index'

const theme = createTheme({
	// ... your theme setup
})

const SearchModal: FC = () => {
	const { t } = useTranslation()
	const [modalOpen, setModalOpen] = useState(false)
	const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
	const [searchValue, setSearchValue] = useState<string>('')
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
	const [isLoading, setIsLoading] = useState(false) // New isLoading state

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { candidates, employees } = useAppSelector(searchStSelector)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const authType = useAppSelector(currentUserTypeSelector)
	const debouncedSearch = useDebounce(searchValue, 500)

	const handleOpenModal = () => setModalOpen(true)
	const handleCloseModal = () => {
		setModalOpen(false)
		setSelectedPerson(null)
		setSearchValue('')
		setSelectedItemId(null)
	}
	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value)
		setSelectedItemId(null)
	}

	const viewProfile = (state: { url: string; state?: { uuid?: string } }) => {
		handleCloseModal()
		navigate(state.url, { state })
	}

	const isMdScreen = useMediaQuery(theme.breakpoints.up('md'))

	useEffect(() => {
		if (modalOpen && inputRef.current) {
			inputRef.current.focus()
		}
	}, [modalOpen])

	useEffect(() => {
		if (modalOpen) {
			setIsLoading(true)
			dispatch(globalSearchAction(debouncedSearch)).finally(() => {
				setIsLoading(false)
				setSelectedPerson(null)
			})
		}
	}, [debouncedSearch, modalOpen])

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (modalOpen && inputRef.current) {
				inputRef.current.focus()
			}
		}, 100) // Adjust the delay as needed

		return () => clearTimeout(timeout)
	}, [modalOpen])

	const noRecordsFound = !isLoading && candidates.length === 0 && employees.length === 0

	return (
		<Box>
			<Tooltip
				title={t(tokens.search_modal.tool_tip.text)}
				// sx={{ display: isMdScreen ? 'inline-block' : 'none' }}
			>
				<IconButton onClick={handleOpenModal}>
					<SvgIcon>
						<SearchMdIcon />
					</SvgIcon>
				</IconButton>
			</Tooltip>
			<Dialog
				open={modalOpen}
				onClose={handleCloseModal}
				maxWidth="md"
				fullWidth
			>
				<IconButton
					onClick={handleCloseModal}
					sx={{ position: 'absolute', right: 8, top: 8 }}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers>
					<TextField
						value={searchValue}
						inputRef={inputRef}
						sx={{ width: '90%' }}
						placeholder={t(tokens.search_modal.search_input.place_holder)}
						variant="outlined"
						onChange={handleSearchChange}
					/>
					{isLoading ? (
						<Box
							display="flex"
							justifyContent="center"
							alignItems="center"
							height={515}
						>
							<CircularProgress />
						</Box>
					) : noRecordsFound ? (
						<NoRecordFound />
					) : (
						<Box
							display="flex"
							height={500}
							mt={2}
						>
							<Scrollbar
								sx={{
									width: isMdScreen ? '50%' : '100%',
									height: '100%',
									borderRight: '1px solid #f4f4f4',
								}}
							>
								{authType === 'organization' && employees.length > 0 && (
									<PersonList
										title={t(tokens.search_modal.employee_list.title)}
										link={{
											text: t(tokens.search_modal.employee_list.link_text),
											path: `/${urlPreFix.employee}`,
										}}
										people={employees}
										selectedItemId={selectedItemId}
										onSelect={setSelectedPerson}
										handleCloseModal={handleCloseModal}
										viewProfile={viewProfile}
									/>
								)}
								{candidates.length > 0 && (
									<PersonList
										title={t(tokens.search_modal.candidate_list.title)}
										link={{
											text: t(tokens.search_modal.candidate_list.link_text),
											path: '/recruitment',
										}}
										people={candidates}
										selectedItemId={selectedItemId}
										onSelect={setSelectedPerson}
										handleCloseModal={handleCloseModal}
										viewProfile={viewProfile}
									/>
								)}
							</Scrollbar>
							{isMdScreen &&
								(selectedPerson ? (
									<DetailPerson
										person={selectedPerson}
										viewProfile={viewProfile}
									/>
								) : (
									<Box
										sx={{
											p: 2,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											mx: 'auto',
										}}
									>
										{/* <Typography
											sx={{
												fontSize: '22px',
												color: '#101828',
												fontWeight: 600,
												lineHeight: '24px',
												display: 'flex',
												justifyContent: 'center',
												mx: 'auto',
												mt: 25,
											}}
										>
											{t(tokens.search_modal.default_heading.heading)}
										</Typography> */}

										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												gap: 2,
											}}
										>
											<User01 style={{ width: '70px', height: 'auto' }} />
											{/* <Typography
												sx={{
													fontSize: '22px',
													color: '#101828',
													fontWeight: 600,
													lineHeight: '24px',
												}}
											>
												{t(tokens.search_modal.default_heading.heading)}
											</Typography> */}
										</Box>
									</Box>
								))}
						</Box>
					)}
				</DialogContent>
			</Dialog>
		</Box>
	)
}

export default SearchModal
