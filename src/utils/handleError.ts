import { SHOW_ERROR } from './ToastMessage'

export const handleError = (error: any, defaultMessage: string) => {
	if (error.response && error.response.data && error.response.data.message) {
		const errorMsg = error.response.data.message
		if (errorMsg === 'invalid_api_key') {
			SHOW_ERROR({ msg: 'Invalid API key provided. Please check your configuration.' })
		} else {
			SHOW_ERROR({ msg: `${defaultMessage}: ${errorMsg}` })
		}
	} else {
		SHOW_ERROR({ msg: `${defaultMessage}: ${error.message}` })
	}
}
