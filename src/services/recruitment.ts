import APIClient from '../api/apiClient'
import { GenericFormData } from 'axios'

import type { DnDRequestData } from 'type/kanban'
import type {
	JobStatus,
	NewCandidate,
	NewJob,
	NewNote,
	pipelineParam,
	gptAssessment,
} from 'type/recruitment'

// job
export const jobListRequest = (params: { search?: string; page?: number; per_page?: number }) =>
	APIClient.get('/recruitment/job/listing', { params })

export const createJobRequest = (jobData: any) => APIClient.post('/recruitment/job/store', jobData)

export const updateJobStatusRequest = (formData: { id: string; status: JobStatus }) =>
	APIClient.post('/recruitment/job/status-change', formData)

export const getJobRequest = (uuid: string) => APIClient.get(`/recruitment/job/${uuid}`)

export const getCandidateDetailRequest = (uuid: string) =>
	APIClient.get(`/recruitment/job/candidate/detail/${uuid}`)

export const updateJobRequest = (jobData: any) =>
	APIClient.patch(`/recruitment/job/update/${jobData?.uuid}`, jobData)

export const deleteJobRequest = (uuid: string) =>
	APIClient.delete(`/recruitment/job/delete/${uuid}`)

export const getJobIDRequest = () => APIClient.get(`/recruitment/job/next-id`)

// candidate
export const addCandidateRequest = (formData: GenericFormData) =>
	APIClient.post('/recruitment/job/candidate/store', formData)

export const dragDropCandidateRequest = (dndData: DnDRequestData) =>
	APIClient.post('/recruitment/job/candidate/handle-drag-drop', dndData)

export const candidateActivityListRequest = (uuid: string) =>
	APIClient.get(`/recruitment/job/candidate/activity/${uuid}`)

export const updatePipelineStageRequest = (formData: pipelineParam) =>
	APIClient.post('/recruitment/job/candidate/change-stage', formData)

export const candidateGptAssessment = (formData: gptAssessment) =>
	APIClient.post('/recruitment/job/candidate/resume-content', formData)

// candidate note
export const candidateNoteListRequest = (uuid: string) =>
	APIClient.get(`/recruitment/job/candidate/notes/${uuid}`)

export const createCandidateNoteRequest = (newNote: NewNote) =>
	APIClient.post(`/recruitment/job/candidate/note-submit`, newNote)

export const departListingRequest = () => APIClient.get(`/recruitment/job/depart-listing`)
