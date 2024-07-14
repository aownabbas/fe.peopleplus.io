import React, { useState } from 'react'
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { SHOW_INFO } from '@utils/ToastMessage'

const CopyInput: React.FC<{ text: string }> = ({ text }) => {
	const [inputValue, setInputValue] = useState(text)
	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		navigator.clipboard.writeText(inputValue)
		setCopied(true)
		SHOW_INFO({ msg: 'Copied' })
	}

	return (
		<TextField
			disabled
			fullWidth
			label="Share this job"
			// variant="outlined"
			value={inputValue}
			onChange={(e) => setInputValue(e.target.value)}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Tooltip title={copied ? 'Copied' : 'Copy'}>
							<IconButton onClick={handleCopy}>
								<ContentCopyOutlinedIcon />
							</IconButton>
						</Tooltip>
					</InputAdornment>
				),
			}}
		/>
	)
}

export default CopyInput
