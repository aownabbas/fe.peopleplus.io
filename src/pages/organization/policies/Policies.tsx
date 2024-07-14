import { useEffect, useMemo } from 'react'

// mui imports
import { Box, Container, Stack } from '@mui/material'

// local imports
import { Seo } from '@components/seo'
import { PolicyStatus } from 'type/policies'
import {
	documentsListSelector,
	handlePolicyDrawerClose,
	policyCategoryListAction,
	policyDrawerSelector,
	policyListAction,
	policyListStatusSelector,
} from '@redux/features/policiesSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	DocumentDrawer,
	DocumentListSection,
	PolicyHeaderSection,
	PolicyWidgetSection,
} from '@sections/organization/policies'
import NavBar from './NavBar'
// eslint-disable-next-line import/no-unresolved
import { PageLoading } from '@loading/policies'
import NoRecordFound from '@components/NoRecordFound'
import { STATUS } from 'type/config'
import { tokens } from '@locales/tokens'
import { t } from 'i18next'

const Policies = () => {
	const dispatch = useAppDispatch()
	const documentList = useAppSelector(documentsListSelector)
	const policyDrawer = useAppSelector(policyDrawerSelector)
	const policyListStatus: STATUS = useAppSelector(policyListStatusSelector)

	const publishedDocumentsList = useMemo(
		() => documentList.filter((document) => document.status === PolicyStatus.Published),
		[documentList],
	)
	useEffect(() => {
		Promise.all([dispatch(policyListAction()), dispatch(policyCategoryListAction())])
	}, [])

	return (
		<>
			<Seo title={t(tokens.seo_titles.policy.list)} />

			{policyListStatus === 'LOADING' ? (
				<PageLoading />
			) : (
				<Box
					component="main"
					sx={{ flexGrow: 1 }}
				>
					<Container maxWidth="xl">
						<Stack
							spacing={3}
							sx={{
								mb: 3,
							}}
						>
							<PolicyHeaderSection />
							<PolicyWidgetSection list={documentList} />
							<NavBar />
							{/* @ts-ignore */}
							{publishedDocumentsList.length > 0 && policyListStatus !== 'LOADING' ? (
								<DocumentListSection
									list={publishedDocumentsList}
									documentStatus={PolicyStatus.Published}
								/>
							) : (
								<NoRecordFound />
							)}
						</Stack>
					</Container>
				</Box>
			)}

			{policyDrawer.isOpen && (
				<DocumentDrawer
					variant={policyDrawer.variant}
					open={policyDrawer.isOpen}
					onClose={() => dispatch(handlePolicyDrawerClose())}
				/>
			)}
		</>
	)
}

export default Policies
