function* getId() {
	let id = 0
	while (true) {
		yield id++
	}
}

const itId = getId()

export const check = {
	success: <T>(data: T) => console.log('%c' + data, 'color:green'),
	fail: <T>(data: T) => console.log('%c' + data, 'color:lightRed'),
	test: <T>(data: T) => console.log('%c' + data, 'color:lime'),
}

const checkPoint = (str: string) => check.test(str + 'check')
export { checkPoint }

export function camelize(text: string) {
	return text.replace(/\b[a-z]/g, (m) => m.toUpperCase())
}

export function isEmpty(obj: any) {
	return Object.keys(obj).length === 0
}
