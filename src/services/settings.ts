import APIClient from '../api/apiClient'
import { DeleteSettingsFields } from 'type/settings'

export const countriesListRequest = () => APIClient.get('/countries')

export const timezonesListRequest = () => APIClient.get('/timezones')

export const generalRequest = (formData: any) =>
	APIClient.post('/organization/update-setting', formData)

// asset category
export const assetListRequest = (formData?: any) =>
	APIClient.post('organization/asset-category/show', formData)

export const assetModifyRequest = (formData: any) =>
	APIClient.post('organization/asset-category/store', formData)

// department
export const departmentListRequest = (formData?: any) =>
	APIClient.post('organization/department/show', formData)

export const departmentModifyRequest = (formData: any) =>
	APIClient.post('organization/department/store', formData)

// work location
export const workLocationListRequest = (formData?: any) =>
	APIClient.post('organization/worklocation/show', formData)

export const workLocationModifyRequest = (formData: any) =>
	APIClient.post('organization/worklocation/store', formData)

// skill set
export const skillSetListRequest = (formData?: any) =>
	APIClient.post('organization/skill-set/show', formData)

export const skillSetModifyRequest = (formData: any) =>
	APIClient.post('organization/skill-set/store', formData)

// benefit Package
export const benefitPackageListRequest = (formData?: any) =>
	APIClient.post('organization/benefit/show', formData)

export const benefitPackageModifyRequest = (formData: any) =>
	APIClient.post('organization/benefit/store', formData)

// onboarding
export const onboardingListRequest = (formData?: any) => APIClient.get('/organization/onboarding')

export const onboardingModifyRequest = (formData: any) =>
	APIClient.post('/organization/onboarding', formData)

// delete fields
export const settingsDeleteRequest = (deleteObj: DeleteSettingsFields) =>
	APIClient.post('/organization/setting/deleteDynamicFields', deleteObj)
// pipeline stages
export const pipelineStagesListRequest = () => APIClient.get('pipeline_stages')
export const pipelineStagesModifyRequest = (formData: any) =>
	APIClient.post('organization/pipeline-stage/store', formData)

// policy-category
export const policyCategoryListRequest = () => APIClient.get('/document-policy-category/list')
export const policyCategoryAddRequest = (formData: any) =>
	APIClient.post('/document-policy-category/store', formData)
export const policyCategoryModifyRequest = (formData: any) =>
	APIClient.post('/document-policy-category/store', formData)
