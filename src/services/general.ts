import APIClient from '../api/apiClient'

export const getChatBotDataRequest = () => APIClient.get('/organization/chat-boot')

export const anthropicChatBot = (data: { message: string }) =>
	APIClient.post('/anthropic/chat-bot', data)
