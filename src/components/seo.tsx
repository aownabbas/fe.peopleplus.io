import type { FC } from 'react'
import { Helmet } from 'react-helmet-async'

interface SeoProps {
	title?: string
}

export const Seo: FC<SeoProps> = (props) => {
	const { title } = props

	const fullTitle = title ? title + ' | PeoplePlus' : 'PeoplePlus'

	return (
		<Helmet>
			<title>{fullTitle}</title>
		</Helmet>
	)
}
