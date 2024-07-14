import { useContext } from 'react'

import { FormContext } from '@contexts/onboarding'

export const useAccordionFrom = () => useContext(FormContext)
