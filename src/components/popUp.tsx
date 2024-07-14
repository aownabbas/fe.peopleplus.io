import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { openAlertDialogModal, closeAlertDialogModal } from '@redux/features/employeeSlice'

interface AlertDialogProps {
	handleAgree: () => void // Define the type of handleAgree prop as a function that returns void
}
const AlertDialog: React.FC<AlertDialogProps> = ({ handleAgree }) => {
	const dispatch = useAppDispatch()
	const isOpen = useAppSelector((state) => state.employee.isAlertDialogOpen)

	return (
		<Dialog
			open={isOpen}
			onClose={() => dispatch(closeAlertDialogModal())}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Let Google help apps determine location. This means sending anonymous location data to
					Google, even when no apps are running.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => dispatch(closeAlertDialogModal())}>Disagree</Button>
				<Button
					onClick={() => {
						dispatch(closeAlertDialogModal()), handleAgree()
					}}
					autoFocus
				>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	)
}
export default AlertDialog
