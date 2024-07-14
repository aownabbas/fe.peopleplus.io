// @mui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import { getAuth } from '@utils/AuthHelpers'
// local imports
import { SettingsConsumer, SettingsProvider } from './contexts/settings'
import { createTheme } from './theme'
import { RTL } from '@components/rtl'
import { Toaster } from '@components/toaster'
import { useNprogress } from '@hooks/use-nprogress'

//styles
import './global.css'
import '@locales/i18n'
// import { SettingsButton } from '@components/settings/ChatButton'
// import { SettingsDrawer } from '@components/settings/settings-drawer'

const App = () => {
	const authUser = getAuth()

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<SettingsProvider>
				<SettingsConsumer>
					{(settings) => {
						// console.log('settings: ', settings);
						// Prevent theme flicker when restoring custom settings from browser storage
						if (!settings.isInitialized) {
							console.error('something went wrong with theme')
							return null
						}
						const theme = createTheme({
							colorPreset: settings.colorPreset,
							contrast: settings.contrast,
							direction: settings.direction,
							paletteMode: settings.paletteMode,
							responsiveFontSizes: settings.responsiveFontSizes,
						})

						return (
							<ThemeProvider theme={theme}>
								<Helmet>
									<meta
										name="color-scheme"
										content={settings.paletteMode}
									/>
									<meta
										name="theme-color"
										content={theme.palette.neutral[900]}
									/>
								</Helmet>
								{/* <SettingsButton /> */}
								<RTL direction={settings.direction}>
									<CssBaseline />
									{/* {!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? (
										<>
										<SettingsButton onClick={settings.handleDrawerOpen} />
											<SettingsDrawer
												canReset={settings.isCustom}
												onClose={settings.handleDrawerClose}
												onReset={settings.handleReset}
												onUpdate={settings.handleUpdate}
												open={settings.openDrawer}
												values={{
													colorPreset: settings.colorPreset,
													contrast: settings.contrast,
													direction: settings.direction,
													paletteMode: settings.paletteMode,
													responsiveFontSizes: settings.responsiveFontSizes,
													stretch: settings.stretch,
													layout: settings.layout,
													navColor: settings.navColor,
												}}
											/>
										</>
									) : null} */}
									<Outlet />
									<Toaster />
								</RTL>
							</ThemeProvider>
						)
					}}
				</SettingsConsumer>
			</SettingsProvider>
		</LocalizationProvider>
	)
}

export default App
