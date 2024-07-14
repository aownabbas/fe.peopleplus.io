import { Skeleton, Box } from '@mui/material'

function Comments({ commentsCount }: any) {
	return (
		<Box>
			{Array.from(new Array(commentsCount)).map((_, index) => (
				<Box
					key={index}
					sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
				>
					<Skeleton
						variant="circular"
						width={40}
						height={40}
						sx={{ marginRight: 2 }}
					/>
					<Box sx={{ flexGrow: 1 }}>
						<Skeleton
							width="30%"
							height={20}
						/>
						<Skeleton
							width="80%"
							height={20}
						/>
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default Comments
