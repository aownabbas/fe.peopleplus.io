import { FC } from 'react'
import { Box, List, ListItem, Skeleton, Typography } from '@mui/material'
import { Scrollbar } from '@components/scrollbar'

interface FeaturedEventsSkeletonProps {
	count: number
}

const FeaturedEventsSkeleton: FC<FeaturedEventsSkeletonProps> = ({ count }) => {
	return (
		<>
			<Box sx={{ maxHeight: 720 }}>
				<List disablePadding>
					{[...Array(count)].map((_, index) => (
						<ListItem
							dense
							disableGutters
							key={index}
						>
							<Skeleton
								variant="circular"
								width={50}
								height={50}
							/>
							<Box
								ml={2}
								sx={{ flex: 1 }}
							>
								<Skeleton
									variant="text"
									width="60%"
								/>
								<Skeleton
									variant="text"
									width="40%"
								/>
							</Box>
						</ListItem>
					))}
				</List>
			</Box>
		</>
	)
}

export default FeaturedEventsSkeleton
