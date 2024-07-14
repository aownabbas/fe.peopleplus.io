import React from 'react'
import {
	Box,
	Divider,
	Stack,
	Tabs,
	Tab,
	OutlinedInput,
	InputAdornment,
	SvgIcon,
	Skeleton,
} from '@mui/material'
import SearchMdIcon from '@mui/icons-material/Search'

const categorySkeletons = new Array(5).fill(null)

const Documents = () => {
	return (
		<>
			<Tabs
				indicatorColor="primary"
				scrollButtons="auto"
				textColor="primary"
				value={0}
				variant="scrollable"
				sx={{
					px: 3,
					'& .MuiTabs-indicator': {
						background: 'transparent',
					},
					'& .MuiTab-root': {
						color: '#6C737F',
					},
				}}
			>
				{categorySkeletons.map((_, index) => (
					<Tab
						key={index}
						label={<Skeleton width={100} />}
						value={index}
					/>
				))}
			</Tabs>
			{/* <Divider />
			<Stack
				alignItems="center"
				direction="row"
				spacing={2}
				sx={{ p: 3, pr: 0 }}
			>
				<Box
					component="form"
					sx={{ flexGrow: 1 }}
				>
					<OutlinedInput
						fullWidth
						placeholder=""
						startAdornment={
							<InputAdornment position="start">
								<SvgIcon>
									<SearchMdIcon />
								</SvgIcon>
							</InputAdornment>
						}
						inputProps={{ 'aria-label': 'search' }}
					/>
					<Skeleton
						variant="rectangular"
						height={48}
					/>
				</Box>
				<Skeleton
					variant="rectangular"
					width={100}
					height={40}
				/>
			</Stack> */}
		</>
	)
}

export default Documents
