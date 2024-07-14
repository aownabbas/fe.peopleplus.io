/* eslint-disable prettier/prettier */

import { gptConfig } from '@config/index'
import axios from 'axios'
import { SHOW_ERROR } from '@utils/ToastMessage'

export const aiAssessmentOnUserData = async (
	detail: object,
	employeeAssets: object,
	documents: object,
	completedOnboardingList: object,
	query: string,
) => {
	try {
		const result = await axios.post(
			gptConfig.apiUrl,
			{
				model: 'gpt-4o',
				messages: [
					{ role: 'system', content: 'You are a helpful assistant.' },
					{ role: 'user', content: `Employee Detail: ${JSON.stringify(detail)}` },
					{ role: 'user', content: `Employee Assets: ${JSON.stringify(employeeAssets)}` },
					{ role: 'user', content: `Employee Documents: ${JSON.stringify(documents)}` },
					{
						role: 'user',
						content: `Employee Onboarding detail: ${JSON.stringify(completedOnboardingList)}`,
					},
					{ role: 'user', content: `Query: ${query}` },
				],
			},
			{
				headers: {
					Authorization: `Bearer ${gptConfig.apiKey}`,
					'Content-Type': 'application/json',
				},
			},
		)

		if (result.status === 200) {
			return result.data.choices[0].message.content
		}
	} catch (error) {
		console.error('Error communicating with the API', error)
		SHOW_ERROR({ msg: 'Error communicating with the API' })
	} finally {
		// setLoading(false)
	}
}
