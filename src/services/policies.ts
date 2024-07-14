import { documentFrom } from 'type/policies'
import APIClient from '../api/apiClient'

// {{local}}/document-policy-category/list
// {{local}}/document-policy-category/store
// {{local}}/document-policy-category/update

// {{local}}/document-policy/store
// {{local}}/document-policy/update
// {{local}}/document-policy/list

// {{local}}/document-policy/show/f573785a-9b8a-41e6-abc7-5e03ccc01c84

// policy
export const policyListRequest = () => APIClient.get('/document-policy/list')

export const getPolicyRequest = (uuid: string) => APIClient.get(`/document-policy/show/${uuid}`)

export const policyAddRequest = (document: documentFrom) =>
	APIClient.post('/document-policy/store', document)

export const policyModifyRequest = (formData: any) =>
	APIClient.post('/document-policy/update', formData)
