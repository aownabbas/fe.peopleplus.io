import { createContext } from 'react'

export interface ConfirmationModalConfig {
	isOpen: boolean
	message: string
	onConfirm: () => void
	onCancel: () => void
}

export const defaultModalConfig: ConfirmationModalConfig = {
	isOpen: false,
	message: 'Are you sure you want to Delete this?',
	onConfirm: () => {},
	onCancel: () => {},
}

export interface ConfirmationContextType extends ConfirmationModalConfig {
	openModal: (message: string, onConfirm: () => void, onCancel: () => void) => void
	closeModal: () => void
}

export const ConfirmationContext = createContext<ConfirmationContextType>({
	...defaultModalConfig,
	openModal: () => {},
	closeModal: () => {},
})
