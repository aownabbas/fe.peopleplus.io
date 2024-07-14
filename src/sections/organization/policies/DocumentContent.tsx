import { Scrollbar } from '@components/scrollbar'
import { Box, Typography } from '@mui/material'
import React from 'react'

function DocumentContent() {
	return (
		<Scrollbar sx={{ maxHeight: 560 }}>
			<Box sx={{ maxHeight: 550 }}>
				<Typography>Content coming from the description box</Typography>
			</Box>
		</Scrollbar>
	)
}

export default DocumentContent
