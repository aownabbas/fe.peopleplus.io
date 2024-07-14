import type { FC } from 'react'
import { useMemo } from 'react'

import type { NavColor } from 'type/settings'
import type { Section } from '@config/sidebar'

// @mui
import { Box, Drawer, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// local import
import { RouterLink } from '@components/router-link'
import { Scrollbar } from '@components/scrollbar'
import { usePathname } from '@hooks/use-pathname'

// import { TenantSwitch } from '../tenant-switch';
import { SideNavSection } from './side-nav-section'

const SIDE_NAV_WIDTH = 280

const useCssVars = (color: NavColor): Record<string, string> | object => {
	const theme = useTheme()

	return useMemo(() => {
		if (color === 'evident') {
			return {
				'--nav-bg': '#F2F3F7',
				'--nav-color': theme.palette.common.white,
				'--nav-border-color': 'transparent',
				'--nav-logo-border': theme.palette.neutral[700],
				'--nav-section-title-color': theme.palette.neutral[400],
				'--nav-item-color': theme.palette.neutral[400],
				'--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
				'--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
				'--nav-item-active-color': 'black',
				'--nav-item-disabled-color': theme.palette.neutral[500],
				'--nav-item-icon-color': theme.palette.neutral[400],
				'--nav-item-icon-active-color': theme.palette.primary.main,
				'--nav-item-icon-disabled-color': theme.palette.neutral[500],
				'--nav-item-chevron-color': theme.palette.neutral[600],
				'--nav-scrollbar-color': theme.palette.neutral[400],
			}
		} else {
			// Return an empty object if color is not 'evident'
			return {}
		}
	}, [theme, color])
}

interface SideNavProps {
	color?: NavColor
	sections?: Section[]
}

export const SideNav: FC<SideNavProps> = (props) => {
	const { color = 'evident', sections = [] } = props
	const pathname = usePathname()
	const cssVars = useCssVars(color)

	return (
		<Drawer
			anchor="left"
			open
			PaperProps={{
				sx: {
					...cssVars,
					backgroundColor: 'var(--nav-bg)',
					borderRightColor: 'var(--nav-border-color)',
					borderRightStyle: 'solid',
					borderRightWidth: 1,
					color: 'var(--nav-color)',
					width: SIDE_NAV_WIDTH,
				},
			}}
			variant="permanent"
		>
			<Scrollbar
				sx={{
					height: '100%',
					'& .simplebar-content': {
						height: '100%',
					},
					'& .simplebar-scrollbar:before': {
						background: 'var(--nav-scrollbar-color)',
					},
				}}
			>
				<Stack sx={{ height: '100%' }}>
					<Stack
						alignItems="center"
						direction="row"
						spacing={2}
						sx={{ p: 3, pt: 0 }}
					>
						<Box
							component={RouterLink}
							href={'/'}
							sx={{
								borderColor: 'var(--nav-logo-border)',
								borderRadius: 1,
								borderStyle: 'none', // Remove the border style
								display: 'flex',
								height: 40,
								boxShadow: 'none', // Remove the drop shadow
							}}
						>
							<img
								style={{
									width: 165,
									height: 60,
								}}
								src="/people-plus-logo.png"
								alt=""
							/>
						</Box>
					</Stack>
					<Stack
						component="nav"
						spacing={2}
						sx={{
							flexGrow: 1,
							px: 2,
						}}
					>
						{sections.map((section, index) => (
							<SideNavSection
								items={section.items}
								key={index}
								pathname={pathname}
								subheader={section.subheader}
							/>
						))}
					</Stack>
				</Stack>
			</Scrollbar>
		</Drawer>
	)
}
