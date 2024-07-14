import { createContext } from 'react'

export interface FormContextType {
	formList: any[]
	removeItem: (index: number) => void
	useForm: any
}

export const FormContext = createContext<FormContextType>({
	formList: [],
	removeItem: () => {},
	useForm: {},
})
