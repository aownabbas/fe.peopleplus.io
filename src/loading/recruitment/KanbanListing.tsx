import { Skeleton, Box, Stack } from '@mui/material' // Ensure all imports are from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/system'
import { CardSkeleton } from '@components/Skeletons'

const CustomScrollbar = styled('div')({
	maxHeight: '100vh',
	overflowY: 'hidden',
	overflowX: 'auto',
	'&::-webkit-scrollbar': {
		display: 'none',
	},
	msOverflowStyle: 'none',
	scrollbarWidth: 'none',
})

function KanbanListings() {
	const count = 4

	return (
		<Box
			component="main"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				overflow: 'hidden',
			}}
		>
			<CustomScrollbar>
				<Box
					sx={{
						display: 'flex',
						flexGrow: 1,
						flexShrink: 1,
						justifyContent: 'space-between',
					}}
				>
					{Array.from({ length: count }).map((_, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								marginRight: 2,
							}}
						>
							<Stack
								alignItems="center"
								direction="row"
								justifyContent="space-between"
								spacing={2}
								sx={{
									width: 300, // Adjust width to fit your design
									pr: 2,
									py: 1,
									background: 'white',
									borderRadius: '12px 12px 0px 0px',
								}}
							>
								<Skeleton
									variant="text"
									width={180} // Adjust width to fit your design
									height={30} // Adjust height to be more noticeable
									sx={{
										borderRadius: 1,
										px: 2,
										py: 1,
										ml: 3,
										pl: 3,
									}}
								/>

								<Stack
									alignItems="center"
									direction="row"
									spacing={2}
								>
									<Skeleton
										variant="rectangular"
										width={37}
										height={40}
										sx={{ borderRadius: '19px' }}
									/>
								</Stack>
							</Stack>
							{Array.from({ length: 2 }).map((_, index) => (
								<Box
									sx={{ marginTop: 2 }}
									width={300}
									key={index}
								>
									<CardSkeleton />
								</Box>
							))}
						</Box>
					))}
				</Box>
			</CustomScrollbar>
		</Box>
	)
}

export default KanbanListings
