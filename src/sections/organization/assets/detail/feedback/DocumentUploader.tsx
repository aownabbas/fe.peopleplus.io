import type { FC } from 'react'
import { useCallback, useState } from 'react'

// internationalization
import { tokens } from '@locales/tokens'
import { useTranslation } from 'react-i18next'

// local imports
import type { File } from '@components/file-dropzone'
import { FileDropzone } from '@components/file-dropzone'
import { SHOW_INFO } from '@utils/ToastMessage'
import {
	assetsSelector,
	documentStatusSelector,
	documentUploadAction,
} from '@redux/features/assetsSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import Loading from '@components/Loading'

const DocumentUploader: FC = () => {
	// const { form } = tokens.assets.feedback
	// const { t } = useTranslation()
	const { asset } = useAppSelector(assetsSelector)
	const uploadStatus = useAppSelector(documentStatusSelector)

	const dispatch = useAppDispatch()

	const [files, setFiles] = useState<File[]>([])

	const handleFilesDrop = (newFiles: File[]): void => {
		const isValidSize = newFiles.every((file) => file.size <= 2 * 1024 * 1024)
		if (!isValidSize) {
			SHOW_INFO({ msg: 'File size must not exceed 2 MB' })
			setFiles([])
			return
		}

		const formData = new FormData()
		formData.append('asset_id', String(asset.id))
		newFiles.forEach((file) => {
			formData.append('files[]', file)
		})
		// console.log('formData', formData.getAll('files[]'))
		dispatch(documentUploadAction(formData))
		setFiles((prevFiles) => prevFiles.concat(newFiles))
	}

	const handleFileRemove = useCallback((file: File): void => {
		setFiles((prevFiles) => {
			return prevFiles.filter((_file) => _file.path !== file.path)
		})
	}, [])

	const handleFilesRemoveAll = useCallback((): void => {
		setFiles([])
	}, [])

	if (uploadStatus === 'LOADING') {
		return <Loading />
	}

	return (
		<FileDropzone
			caption="Max file size is 3 MB"
			files={files}
			onDrop={handleFilesDrop}
			onRemove={handleFileRemove}
			onRemoveAll={handleFilesRemoveAll}
		/>
	)
}

export default DocumentUploader
