import APIClient from '../api/apiClient.ts'

export const getDepartmentRequest = () => APIClient.post('/organization/department/show')
