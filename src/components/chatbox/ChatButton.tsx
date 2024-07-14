import type { FC } from 'react'
import { useState } from 'react'
import ChatBot from '@untitled-ui/icons-react/build/esm/MessageChatSquare'
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import { Button, IconButton } from '@mui/material'
import LightLogo from '@components/chatbotlightsvg'
import DarkLogo from '@components/chatbotdarksvg'

interface ChatBotProps {
	onClick?: () => void
}

export const ChatButton: FC<ChatBotProps> = (props) => {
	const [hover, setHover] = useState(false)

	return (
		<Tooltip title="ChatBot">
			<Box
				{...props}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<Button
					sx={{
						backgroundColor: 'white',
						borderRadius: '30px',
						color: '#101828',
						fontWeight: 600,
						fontSize: 15,
						fontFamily: 'Manrope',
						py: '5px',
						pl: '10px',
						pr: '15px',
					}}
					startIcon={hover ? <DarkLogo /> : <LightLogo />}
				>
					AI Assistant
				</Button>
			</Box>
		</Tooltip>
	)
}
