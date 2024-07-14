// FormContext.tsx
import { ReactNode } from 'react'
import { FormContext } from './OnboardingContext'
import { UseFormReturn } from 'react-hook-form'
import { OnboardingListValues } from 'type/settings'

interface FromProviderProps {
	children?: ReactNode
	state: {
		list: any[]
		removeItem: (index: number) => void
		useForm: UseFormReturn<OnboardingListValues>
	}
}

export const FormProvider = ({ children, state }: FromProviderProps) => {
	const fromSate = { formList: state.list, removeItem: state.removeItem, useForm: state.useForm }
	return <FormContext.Provider value={fromSate}>{children}</FormContext.Provider>
}
