import type { PaletteColor } from '@mui/material/styles/createPalette'

import type { ColorPreset } from '.'
import { blue, customColor } from './colors'

export const getPrimary = (preset?: ColorPreset): PaletteColor => {
	switch (preset) {
		case 'customColor':
			return blue
		default:
			console.error('Invalid color preset, accepted values: "blue" or "customColor"".')
			return blue
	}
}
