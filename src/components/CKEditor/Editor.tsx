import React, { useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledDocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import { FormControl, FormHelperText } from '@mui/material'
import { useFormContext, Controller, FieldError } from 'react-hook-form'
import { uploadFile } from '@service/aws'
import { useTranslation } from 'react-i18next'
import { isImageSizeLessThan3MB } from '@service/checkImageSize'
import { SHOW_ERROR } from '@utils/ToastMessage'

type EditorProps = {
	placeholder: string
	defaultValue?: string
	name: string
	rules?: Record<string, any> // Adjust according to your specific validation rules
	height?: string
}

interface Loader {
	file: Promise<File>
}

interface UploadAdapter {
	upload(): Promise<{ default: string }>
	abort(): void
}

const Editor: React.FC<EditorProps> = ({ defaultValue, placeholder, name, rules, height }) => {
	const toolBarRef = useRef<HTMLDivElement | null>(null)
	const { t } = useTranslation()
	const { control } = useFormContext()

	function CustomUploadAdapter(loader: Loader): UploadAdapter {
		return {
			upload() {
				return loader.file.then(
					(file) =>
						new Promise((resolve, reject) => {
							const reader = new FileReader()

							reader.onload = async () => {
								try {
									const isValidSize = await isImageSizeLessThan3MB(file)

									if (!isValidSize) {
										SHOW_ERROR({ msg: 'Image size is greater than 3MB' })
										reject()
										return
									}
									// If size is valid, you can proceed with further logic
									const url = await uploadFile(file)
									resolve({ default: url })
								} catch (error) {
									reject(error)
								}
							}

							reader.onerror = (error) => {
								reader.abort()
								reject(new Error(`Error reading file: ${error}`))
							}

							if (file instanceof Blob) {
								reader.readAsDataURL(file)
							} else {
								reject(new Error('Loaded file is not a blob.'))
							}
						}),
				)
			},
			abort() {
				console.log('File reading was aborted.')
			},
		}
	}
	// @ts-ignore
	function MyCustomUploadAdapterPlugin(editor) {
		editor.plugins.get('FileRepository').createUploadAdapter = (loader: Loader) => {
			return CustomUploadAdapter(loader)
		}
	}

	const editorConfig = {
		extraPlugins: [MyCustomUploadAdapterPlugin],
		placeholder,
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'heading',
				'|',
				'fontfamily',
				'fontsize',
				'fontColor',
				'fontBackgroundColor',
				'|',
				'bold',
				'italic',
				'strikethrough',
				'subscript',
				'superscript',
				'code',
				'|',
				'link',
				'uploadImage',
				'blockQuote',
				'codeBlock',
				'|',
				'alignment',
				'|',
				'bulletedList',
				'numberedList',
				'todoList',
				'outdent',
				'indent',
			],
			shouldNotGroupWhenFull: true,
		},
	}

	if (height) {
		// @ts-ignore
		editorConfig.height = height
	}

	return (
		<Controller
			control={control}
			name={name}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field, fieldState: { error } }) => (
				<FormControl
					fullWidth
					sx={{ border: '1px solid #e5e7eb', borderRadius: '8px' }}
					error={!!error}
				>
					<div ref={toolBarRef} />
					<CKEditor
						onReady={(editor) => {
							// @ts-ignore
							if (toolBarRef.current && editor.ui.view.toolbar.element) {
								toolBarRef.current.innerHTML = ''
								// @ts-ignore
								toolBarRef.current.appendChild(editor.ui.view.toolbar.element as Node)
							}
						}}
						// @ts-ignore
						editor={DecoupledDocumentEditor}
						data={field.value}
						config={editorConfig}
						onChange={(_, editor) => {
							const data = editor.getData()
							field.onChange(data)
						}}
					/>

					<FormHelperText>{(error as FieldError)?.message}</FormHelperText>
				</FormControl>
			)}
		/>
	)
}

export default Editor
