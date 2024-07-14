import React from 'react'
import { Skeleton, Box, Stack, Container } from '@mui/material' // Ensure all imports are from '@mui/material'
// import theme from '@yourTheme' // Import your theme if necessary
import { KanbanListingLoading } from '.'
import { PageUpperSectionSkeleton } from '@components/Skeletons'

function RecruitmentPage() {
	return (
		<Box
			component="main"
			sx={{ flexGrow: 1 }}
		>
			<Container maxWidth="xl">
				<Stack spacing={3}>
					{/* Skeleton for CustomBreadcrumbs */}
					<PageUpperSectionSkeleton />

					<Box>
						<KanbanListingLoading />
					</Box>
				</Stack>
			</Container>
		</Box>
	)
}

export default RecruitmentPage
