import React from 'react'
import {
	Skeleton,
	Box,
	Stack,
	Container,
	Tooltip,
	Typography,
	Button,
	SvgIcon,
	Tabs,
	Tab,
	Divider,
} from '@mui/material' // Ensure all imports are from '@mui/material'
import { styled } from '@mui/system'
// import theme from '@yourTheme' // Import your theme if necessary
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#357DBC',
		},
		secondary: {
			main: '#FF4081',
		},
		background: {
			default: '#ffffff',
		},
	},
	typography: {
		fontFamily: 'Arial, sans-serif',
	},
	// Add other theme customizations here
})

function PageUpperSection() {
	return (
		<>
			{/* Skeleton for CustomBreadcrumbs */}
			<Skeleton
				variant="rectangular"
				width="50%"
				height={30}
			/>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Stack spacing={1}>
					<Tooltip title="">
						<Skeleton
							variant="text"
							sx={{ fontSize: { xs: '18px', sm: '24px' }, width: 260 }}
						/>
					</Tooltip>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Tooltip title="">
							<Skeleton
								variant="text"
								sx={{ color: '#6C737F', width: 230, height: 24 }}
							/>
						</Tooltip>

						<Skeleton
							variant="circular"
							width={24}
							height={24}
						/>

						<Tooltip title="">
							<Skeleton
								variant="text"
								sx={{ color: '#6C737F', width: 230, height: 24 }}
							/>
						</Tooltip>
					</Box>
				</Stack>

				<Box>
					<Skeleton
						variant="rectangular"
						width={140} // Adjust the width as needed
						height={40} // Adjust the height as needed
						sx={{
							background: (theme) => theme.palette.grey[300], // Use a grey background
							borderRadius: '4px', // Optional: Add border-radius to match button shape
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					/>
				</Box>
			</Box>

			<Box>
				<Tabs
					indicatorColor="primary"
					textColor="primary"
					sx={{
						'& .MuiTabs-indicator': {
							background: theme.palette.background.default,
						},
						'& .MuiTab-root': {
							color: '#667085', // Default text color for inactive tabs
							'&.Mui-selected': {
								// Styles for the active tab
								background: theme.palette.background.default,
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								MozBackgroundClip: 'text',
								MozTextFillColor: 'transparent',
							},
						},
					}}
				>
					<Tab
						key="tab1"
						label={
							<Skeleton
								variant="text"
								width={100}
							/>
						}
					/>
					<Tab
						key="tab2"
						label={
							<Skeleton
								variant="text"
								width={100}
							/>
						}
					/>
				</Tabs>

				<Divider />
			</Box>
		</>
	)
}

export default PageUpperSection
