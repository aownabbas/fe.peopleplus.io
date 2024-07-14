import { SHOW_ERROR } from './ToastMessage'
import { storage } from './storage'

export interface AuthModel {
	access_token: string
	refresh_token?: string
	user: any
}

// constant
export const AUTH_LOCAL_STORAGE_NAME = 'PP_AUTH_TOKEN'

const getAuth = (): AuthModel | undefined => {
	if (!localStorage) {
		return
	}

	const lsValue: string | undefined = storage.get(AUTH_LOCAL_STORAGE_NAME)
	if (!lsValue) {
		return
	}

	try {
		const auth: any = lsValue
		if (auth) {
			return auth
		}
	} catch (error) {
		console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
	}
}
const setAuth = (auth: AuthModel) => {
	try {
		const lsValue = {
			access_token: auth?.access_token,
			refresh_token: auth?.refresh_token,
			user: auth?.user,
		}
		storage.set(AUTH_LOCAL_STORAGE_NAME, lsValue)
	} catch (error) {
		console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
	}
}

const removeAuth = () => {
	try {
		storage.remove(AUTH_LOCAL_STORAGE_NAME)
	} catch (error) {
		console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
	}
}

const SHOW_AUTH_ERROR = (formErrors: Record<string, string[]>) => {
	SHOW_ERROR({
		state: formErrors.type[1] == '422' ? true : false,
		msg: formErrors._error[0],
	})
}

export { getAuth, setAuth, removeAuth, SHOW_AUTH_ERROR }
