import React from 'react'

// mui import
import { Box, Button, SvgIcon, Typography, useTheme } from '@mui/material'
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus'

import CustomBreadcrumbs from '@components/CustomBreadcrumbs'
import { handlePolicyDrawerOpen } from '@redux/features/policiesSlice'
import { BreadcrumbLink } from 'type/config'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { currentUserTypeSelector } from '@redux/features/authSlice'
import { ROLE } from '@config/index'

import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

const breadcrumbsLinks: BreadcrumbLink[] = [
	{ label: tokens.policy.breadcrumbs.dashboard.label, url: '/' },
	{ label: tokens.policy.breadcrumbs.documents.label, color: 'black' },
]

const PolicyHeader = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const userType: ROLE = useAppSelector(currentUserTypeSelector)

	return (
		<>
			<CustomBreadcrumbs links={breadcrumbsLinks} />

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
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
					{t(tokens.policy.heading.text)}
				</Typography>

				{userType === 'organization' && (
					<Button
						variant="gradient"
						sx={{
							gap: 1,
						}}
						onClick={() => dispatch(handlePolicyDrawerOpen({ variant: 'form' }))}
					>
						<SvgIcon
							sx={{
								margin: '0px',
								width: '20px',
							}}
						>
							<PlusIcon />
						</SvgIcon>
						<Typography
							sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500, fontSize: 14 }}
						>
							{t(tokens.policy.add_btn.text)}
						</Typography>
					</Button>
				)}
			</Box>
		</>
	)
}

export default PolicyHeader
