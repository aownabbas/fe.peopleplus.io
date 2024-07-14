export function a11yProps(idPrefix: string) {
	return (index: number) => {
		return {
			id: `${idPrefix}-tab-${index}`,
			'aria-controls': `${idPrefix}-${index}`,
		}
	}
}

export function myTimeZone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone
}
export function giveMeManag<T extends Record<PropertyKey, any>>(
	takeEnum: T,
): Array<{ label: string; value: any }> {
	return Object.entries(takeEnum)
		.filter(([key]) => isNaN(Number(key)))
		.map(([key, value]) => ({
			label: key,
			value: value,
		}))
}
