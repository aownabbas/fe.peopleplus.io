import { AxiosError } from 'axios'

export interface ValidationErrors {
	errors: Record<string, string[]>
}

interface ValidationError {
	error: string
}

export const formateErrors = (error: AxiosError): Record<string, string[]> => {
	if (error.response && error.response.status === 422) {
		const validationErrorData = error.response.data as ValidationErrors
		if (validationErrorData && validationErrorData.errors) {
			// const test = {
			//     first_name: ['The first name field is required.'],
			//     last_name: ['The last name field is required.'],
			//     organization_name: ['The organization name field is required.'],
			//     email: ['The email field is required.'],
			//     password: ['The password field is required.'],
			// };

			return validationErrorData.errors
		}
		const validationSingleErrorData = error.response.data as ValidationError

		if (validationSingleErrorData && validationSingleErrorData.error) {
			return {
				_error: [validationSingleErrorData.error],
				type: [String(error?.response?.status)],
			}
		}
	}
	// Return a generic error if the response is not a validation error
	return { _error: ['An unexpected error occurred.'], type: [String(error?.response?.status)] }
}

// import { AxiosError, AxiosResponse } from 'axios';
// import { SHOW_ERROR } from './ToastMessage';

// export const makeResponseError = (response: any) => {
//     const { code, success, message, data } = response;
//     if (!success && code === 400) {
//         if (data) {
//             if (data.username) {
//                 SHOW_ERROR(true, Object.entries(data)[0][1][0]);
//             } else if (data.error) {
//                 SHOW_ERROR(true, data.error);
//             } else if (data.message) {
//                 SHOW_ERROR(true, Object.entries(data)[0][1][0]);
//             } else {
//                 SHOW_ERROR(true, message);
//             }
//         } else {
//             if (response.error) {
//                 SHOW_ERROR(true, 'Login credentials is incorrect');
//             } else {
//                 SHOW_ERROR(true, message);
//             }
//         }
//     } else if (!success && code === 422) {
//         SHOW_ERROR(true, Object.entries(data)[0][1][0]);
//     } else {
//         SHOW_ERROR(true, ERROR_MESS);
//     }
//     return {
//         success,
//         data: {},
//         code,
//     };
// };
