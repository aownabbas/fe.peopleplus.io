import type { FC } from 'react'
import { useDialog } from '@hooks/use-dialog'

import PersonDetails from './search-dialog'

export const SearchButton: FC = () => {
	const dialog = useDialog()

	return (
		<>
			<PersonDetails />
		</>
	)
}
