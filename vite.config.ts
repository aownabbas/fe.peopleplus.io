import { defineConfig } from 'vite'
import path from 'node:path'

import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'),
			'@components': path.resolve(__dirname, './src/components'),
			// '@types': path.resolve(__dirname, './src/types'),
			'@redux': path.resolve(__dirname, './src/Redux'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@config': path.resolve(__dirname, './src/config'),
			'@sections': path.resolve(__dirname, './src/sections'),
			'@icons': path.resolve(__dirname, './src/icons'),
			'@contexts': path.resolve(__dirname, './src/contexts'),
			'@layouts': path.resolve(__dirname, './src/layouts'),
			'@locales': path.resolve(__dirname, './src/locales'),
			'@theme': path.resolve(__dirname, './src/theme'),
			'@service': path.resolve(__dirname, './src/services'),
			'@data': path.resolve(__dirname, './src/data'),
			'@loading': path.resolve(__dirname, './src/loading'),
			type: path.resolve(__dirname, './src/types'),
		},
	},
	// server: {
	//   port: 3000,
	// },
	preview: {
		port: 3000,
	},
})
