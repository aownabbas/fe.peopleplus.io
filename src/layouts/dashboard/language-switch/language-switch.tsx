import type { FC } from 'react'

// mui imports
import { Box, IconButton, Tooltip } from '@mui/material'

// local imports
import { usePopover } from '@hooks/use-popover'
import { LanguagePopover } from './language-popover'

//  internationalization imports
import { useTranslation } from 'react-i18next'
import { languages } from '@config/index'
import { Language } from 'type/config'

export const LanguageSwitch: FC = () => {
	const { i18n } = useTranslation()
	const popover = usePopover<HTMLButtonElement>()

	const flag = languages[i18n.language as Language]

	return (
		<>
			<Tooltip title="Language">
				<IconButton
					onClick={popover.handleOpen}
					ref={popover.anchorRef}
				>
					<Box
						sx={{
							width: 35,
							'& img': {
								width: '100%',
							},
						}}
					>
						<img src={flag} />
					</Box>
				</IconButton>
			</Tooltip>
			<LanguagePopover
				anchorEl={popover.anchorRef.current}
				onClose={popover.handleClose}
				open={popover.open}
			/>
		</>
	)
}
