import React, { FC, useEffect, useRef } from 'react'

// mui imports
import { Drawer, Stack, Typography, Box, IconButton, SvgIcon } from '@mui/material'
import XIcon from '@untitled-ui/icons-react/build/esm/X'
import CreateDocument, { CreateDocumentHandles } from './CreateDocument'
import { DocumentDetailSection } from './documentDetail'
import { drawerVariant } from 'type/policies'
import { useAppSelector } from '@redux/hooks'
import { currentUserTypeSelector } from '@redux/features/authSlice'
import { ROLE } from '@config/index'

// local imports

interface DocumentDrawerProps {
	variant: drawerVariant
	onClose: () => void
	open: boolean
}

const DocumentDrawer: FC<DocumentDrawerProps> = ({ onClose, open = false, variant }) => {
	const userType: ROLE = useAppSelector(currentUserTypeSelector)
	// const createDocRef = React.useRef<CreateDocumentHandles | null>(null)

	// const handleResetForm = () => {
	// 	createDocRef.current?.resetFrom()
	// }

	// useEffect(() => {
	// 	console.log('drawer opening ')

	// 	return () => {
	// 		console.log('drawer closing ')
	// 	}
	// }, [])
	return (
		<Drawer
			anchor="right"
			onClose={(_, reason) => {
				if (reason !== 'backdropClick' || userType !== 'organization') {
					onClose()
				}
			}}
			open={open}
			PaperProps={{
				sx: {
					width: '100%',
					maxWidth: 600,
				},
			}}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
				onClick: (event: React.MouseEvent<HTMLElement>) => {
					event.stopPropagation() // Prevent the modal from closing when clicking inside the drawer content
				},
			}}
		>
			<IconButton
				onClick={onClose}
				sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }} // Ensure the close button is always visible
			>
				<SvgIcon>
					<XIcon />
				</SvgIcon>
			</IconButton>
			{/* {variant === 'form' && userType === 'organization' && <CreateDocument ref={createDocRef} />} */}
			{variant === 'form' && userType === 'organization' && <CreateDocument />}
			{variant === 'details' && <DocumentDetailSection />}
		</Drawer>
	)
}

export default DocumentDrawer
