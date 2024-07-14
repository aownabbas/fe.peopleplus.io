/* eslint-disable prettier/prettier */
import type { FC } from 'react'

type Extension = 'jpeg' | 'jpg' | 'pdf' | 'png' | string

const icons: Record<Extension, any> = {
	jpeg: '/icon-jpg.svg',
	jpg: '/icon-jpg.svg',
	// mp4: '/assets/icons/icon-mp4.svg',
	// pdf: '/assets/icons/icon-pdf.svg',
	png: '/icon-png.svg',
	svg: '/icon-svg.svg',
}

interface FileIconProps {
	extension?: Extension | null
}

export const FileIcon: FC<FileIconProps> = (props) => {
	const { extension } = props

	let icon: string

	if (!extension) {
		icon = '/assets/icons/icon-other.svg'
	} else {
		icon = icons[extension] || '/assets/icons/icon-other.svg'
	}

	return <img src={icon} />
}

// FileIcon.propTypes = {
// 	extension: PropTypes.string,
// }
