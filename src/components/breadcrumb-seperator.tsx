import type { FC } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

export const BreadcrumbsSeparator: FC = () => (
	// <Box
	// 	sx={{
	// 		backgroundColor: 'neutral.500',
	// 		borderRadius: '50%',
	// 		height: 4,
	// 		width: 4,
	// 	}}
	// />
	<Typography sx={{ fontWeight: '400', fontSize: 16, lineHeight: '24px', color: '#6C747F' }}>
		/
	</Typography>
)
