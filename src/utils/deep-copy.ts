// eslint-disable-next-line consistent-return
export function deepCopy(obj: any): any {
	if (typeof obj !== 'object' || obj === null) {
		return obj
	}

	if (obj instanceof Date) {
		return new Date(obj.getTime())
	}

	if (obj instanceof Array) {
		return obj.reduce((arr, item, index) => {
			arr[index] = deepCopy(item)
			return arr
		}, [])
	}

	if (obj instanceof Object) {
		return Object.keys(obj).reduce((newObj: any, key) => {
			newObj[key] = deepCopy(obj[key])
			return newObj
		}, {})
	}
}
