import type { FC, ReactNode } from 'react'
import { useCallback, useState, useMemo } from 'react'

import {
	ConfirmationContext,
	defaultModalConfig,
	ConfirmationModalConfig,
} from './confirmation-context'

interface ConfirmationProviderProps {
	children?: ReactNode
}

export const ConfirmationProvider: FC<ConfirmationProviderProps> = ({ children }) => {
	const [modalConfig, setModalConfig] = useState<ConfirmationModalConfig>(defaultModalConfig)

	const openModal = useCallback((message: string, onConfirm: () => void, onCancel: () => void) => {
		setModalConfig({
			isOpen: true,
			message,
			onConfirm,
			onCancel,
		})
	}, [])

	const closeModal = useCallback(() => {
		setModalConfig(defaultModalConfig)
	}, [])

	const value = useMemo(
		() => ({
			...modalConfig,
			openModal,
			closeModal,
		}),
		[modalConfig, openModal, closeModal],
	)

	return <ConfirmationContext.Provider value={value}>{children}</ConfirmationContext.Provider>
}
