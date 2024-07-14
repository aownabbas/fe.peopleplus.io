export const isImageSizeLessThan3MB = async (file: any) => {
	try {
		if (!file || !file.type.startsWith('image/')) {
			return false
		}

		// 3MB in bytes
		const MAX_SIZE_IN_BYTES = 3 * 1024 * 1024

		return file.size < MAX_SIZE_IN_BYTES
	} catch (error) {
		console.error('Error checking image size:', error)
		return false
	}
}
