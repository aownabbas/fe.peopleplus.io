interface FileValidationResult {
	isValid: boolean
	error?: string
}

const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024 // 3MB in bytes

const validateFile = (file: File | File[]): FileValidationResult => {
	if (!file) {
		return { isValid: false, error: 'File is required.' }
	}

	const filesToValidate = Array.isArray(file) ? file : [file]

	for (const singleFile of filesToValidate) {
		if (!singleFile) {
			return { isValid: false, error: 'Invalid file provided.' }
		}

		if (singleFile.size > MAX_FILE_SIZE_BYTES) {
			return {
				isValid: false,
				error: `File '${singleFile.name}' size exceeds the maximum allowed limit (3MB).`,
			}
		}
	}

	return { isValid: true }
}

export default validateFile
