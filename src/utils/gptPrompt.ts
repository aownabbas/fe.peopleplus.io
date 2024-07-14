function gptPrompt(resumeText: string, jobTitle: string, jobDescription: string): string {
	return `
      Attached is an extract from the resume submitted by the candidate. The job post this is submitted against is as follows:
      #${jobTitle}
      ${jobDescription}
  
      Please thoroughly review the attached resume and evaluate whether this candidate is a suitable fit for the specified position. Return the response in HTML format with the following objects:
      Rating (out of 5)
      Initial Assessment
      Possible Issues
  
      The response MUST follow this format:
      

      <div>
  <p><strong>Rating:</strong> 5</p>
  <p><strong>Initial Assessment:</strong> ASSESSMENT HERE</p>
  <p><strong>Possible Issues:</strong> ISSUES HERE</p>
       </div>

  
      Keep the answers concise and base your assessment solely on the contents of the resume. Do not include any information that is not explicitly mentioned in the resume.
  
      Resume Extract:
      ${resumeText}
    `
}

function candidateResumeAssessmentPrompt(
	resumeText: string,
	jobTitle: string,
	jobDescription: string,
) {
	const userPrompts = [
		{ role: 'system', content: 'You are a helpful assistant.' },
		{ role: 'user', content: `Query: ${gptPrompt(resumeText, jobTitle, jobDescription)}` },
	]
	return userPrompts
}

function chatbotPrompt(assets: any, employees: any, query: string) {
	const userPrompts = [
		{ role: 'system', content: 'You are a helpful assistant.' },
		{ role: 'user', content: `Here is employees list: ${JSON.stringify(employees)}` },
		{ role: 'user', content: `Here is assets list: ${JSON.stringify(assets)}` },
		{ role: 'user', content: `Query: ${query}` },
	]
	return userPrompts
}

export { gptPrompt, chatbotPrompt, candidateResumeAssessmentPrompt }
