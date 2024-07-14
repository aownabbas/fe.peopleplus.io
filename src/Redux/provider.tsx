import { Provider } from 'react-redux'
import { generateStore } from './store'

interface Props {
	children: React.ReactNode
}

export default function ReduxProvider({ children }: Props) {
	return <Provider store={generateStore()}>{children}</Provider>
}
