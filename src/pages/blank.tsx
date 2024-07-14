/* eslint-disable prettier/prettier */
import React, { Component, useState } from 'react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { MainEditor } from '@components/CKEditor'
import { AWSConfig } from '@config/index'

export default function Page() {
	const [open, setOpen] = React.useState(false)
	const handleClose = () => {
		setOpen(false)
	}
	const handleOpen = () => {
		setOpen(true)
	}
	const [file, setFile] = useState<File | null>(null)

	const [uploading, setUploading] = useState(false)
	const [imgUrl, setImgUrl] = useState('')

	const allowedTypes = [
		'image/jpeg',
		'image/png',
		'application/pdf',
		'video/mp4',
		'video/quicktime',
		'audio/mpeg',
		'audio/wav',
		// Add more supported types as needed
	]

	const handleFileChange = (event: { target: { files: any[] } }) => {
		const selectedFile = event.target.files[0]
		if (allowedTypes.includes(selectedFile.type)) {
			setFile(selectedFile)
		} else {
			alert('Invalid file type. Only images and PDFs are allowed.')
		}
	}

	return (
		<div>
			<h3>playground</h3>
			<Button onClick={handleOpen}>Show backdrop</Button>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<div>
				<img src={imgUrl} />
				<input
					type="file"
					// @ts-ignore
					onChange={handleFileChange}
				/>
				<Button onClick={() => alert('aws lib remover kerdi hai wo issue ker rahi thi ')}>
					{uploading ? 'Uploading...' : 'Upload File'}
				</Button>
			</div>
			{/* <MainEditor /> */}
			{/* <Stack
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: '<center',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<Box width={500}>
					<PolicyCardSkeleton />
				</Box>
				<Box width={500}>
					<PolicyCardSkeleton />
				</Box>
				<Box width={500}>
					<PolicyCardSkeleton />
				</Box>
				<Box width={500}>
					<PolicyCardSkeleton />
				</Box>
				<Box width={500}>
					<PolicyCardSkeleton />
				</Box>
				<Box width={500}>
					<PolicyCardSkeleton />
				</Box>
			</Stack> */}
		</div>
	)
}
