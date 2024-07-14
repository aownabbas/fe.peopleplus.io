import React from 'react'
import { Drawer, IconButton, SvgIcon, Box, Typography, Stack } from '@mui/material'
import XIcon from '@untitled-ui/icons-react/build/esm/X' // Adjust the import path if needed
import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock'

interface SideDrawerProps {
	isOpen: boolean
	toggleDrawer: () => void
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, toggleDrawer }) => {
	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={toggleDrawer}
			PaperProps={{
				sx: {
					width: '100%',
					maxWidth: 600,
				},
			}}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
		>
			<IconButton
				onClick={toggleDrawer}
				sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
			>
				<SvgIcon>
					<XIcon />
				</SvgIcon>
			</IconButton>
			<Stack
				spacing={2}
				sx={{ py: '40px' }}
				onClick={(event) => event.stopPropagation()} // Prevent the drawer from closing when clicking inside
			>
				<Box sx={{ px: '20px', display: 'flex', alignItems: 'center', gap: 2 }}>
					<Box>
						<img
							src="/themedStar.png"
							style={{ borderRadius: '100%', width: '70px', height: '70px' }}
						/>
					</Box>
					<Stack>
						<Typography
							sx={{
								color: '#111927',
								fontWeight: 700,
								fontSize: 24,
							}}
						>
							The BearPlex Ethos
						</Typography>
						<Stack
							alignItems="center"
							direction="row"
							spacing={1}
						>
							<SvgIcon>
								<ClockIcon
									style={{
										color: '#6C737F',
									}}
								/>
							</SvgIcon>
							<Typography
								sx={{
									color: '#6C737F',
									fontWeight: 500,
									fontSize: 12,
									lineHeight: '19px',
								}}
							>
								Last Updated 26 April 2024{' '}
							</Typography>
						</Stack>
					</Stack>
				</Box>

				<Box sx={{ px: '20px' }}> The content from description Box</Box>
			</Stack>
		</Drawer>
	)
}

export default SideDrawer
