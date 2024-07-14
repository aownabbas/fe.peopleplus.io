import { Box, CircularProgress } from '@mui/material'

interface LoadingProps {
	msg?: string
	showMessage?: boolean
	size?: number // New prop for size
}

const Loading = ({ msg = 'Loading', showMessage = false, size = 27 }: LoadingProps) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<CircularProgress
				color="inherit"
				sx={{ marginX: '5px' }}
				size={size} // Use the size prop here
				variant="indeterminate"
			/>
			{showMessage ? <span>{msg}</span> : null}
		</Box>
	)
}

export default Loading
