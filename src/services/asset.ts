/* eslint-disable prettier/prettier */
import APIClient from '../api/apiClient'
import { AssetRequestParams, AssetDetailParams, NewComment } from '../types/asset'

// assets
export const assetListRequest = (params?: AssetRequestParams) =>
	APIClient.get('/organization/asset/show', { params })

export const nextAssetTagIdRequest = () => APIClient.get('/organization/asset/next-id')

export const assetDocumentDeleteRequest = (uuid: string) =>
	APIClient.delete(`organization/asset/delete-document/${uuid}`)

export const deleteAssetRequest = (uuid: string) =>
	APIClient.delete(`organization/asset/delete/${uuid}`)

export const saveAssetRequest = (data: FormData) =>
	APIClient.post('/organization/asset/store', data)

export const getAssetRequest = (params: AssetDetailParams) =>
	APIClient.get('/organization/asset/asset-details', { params })

// asset category

export const getAssetCategoryRequest = (params?: AssetRequestParams) =>
	APIClient.get('/asset-category/list', { params })

// comment
export const commentPostRequest = (data: NewComment) =>
	APIClient.post('/organization/asset/store-comment', data)

//  document
export const documentUploadRequest = (data: FormData) =>
	APIClient.post('/organization/asset/store-document', data)

export const assetEditRequest = (params: AssetDetailParams) =>
	APIClient.get('/organization/asset/edit', { params })

export const updateAssetRequest = (data: FormData) =>
	APIClient.post(`/organization/asset/update`, data)
