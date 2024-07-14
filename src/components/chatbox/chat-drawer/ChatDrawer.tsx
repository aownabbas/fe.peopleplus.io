import type { FC } from 'react'
import { useCallback, useState, useEffect, useRef } from 'react'
import Drawer from '@mui/material/Drawer'
import { Scrollbar } from '@components/scrollbar' // Adjust the import path if needed
import type { Settings } from 'type/settings' // Adjust the import path if needed
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { getChatBotAllDataAction, generalSelector } from '@redux/features/generalSlice'

import {
	Box,
	TextField,
	List,
	ListItem,
	Typography,
	Avatar,
	IconButton,
	Tooltip,
	Stack,
	SvgIcon,
	Divider,
} from '@mui/material'

import { format } from 'date-fns'

import Send from '@untitled-ui/icons-react/build/esm/Send03' // Adjust the import path if needed
import Stop from '@untitled-ui/icons-react/build/esm/Stop' // Adjust the import path if needed

import XIcon from '@untitled-ui/icons-react/build/esm/X' // Adjust the import path if needed
import { usePrevious } from '@uidotdev/usehooks'
import { gptAssessment } from '@utils/gptAssessment'
import { chatbotPrompt } from '@utils/gptPrompt'
import { getAuth } from '@utils/AuthHelpers'
import { anthropicChatBot } from '@service/general'
interface ChatDrawerProps {
	canReset?: boolean
	onClose?: () => void
	onReset?: () => void
	onUpdate?: (settings: Settings) => void
	open?: boolean
	values?: Settings
}

interface Message {
	id: number
	text: string
	sender: 'user' | 'other'
	avatar: string
	timestamp: string
}

