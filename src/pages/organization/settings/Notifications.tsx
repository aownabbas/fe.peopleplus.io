// mui imports
import { Box, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'

const Notifications = () => {
	const { t } = useTranslation()

	return (
		<Box>
			<Typography>Notifications Notifications</Typography>
		</Box>
	)
}

export default Notifications
