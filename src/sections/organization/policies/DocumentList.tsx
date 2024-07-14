import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

// mui imports
import { Tabs, Stack, createTheme, Grid, Tab } from '@mui/material'
import {
	policyCategoryListAction,
	policyCategoryOptionsSelector,
	selectedTabsSelector,
} from '@redux/features/policiesSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import NoRecordFound from '@components/NoRecordFound'
import { Scrollbar } from '@components/scrollbar'
import { DocumentCard } from './DocumentCard'
import { Documents, PolicyStatus } from 'type/policies'
import { DropdownOption } from 'type/config'

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

type DocumentList = {
	list: Documents
	documentStatus: PolicyStatus
}

const DocumentList: FC<DocumentList> = ({ list, documentStatus }) => {
	const dispatch = useAppDispatch()
	const [currentTab, setCurrentTab] = useState<string>('All')
	const { draft, published } = useAppSelector(selectedTabsSelector)

	const filteredDocuments = useMemo(() => {
		return currentTab === 'All'
			? list
			: list.filter((document) => document.category_name === currentTab)
	}, [currentTab, list])

	const handleTabsChange = useCallback(
		// eslint-disable-next-line @typescript-eslint/ban-types
		(event: React.ChangeEvent<{}>, value: string) => {
			setCurrentTab(value)
		},
		[],
	)

	const selectedTabs = useMemo(() => {
		let tabs: DropdownOption[] = []
		if (documentStatus === PolicyStatus.Draft) {
			tabs = draft
		} else if (documentStatus === PolicyStatus.Published) {
			tabs = published
		}

		// Checking if the current tab is present in the tabs array
		// If not, reset the current tab to 'All'
		const tabExists = tabs.some(({ value }) => value === currentTab)
		if (!tabExists) {
			setCurrentTab('All')
		}
		return tabs
	}, [documentStatus, draft, published])

	return (
		<Stack spacing={2}>
			<Tabs
				indicatorColor="primary"
				onChange={handleTabsChange}
				scrollButtons="auto"
				textColor="primary"
				value={currentTab}
				variant="scrollable"
				sx={{
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
				{selectedTabs.map((tab) => (
					<Tab
						sx={{ minWidth: '80px' }}
						key={tab.value}
						label={tab.label}
						value={tab.value}
					/>
				))}
			</Tabs>

			<Grid
				container
				sx={{ maxHeight: '1150px', overflow: 'auto' }}
			>
				{filteredDocuments.map((document) => (
					<Grid
						key={document.id}
						xs={12}
						md={4}
						xl={3}
					>
						<DocumentCard document={document} />
					</Grid>
				))}
			</Grid>
		</Stack>
	)
}

export default DocumentList
