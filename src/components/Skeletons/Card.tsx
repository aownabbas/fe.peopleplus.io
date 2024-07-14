import React from 'react'
import { Box, Skeleton, Stack, Card as MUICard, CardContent } from '@mui/material'

interface CardProps {
	avatar?: boolean
	titleLines?: number
	contentLines?: number
	action?: boolean
	direction?: 'column' | 'row'
}

const Card: React.FC<CardProps> = ({
	avatar,
	titleLines = 1,
	contentLines = 2,
	action = false,
	direction = 'column',
}) => {
	return (
		<MUICard>
			<CardContent>
				<Stack
					direction={direction}
					spacing={1}
				>
					{avatar && (
						<Skeleton
							variant="circular"
							width={50}
							height={50}
						/>
					)}
					<Stack
						direction="column"
						spacing={1}
						flex={1}
					>
						<Box>
							{Array.from({ length: titleLines }).map((_, index) => (
								<Skeleton
									key={index}
									variant="text"
									width={`${Math.random() * (80 - 60) + 60}%`}
								/>
							))}
							{Array.from({ length: contentLines }).map((_, index) => (
								<Skeleton
									key={index}
									variant="text"
									width={`${Math.random() * (60 - 40) + 40}%`}
								/>
							))}
						</Box>
						{action && (
							<Skeleton
								variant="rectangular"
								height={36}
								width="100%"
							/>
						)}
					</Stack>
				</Stack>
			</CardContent>
		</MUICard>
	)
}

export default Card
