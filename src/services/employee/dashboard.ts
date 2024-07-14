import APIClient from '../../api/apiClient.ts'

// dashboard
export const dashboardStatusRequest = () => APIClient.get('/employee/dashboard')
