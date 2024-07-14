import axios, { Method } from 'axios'
import { handleError } from './handleError'

export const makeRequest = async (
	method: Method,
	url: string,
	data?: any,
	headers?: any,
	responseType?: any,
): Promise<any> => {
	try {
		const response = await axios({
			method: method,
			url: url,
			data: data,
			headers: headers,
			responseType: responseType,
		})
		return response.data
	} catch (error) {
		handleError(error, 'Error with API call')
		return null
	}
}
