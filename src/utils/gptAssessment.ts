import pdfToText from 'react-pdftotext'
import { gptPrompt } from './gptPrompt'
import { handleError } from './handleError'
import { makeRequest } from './axiosHelpers'
import { gptConfig } from '@config/index'

export const fetchResumeFile = async (resumePath: string): Promise<Blob | null> => {
	try {
		const data = await makeRequest('GET', resumePath, undefined, undefined, 'blob')
		return data
	} catch (error) {
		handleError(error, 'Error fetching the resume file')
		return null
	}
}

export const convertPdfToText = async (file: Blob): Promise<string | null> => {
	try {
		return await pdfToText(file)
	} catch (error) {
		handleError(error, 'Error converting PDF to text')
		return null
	}
}

export const gptAssessment = async (prompts: any) => {
	console.log('Prompts', prompts)
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${gptConfig.apiKey}`,
	}

	const data = {
		model: 'gpt-4o',
		messages: prompts,
		max_tokens: 3500,
	}

	const response = await makeRequest('POST', gptConfig.apiUrl, data, headers)
	return response ? response.choices[0].message.content : null
}

export const saveAssessment = async (
	uuid: string,
	content: string,
	candidateGptAssessment: any,
) => {
	try {
		const response = await candidateGptAssessment({ uuid, content })
		return response.data.candidate.resume_html_content
	} catch (error) {
		handleError(error, 'Error with candidateGptAssessment API call')
	}
}
