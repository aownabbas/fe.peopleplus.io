import React from 'react'
import { Scrollbar } from '@components/scrollbar'
import {
	Avatar,
	Card,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
	Typography,
	useMediaQuery,
} from '@mui/material'

import { Box } from '@mui/system'
import { CommentsSkeleton, PolicyCardSkeleton } from '@components/Skeletons'

function Comments() {
	return (
		// <Seo title="Employee Comments" />
		<Grid
			container
			sx={{
				pb: 2,
			}}
		>
			<Grid
				xs={12}
				md={8}
			>
				<Card
					sx={{
						boxShadow: 'none !important',
						border: '1px solid #EAECF0',
						padding: '20px',
					}}
				>
					<Typography sx={{ fontSize: 14, fontWeight: 600, color: '#000000', pb: 1 }}>
						Notes & Comments
					</Typography>
					<Box>
						<Scrollbar sx={{ maxHeight: '430px' }}>
							<Box sx={{ maxHeight: '420px', marginTop: '20px' }}>
								<List disablePadding>
									<CommentsSkeleton commentsCount={7} />
								</List>
							</Box>
						</Scrollbar>

						<Box
							sx={{
								pt: 3,
							}}
						>
							{/* <CommentAddForm /> */}
						</Box>
					</Box>
				</Card>
			</Grid>
			<Grid
				xs={12}
				md={4}
				sx={{
					paddingTop: 4,
					paddingLeft: 0,
					'@media (min-width:900px)': {
						paddingTop: 0,
						paddingLeft: 4,
					},
				}}
			>
				<PolicyCardSkeleton />
			</Grid>
		</Grid>
	)
}

export default Comments
