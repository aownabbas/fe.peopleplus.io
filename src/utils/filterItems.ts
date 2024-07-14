// utils.ts
import type { Employee } from 'type/employee'
export const filterItems = (
	items: Employee[],
	searchValue: string,
	specificObjectUUID: string | null = null,
): Employee[] => {
	const currentEmployees = specificObjectUUID
		? items.find((em) => em.uuid === specificObjectUUID)
		: null

	return items.filter((item) => {
		const filterLower = searchValue.toLowerCase()
		const firstNameLower = item.first_name.toLowerCase()
		const lastNameLower = item.last_name.toLowerCase()
		const fullNameLower = `${firstNameLower} ${lastNameLower}`
		const matchesSearch = fullNameLower.toLowerCase().includes(filterLower)

		const excludeCondition = currentEmployees
			? item.uuid !== currentEmployees.uuid && item.parent_id !== currentEmployees.id
			: true

		return matchesSearch && excludeCondition
	})
}

export const limitItems = (items: Employee[], limit: number): Employee[] => {
	return items.slice(0, limit)
}
