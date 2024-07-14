import APIClient from '../api/apiClient'

export const saveEventRequest = (data: FormData) =>
	APIClient.post('/organization/event/store', data)

export const eventListRequest = (params?: any) =>
	APIClient.get('/organization/event/list', { params })

export const deleteEventRequest = (uuid: string) =>
	APIClient.delete(`/organization/event/delete/${uuid}`)
