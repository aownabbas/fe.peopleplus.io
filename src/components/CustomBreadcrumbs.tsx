import React from 'react'
import { Breadcrumbs, Typography, Link, TypographyProps, Tooltip } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { color, createTheme } from '@mui/system'

import type { BreadcrumbLink } from 'type/config'

import { useTranslation } from 'react-i18next'

interface CustomBreadcrumbsProps {
	links: BreadcrumbLink[]
	typographyProps?: TypographyProps
}

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)',
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const CustomBreadcrumbs: React.FC<CustomBreadcrumbsProps> = ({ links, typographyProps }) => {
	const { t } = useTranslation()
	return (
		<Breadcrumbs
			separator="/"
			sx={{ mt: '6px' }}
		>
			{links.map((link, index) => {
				const linkColor = link.color ? link.color : 'transparent' // Determine link color

				return link.url ? (
					<Link
						component={RouterLink}
						to={link.url}
						style={{
							textDecoration: 'none',
							background: theme.palette.background.default,
							color: linkColor,
							WebkitBackgroundClip: 'text',
							fontWeight: 500,
							fontSize: 14,
						}}
					>
						{t(link.label)}
					</Link>
				) : (
					<Tooltip title={t(link.label)}>
						<Typography
							sx={{
								color: '#6C737F',
								fontWeight: '500',
								fontSize: '14px',
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: '160px',
								textOverflow: 'ellipsis',
							}}
						>
							{t(link.label)}
						</Typography>
					</Tooltip>
				)
			})}
		</Breadcrumbs>
	)
}

export default CustomBreadcrumbs
