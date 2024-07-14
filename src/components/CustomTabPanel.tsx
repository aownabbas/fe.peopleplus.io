import React, { FC } from 'react'

interface CustomTabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
	style?: any
}

const CustomTabPanel: FC<CustomTabPanelProps> = (props) => {
	const { children, style, value, index, ...other } = props
	return (
		<div
			style={style}
			role="tabpanel"
			hidden={value !== index}
			id={`modal-${index}`}
			aria-labelledby={`modal-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	)
}

export default CustomTabPanel
