import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

export default function InputWithIcon() {
	return (
		<Box sx={{ '& > :not(style)': { m: 1 } }}>
			<TextField
				sx={{
					width: '90%',
				}}
				id="input-with-icon-textfield"
				label="Record Activity"
				InputProps={{
					startAdornment: (
						<InputAdornment
							position="start"
							sx={{
								my: 3,
							}}
						>
							<img
								src="/user.png"
								style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: 100 }}
							/>
						</InputAdornment>
					),
				}}
				variant="standard"
			/>
		</Box>
	)
}
