import { FC } from 'react'
import { Stack, Box, Typography, Avatar } from '@mui/material'

interface CustomOptionItemProps {
	option: { label: string; email?: string; photo?: string; job_title?: string }
}

const CustomOptionItem: FC<CustomOptionItemProps> = ({ option }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 2,
			}}
		>
			<Box>
				<Avatar
					src={option.photo}
					style={{
						height: 32,
						width: 32,
						objectFit: 'cover',
					}}
				/>
			</Box>

			<Stack spacing={1}>
				{option.label}
				<Typography sx={{ fontWeight: 400, fontSize: 14, color: '#6C737F' }}>
					{option.job_title}
				</Typography>
			</Stack>
		</Box>
	)
}

export default CustomOptionItem
