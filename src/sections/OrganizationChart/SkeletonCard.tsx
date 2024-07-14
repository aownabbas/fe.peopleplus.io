import React from 'react'
import { Card, CardContent, Box, Skeleton } from '@mui/material'
const SkeletonCard = () => {
	return (
		<Card
			sx={{
				position: 'relative',
				width: 280,
				height: '140px',
				mb: 2,
				overflow: 'visible',
				boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
			}}
		>
			<CardContent sx={{ textAlign: 'center', p: 2 }}>
				<Box
					sx={{
						display: 'flex',
						position: 'relative',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Skeleton
						variant="circular"
						width={48}
						height={48}
						sx={{ position: 'absolute', top: -40 }}
					/>
					<Skeleton
						variant="text"
						width={120}
						height={24}
						sx={{ mt: 2 }}
					/>
					<Skeleton
						variant="text"
						width={100}
						height={16}
						sx={{ mt: 1 }}
					/>
				</Box>
			</CardContent>
		</Card>
	)
}
export default SkeletonCard
