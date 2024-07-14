interface Document {
	uuid: string
}

const updateSpecificObject = (state: Document[], objectId: any, newObject: any) => {
	const documentIndex = state.findIndex((item) => item.uuid === objectId)
	console.log('documentIndex', documentIndex)
	if (documentIndex !== -1) {
		const updatedDocuments = [...state]
		updatedDocuments[documentIndex] = { ...updatedDocuments[documentIndex], ...newObject }
		return updatedDocuments
	}
}
export { updateSpecificObject }
