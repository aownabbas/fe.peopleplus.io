import React from 'react'
import { Button, SvgIcon, Typography, ButtonProps } from '@mui/material'
import Trash from '@untitled-ui/icons-react/build/esm/Trash01'

interface DeleteButtonProps extends ButtonProps {
	label: string
	disabled?: boolean
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ label, disabled, ...rest }) => {
	return (
		<Button
			disabled={disabled}
			variant="text"
			startIcon={
				<SvgIcon
					sx={{
						width: '18px',
						height: '18px',
					}}
				>
					<Trash />
				</SvgIcon>
			}
			{...rest}
			sx={{
				'&:hover': {
					backgroundColor: 'rgba(255, 0, 0, 0.1)', // Shade of red
					color: 'red', // Change text color to red
					'& .MuiSvgIcon-root': {
						// Change icon color to red
						color: 'red',
					},
				},
				color: '#111927', // Default text color
			}}
		>
			<Typography
				component={'span'}
				sx={{ fontWeight: 500, fontSize: 14 }}
			>
				{label}
			</Typography>
		</Button>
	)
}

export default DeleteButton
