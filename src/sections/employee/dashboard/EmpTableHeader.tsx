import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { createTheme } from '@mui/system'

interface TableHeaderProps {
	children: React.ReactNode
}

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

function EmpTableHeader({ children }: TableHeaderProps) {
	return (
		<Box
			sx={{
				backgroundColor: '#F9FAFB',
				padding: '20px 24px',
				display: 'flex',
				flexDirection: 'column', // Updated to column
				alignItems: 'center',
				justifyContent: 'space-between',
				'@media (min-width: 600px)': {
					flexDirection: 'row', // Change back to row for screens larger than or equal to sm
				},
			}}
		>
			{children}
		</Box>
	)
}

export default EmpTableHeader
