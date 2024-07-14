import type { FC } from 'react'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'

// mui imports
import { Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material'

// internationalization
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { Language } from 'type/config'
import { languageOptions } from '@config/index'
import { useSettings } from '@hooks/use-settings'
import { Direction } from '@theme/index'

interface LanguagePopoverProps {
	anchorEl: null | Element
	onClose?: () => void
	open?: boolean
}

export const LanguagePopover: FC<LanguagePopoverProps> = (props) => {
	const { anchorEl, onClose, open = false, ...other } = props
	const { i18n, t } = useTranslation()
	const { handleUpdate } = useSettings()

	const handleChange = useCallback(
		async (language: Language, direction: Direction): Promise<void> => {
			onClose?.()
			await i18n.changeLanguage(language)
			handleUpdate({ direction })
			// console.log('language :', language)
			const message = t(tokens.common.languageChanged) as string
			toast.success(message)
		},
		[onClose, i18n, t],
	)

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: 'right',
				vertical: 'bottom',
			}}
			disableScrollLock
			transformOrigin={{
				horizontal: 'right',
				vertical: 'top',
			}}
			onClose={onClose}
			open={open}
			PaperProps={{ sx: { width: 220 } }}
			{...other}
		>
			{(Object.keys(languageOptions) as Language[]).map((language) => {
				const { direction, icon, label } = languageOptions[language]

				return (
					<MenuItem
						onClick={() => handleChange(language, direction)}
						key={language}
					>
						<ListItemIcon>
							<Box
								sx={{
									width: 28,
									'& img': {
										width: '100%',
									},
								}}
							>
								<img
									alt={label}
									src={icon}
								/>
							</Box>
						</ListItemIcon>
						<ListItemText primary={<Typography variant="subtitle2">{label}</Typography>} />
					</MenuItem>
				)
			})}
		</Popover>
	)
}
