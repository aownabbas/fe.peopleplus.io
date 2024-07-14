import { DropdownOption } from 'type/config'
import { Employee } from 'type/employee'

export function generateDropdownOptions(filteredList: Employee[]): DropdownOption[] {
	const activeEmployees = filteredList.filter((em: { status: string }) => em.status === 'active')
	return activeEmployees.map((object: Employee) => ({
		label: `${object.first_name} ${object.last_name}`,
		value: object.uuid,
		photo: object.photo,
		job_title: object.job_title,
	}))
}
