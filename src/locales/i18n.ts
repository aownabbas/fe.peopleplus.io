/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en } from './translations/en'
import { de } from './translations/de'
import { es } from './translations/es'
import { ar } from './translations/ar'

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		de: { translation: de },
		es: { translation: es },
		ar: { translation: ar },
	},
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
})
