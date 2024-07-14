// mui imports
import { Box, Typography } from '@mui/material'

import { useTranslation } from 'react-i18next'

const Localization = () => {
	const { t } = useTranslation()

	return (
		<Box>
			<Typography>Localization Localization</Typography>
		</Box>
	)
}

export default Localization
