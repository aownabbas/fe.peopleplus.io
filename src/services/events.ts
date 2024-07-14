import APIClient from '../api/apiClient'

export const saveEventRequest = (data: FormData) =>
	APIClient.post('/organization/event/store', data)
