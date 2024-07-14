export const storage = {
	set: <T>(key: string, value: T) => {
		if (!localStorage) {
			return
		}
		try {
			const lsValue = JSON.stringify(value)
			localStorage.setItem(key, lsValue)
		} catch (error) {
			console.error('LOCAL STORAGE SAVE ERROR', error)
			return
		}
	},
	get: <T>(key: string) => {
		if (!localStorage) {
			return
		}
		const lsValue: string | null = localStorage.getItem(key)
		if (!lsValue) {
			return
		}
		try {
			const value: T = JSON.parse(lsValue)
			if (value) {
				return value as T
			}
		} catch (error) {
			console.error('LOCAL STORAGE PARSE ERROR', error)
		}
	},
	remove: (key: string) => {
		if (!localStorage) {
			return
		}
		try {
			localStorage.removeItem(key)
		} catch (error) {
			console.error('LOCAL STORAGE REMOVE ERROR', error)
		}
	},
}
