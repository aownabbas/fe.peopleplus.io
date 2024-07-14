/* eslint-disable prettier/prettier */
import APIClient from '../api/apiClient.ts'
import { SearchRequestParams } from 'type/employee.ts'

export const employeeListRequest = (params?: SearchRequestParams) =>
	APIClient.get('/employee/list', { params })

export const unLinkedEmployeeListRequest = (params?: SearchRequestParams) =>
	APIClient.get('/organization/unlinked-employee', { params })

export const linkedEmployeeListRequest = () => APIClient.get('/organization/linked-employee')

export const employeeDepartmentListRequest = () => APIClient.get('/employee/department/list')

export const nextEmployeeIdRequest = () => APIClient.get('/employee/next-id')

export const employeeProfileRequest = (uuid?: string) =>
	APIClient.get(`/employee/profile${uuid ? `/${uuid}` : ''}`)

export const saveEmployeeRequest = (data: FormData) =>
	APIClient.post('/employee/store', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})

export const updateEmployeeProfileRequest = (id: string, formData: any) =>
	APIClient.post(`employee/update/${id}`, formData)

export const employeeDocumentListRequest = (params: any) =>
	APIClient.get('/employee/document/listing', { params })

export const employeeDocumentDeleteRequest = (uuid: string) =>
	APIClient.delete(`/employee/document/delete/${uuid}`)

export const documentCategoryListRequest = (params?: any) =>
	APIClient.get('/document-category/list', { params })

export const saveEmployeeDocumentRequest = (data: FormData) =>
	APIClient.post('/employee/document/store', data)

export const saveEmployeeOnBoardingRequest = (data: FormData) =>
	APIClient.post('/employee/update-on-boarding-stats', data)

export const updateEmployeeDocumentRequest = (id: string, formData: any) =>
	APIClient.post(`employee/document/update/${id}?_method=PUT`, formData)

export const employeeOnBoardingListRequest = (params?: any) =>
	APIClient.get('/employee/onboarding/listing', { params })

export const employeeAddCommentRequest = (data: FormData) =>
	APIClient.post('/employee/feedback/store', data)

export const employeeCommentsListRequest = (params?: any) =>
	APIClient.get(`/employee/feedback/${params}`)
