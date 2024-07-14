import { useContext, type FC } from 'react'

// mui imports
import {
	Avatar,
	Box,
	Button,
	Container,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Paper,
	Stack,
	SvgIcon,
	Typography,
	DialogActions,
} from '@mui/material'
import AlertTriangleIcon from '@untitled-ui/icons-react/build/esm/AlertTriangle'

import { ConfirmationContext } from '@contexts/confirmation'

export const ConfirmationModal: FC = () => {
	const { isOpen, message, onConfirm, onCancel, closeModal } = useContext(ConfirmationContext)

	const handleConfirm = () => {
		onConfirm()
		closeModal()
	}

	const handleCancel = () => {
		onCancel()
		closeModal()
	}
	return (
		<Dialog
			fullWidth
			open={isOpen}
			onClose={handleCancel}
		>
			<DialogTitle>
				<Stack
					direction="row"
					spacing={2}
					sx={{
						py: 2,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Avatar
						sx={{
							backgroundColor: 'error.lightest',
							color: 'error.main',
						}}
					>
						<SvgIcon>
							<AlertTriangleIcon />
						</SvgIcon>
					</Avatar>
					<div>
						<Typography
							sx={{
								color: '#111927',
								fontSize: {
									xs: 16,
									md: 24,
								},
								fontWeight: 700,
							}}
						>
							Confirmation Required!!
						</Typography>
						<Typography sx={{ color: '#6C737F', fontSize: 12, fontWeight: 500 }}>
							{message.length === 0 ? 'Are you sure you want to Delete this?' : message}
						</Typography>
					</div>
				</Stack>
			</DialogTitle>
			<DialogActions
				sx={{
					// display: 'flex',
					// justifyContent: 'flex-end',
					pb: 3,
					px: 3,
				}}
			>
				<Button
					onClick={handleCancel}
					color="inherit"
					sx={{ mr: 2, textTransform: 'none' }}
				>
					Cancel
				</Button>

				<Button
					onClick={handleConfirm}
					sx={{
						backgroundColor: 'error.main',
						textTransform: 'none',
						'&:hover': {
							backgroundColor: 'error.dark',
						},
					}}
					variant="contained"
				>
					Confirm
					{/* Sure */}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
