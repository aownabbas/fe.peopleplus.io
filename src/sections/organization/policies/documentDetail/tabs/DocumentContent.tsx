import { Scrollbar } from '@components/scrollbar'
import { Box, Typography } from '@mui/material'
import React from 'react'

interface DocumentContentProps {
	content: string | undefined
}

function DocumentContent({ content }: DocumentContentProps) {
	return (
		<Scrollbar sx={{ maxHeight: 560 }}>
			<Box sx={{ maxHeight: 550, px: '20px' }}>
				<Typography>{content}</Typography>
			</Box>
		</Scrollbar>
	)
}

export default DocumentContent
