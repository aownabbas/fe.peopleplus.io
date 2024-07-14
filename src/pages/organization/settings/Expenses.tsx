// mui imports
import { Box, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'

const Expenses = () => {
	const { t } = useTranslation()

	return (
		<Box>
			<Typography>Expenses Expenses</Typography>
		</Box>
	)
}

export default Expenses
