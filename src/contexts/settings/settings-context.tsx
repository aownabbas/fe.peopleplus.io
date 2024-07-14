import { createContext } from 'react'

import type { Settings } from 'type/settings'

export const defaultSettings: Settings = {
	colorPreset: 'customColor',
	contrast: 'normal',
	direction: 'ltr',
	layout: 'vertical',
	navColor: 'evident',
	paletteMode: 'light',
	responsiveFontSizes: true,
	stretch: false,
}

export interface State extends Settings {
	openDrawer: boolean
	isInitialized: boolean
}

export const initialState: State = {
	...defaultSettings,
	isInitialized: true,
	openDrawer: false,
}

export interface SettingsContextType extends State {
	handleDrawerClose: () => void
	handleDrawerOpen: () => void
	handleReset: () => void
	handleUpdate: (settings: Settings) => void
	isCustom: boolean
}

export const SettingsContext = createContext<SettingsContextType>({
	...initialState,
	handleDrawerClose: () => {},
	handleDrawerOpen: () => {},
	handleReset: () => {},
	handleUpdate: () => {},
	isCustom: false,
})
