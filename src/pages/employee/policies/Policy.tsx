import { useEffect, useMemo } from 'react'

// mui imports
import { Box, Container, Stack } from '@mui/material'

// local imports
import { Seo } from '@components/seo'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	documentsListSelector,
	handlePolicyDrawerClose,
	policyDrawerSelector,
	policyListAction,
	policyListStatusSelector,
} from '@redux/features/policiesSlice'

import {
	DocumentDrawer,
	DocumentListSection,
	PolicyHeaderSection,
} from '@sections/organization/policies'
import { PolicyStatus } from 'type/policies'
import { PageLoading } from '@loading/policies'
import NoRecordFound from '@components/NoRecordFound'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

const Policy = () => {
	const dispatch = useAppDispatch()
	const documentList = useAppSelector(documentsListSelector)
	const policyDrawer = useAppSelector(policyDrawerSelector)
	const policyListStatus = useAppSelector(policyListStatusSelector)

	const publishedDocumentsList = useMemo(
		() => documentList.filter((document) => document.status === PolicyStatus.Published),
		[documentList],
	)

	useEffect(() => {
		dispatch(policyListAction())
	}, [dispatch])
	const { t } = useTranslation()

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
					variant={'details'}
					open={policyDrawer.isOpen}
					onClose={() => dispatch(handlePolicyDrawerClose())}
				/>
			)}
		</>
	)
}

export default Policy
