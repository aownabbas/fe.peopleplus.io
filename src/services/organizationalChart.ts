import APIClient from '../api/apiClient'

export const getOrganizationalChartRequest = (uuid?: string) =>
	APIClient.get(`/organization/org-chart${uuid ? `/${uuid}` : ''}`)
