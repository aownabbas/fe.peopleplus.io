/* eslint-disable prettier/prettier */
import { Box, Container, Stack, Typography, Grid, IconButton } from '@mui/material'
import { Seo } from '@components/seo'
import { createTheme } from '@mui/system'
import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import type { BreadcrumbLink, STATUS } from 'type/config'
import { useEffect, useMemo, useState } from 'react'
import { DocumentCard } from '@sections/organization/policies/DocumentCard'
import Back from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import { Scrollbar } from '@components/scrollbar'
import { useNavigate } from 'react-router-dom'
import {
	documentsListSelector,
	handlePolicyDrawerClose,
	policyDrawerSelector,
	policyListAction,
	policyListStatusSelector,
} from '@redux/features/policiesSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { DocumentDrawer, DocumentListSection } from '@sections/organization/policies'
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'
import { Documents, PolicyStatus } from 'type/policies'
import NoRecordFound from '@components/NoRecordFound'
import ViewDraft from '@loading/policies/ViewDraft'

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

const breadcrumbsLinks: BreadcrumbLink[] = [
	{ label: tokens.policy.breadcrumbs.dashboard.label, url: '/' },
	{ label: tokens.policy.breadcrumbs.documents.label, url: '/policies' },
	{ label: 'Drafts', color: 'black' },
]
const Drafts = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const documentList: Documents = useAppSelector(documentsListSelector)
	const policyDrawer = useAppSelector(policyDrawerSelector)
	const policyListStatus: STATUS = useAppSelector(policyListStatusSelector)

	const navigate = useNavigate()

	const draftDocumentsList = useMemo(
		() => documentList.filter((document) => document.status === PolicyStatus.Draft),
		[documentList],
	)

	useEffect(() => {
		dispatch(policyListAction())
	}, [])

	return (
		<>
			<Seo title={t(tokens.seo_titles.policy.draft)} />
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
						{/* breadCrumbs */}
						<CustomBreadcrumbs links={breadcrumbsLinks} />
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 2,
							}}
						>
							<Box>
								<IconButton
									sx={{
										background: 'white',
										height: '45px',
										width: '45px',
										border: '1px solid #D1D5DE',
										borderRadius: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
									onClick={() => navigate(`/policies`)}
								>
									<Back
										style={{
											width: '20px',
										}}
									/>
								</IconButton>
							</Box>
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
									{t(tokens.policy.draft_title)}
								</Typography>
							</Box>
						</Box>
						{/* @ts-ignore */}

						{policyListStatus === 'LOADING' ? (
							<ViewDraft />
						) : draftDocumentsList.length > 0 ? (
							<DocumentListSection
								list={draftDocumentsList}
								documentStatus={PolicyStatus.Draft}
							/>
						) : (
							<NoRecordFound />
						)}
					</Stack>
				</Container>
			</Box>
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

export default Drafts