export const ChatDrawer: FC<ChatDrawerProps> = (props) => {
	const authUser = getAuth()
	const photo = authUser?.user.organization?.company_logo
		? authUser.user.organization.company_logo
		: authUser?.user.employee.photo
	const { canReset, onClose, onUpdate, onReset, open, values = {}, ...other } = props
	const { data: chatBotData } = useAppSelector(generalSelector)
	const [messages, setMessages] = useState<Message[]>([])
	const [inputValue, setInputValue] = useState<string>('')
	const [currentUser, setCurrentUser] = useState<'user' | 'other'>('user')
	const [isReplying, setIsReplying] = useState<boolean>(false)
	const [stopTyping, setStopTyping] = useState<boolean>(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)

	const timeoutRef = useRef<number | null>(null)

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
			setTimeout(() => {
				inputRef.current?.focus()
			}, 100)
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	useEffect(() => {
		dispatch(getChatBotAllDataAction())
	}, [])

	const handleSendMessage = async () => {
		const employees = chatBotData.employees
		const assets = chatBotData.assets

		if (inputValue.trim() !== '') {
			setIsReplying(true)

			const newUserMessage: Message = {
				id: messages.length + 1,
				text: inputValue,
				sender: 'user',
				avatar: currentUser === 'user' ? photo : '/themedRocket.png',
				timestamp: format(new Date(), 'p, MMMM dd'),
			}

			// Add the user's message to the state
			setMessages([...messages, newUserMessage])
			setInputValue('')

			// Add a typing indicator to the state
			const typingMessage: Message = {
				id: messages.length + 2,
				text: 'Typing...', // Typing indicator
				sender: 'other',
				avatar: '/bot_avatar.png',
				timestamp: format(new Date(), 'p, MMMM dd'),
			}

			setMessages((prevMessages) => [...prevMessages, typingMessage])

			try {
				const payload = {
					message: inputValue.trim(),
				};
				const { data } = await anthropicChatBot(payload);
				const { content } = data;
				const response = content ? content[0]['text'] : null;
			
				if (!response) return;
			
				let typedMessage = '';
				let currentCharIndex = 0;
				let inTag = false;
				let tempMessage = '';
			
				const speedFactor = 10; 
			
				const typeWriterEffect = () => {
					if (currentCharIndex < response.length) {
						for (let i = 0; i < speedFactor && currentCharIndex < response.length; i++) {
							const currentChar = response[currentCharIndex];
							tempMessage += currentChar;
			
							// Check if we are inside an HTML tag
							if (currentChar === '<') {
								inTag = true;
							} else if (currentChar === '>') {
								inTag = false;
								typedMessage += tempMessage;
								tempMessage = '';
							} else if (!inTag) {
								typedMessage += tempMessage;
								tempMessage = '';
							}
			
							currentCharIndex++;
						}
			
						setMessages((prevMessages) =>
							prevMessages.map((msg) =>
								msg.id === typingMessage.id ? { ...msg, text: typedMessage } : msg,
							),
						);
			
						timeoutRef.current = window.setTimeout(typeWriterEffect, 0);
					} else {
						// Typing completed, finalize the message
						setMessages((prevMessages) =>
							prevMessages.map((msg) =>
								msg.id === typingMessage.id ? { ...msg, text: response } : msg,
							),
						);
						setIsReplying(false);
						setTimeout(() => {
							inputRef.current?.focus()
						}, 100)
					}
				};
			
				// Start the typewriter effect
				typeWriterEffect();
			
			} catch (error) {
				// Handle error (e.g., show an error message or retry)
				console.error('Error fetching GPT response:', error);
				setMessages((prevMessages) =>
					prevMessages.map((msg) =>
						msg.id === typingMessage.id ? { ...msg, text: 'Error fetching response' } : msg,
					),
				);
				setIsReplying(false);
			}
		}
	}

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [messages])

	const stopTypewriterEffect = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
			setIsReplying(false) // Optionally update your state
		}
	}

	const onStopTyping = () => {
		stopTypewriterEffect()
		setStopTyping(true)
		setIsReplying(false)
	}

	return (
		<Drawer
			disableScrollLock
			anchor="right"
			onClose={onClose}
			open={open}
			ModalProps={{
				BackdropProps: {
					invisible: false,
					style: {
						backgroundColor: 'rgba(17, 25, 39, 0.75)',
					},
				},
				sx: { zIndex: 1400 },
			}}
			PaperProps={{
				elevation: 24,
				sx: {
					width: {
						xs: '100%',
						sm: 500,
					},
					backgroundImage: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
				},
			}}
			{...other}
		>
			{/* close button */}
			<IconButton
				onClick={onClose}
				sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
			>
				<SvgIcon>
					<XIcon />
				</SvgIcon>
			</IconButton>
			{/* chat& Input */}
			<Scrollbar
				sx={{
					height: '100%',
					'& .simplebar-content': {
						height: '100%',
					},
					'& .simplebar-scrollbar:before': {
						background: 'var(--nav-scrollbar-color)',
					},
				}}
			>
				<Stack
					sx={{
						width: '100%',
					}}
				>
					<Box sx={{ display: 'flex', gap: 1, p: 2 }}>
						<Box>
							<Avatar
								alt="Other user"
								src="/Chatbox-Logo.svg"
							/>
						</Box>
						<Box>
							<Typography
								noWrap
								sx={{
									fontSize: 18,
									fontWeight: 600,
									color: 'black',
									lineHeight: '18px',
								}}
							>
								Chat Bot
							</Typography>
							<Typography
								color="text.secondary"
								variant="caption"
							>
								Ai Assistant
							</Typography>
						</Box>
					</Box>
					<Divider />

					<Scrollbar
						sx={{
							maxHeight: {
								xs: '510px',
								sm: '630px',
							},
						}}
					>
						<List
							sx={{
								mb: 2,
								minHeight: {
									xs: '500px',
									sm: '570px',
								},
							}}
						>
							{messages.map((message) => (
								<ListItem
									key={message.id}
									sx={{
										display: 'flex',
										justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
										alignItems: 'flex-start',
										mb: 1,
									}}
								>
									{message.sender === 'other' && (
										<Avatar
											alt="Other user"
											// src={message.avatar}
											src="/Chatbox-Logo.svg"
											sx={{ mr: 2 }}
										/>
									)}
									<Box
										sx={{
											p: 2,
											borderRadius: 2,
											bgcolor: message.sender === 'user' ? '#1e1e1e' : 'white',
											color: message.sender === 'user' ? 'white' : 'black',
											maxWidth: '75%',
										}}
									>
										<Typography
											variant="body1"
											sx={{
												maxWidth: '300px',
												wordBreak: 'break-word',
											}}
											dangerouslySetInnerHTML={{
												__html: message.text.replace(/```html/g, '').replace(/```/g, ''),
											}}
										></Typography>
										<Typography
											variant="caption"
											sx={{ display: 'block', mt: 1, textAlign: 'right' }}
										>
											{message.timestamp}
										</Typography>
									</Box>
									{message.sender === 'user' && (
										<Avatar
											alt="User"
											src={message.avatar}
											sx={{ ml: 2 }}
										/>
									)}
								</ListItem>
							))}
							<div ref={messagesEndRef} />
						</List>
					</Scrollbar>

					<Box
						sx={{
							position: 'absolute',
							bottom: 0,
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							gap: 2,
							p: 2,
						}}
					>
						<Box sx={{ width: '95%' }}>
							<TextField
								variant="outlined"
								sx={{ backgroundColor: 'white', borderRadius: 1 }}
								fullWidth
								placeholder="Type a message"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === 'Enter' && !isReplying) {
										handleSendMessage()
									}
								}}
								disabled={isReplying}
								inputRef={inputRef} // Attach the ref to the input field
							/>
						</Box>
						<Box sx={{ width: '5%', mr: 1 }}>
							<Tooltip title={isReplying ? 'Stop' : 'Send'}>
								<IconButton
									color="primary"
									onClick={isReplying ? onStopTyping : handleSendMessage}
									sx={{
										bgcolor: 'var(--mui-palette-primary-main)',
										color: 'var(--mui-palette-primary-contrastText)',
										'&:hover': { bgcolor: 'var(--mui-palette-primary-dark)' },
									}}
								>
									{isReplying ? <Stop /> : <Send />}
								</IconButton>
							</Tooltip>
						</Box>
					</Box>
				</Stack>
			</Scrollbar>
		</Drawer>
	)
}
