import { configureStore } from '@reduxjs/toolkit'
// local imports
import rootReducer from './features/rootReducer'

// store configuration
export const generateStore = () =>
	configureStore({
		reducer: rootReducer,
		devTools: import.meta.env.NODE_ENV !== 'production',
	})

// types
export type AppStore = ReturnType<typeof generateStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
