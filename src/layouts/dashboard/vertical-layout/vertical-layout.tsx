import type { FC, ReactNode } from 'react'

import useMediaQuery from '@mui/material/useMediaQuery'
import type { Theme } from '@mui/material/styles/createTheme'
import { styled } from '@mui/material/styles'

import type { NavColor } from 'type/settings'

import type { Section } from '@config/sidebar'
import { MobileNav } from '../mobile-nav'
import { SideNav } from './side-nav'
import { TopNav } from './top-nav'
import { useMobileNav } from './use-mobile-nav'
import { sidebarUserProp } from 'type/config'

const SIDE_NAV_WIDTH = 280

const VerticalLayoutRoot = styled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	maxWidth: '100%',
	[theme.breakpoints.up('lg')]: { paddingLeft: SIDE_NAV_WIDTH },
}))

const VerticalLayoutContainer = styled('div')({
	display: 'flex',
	flex: '1 1 auto',
	flexDirection: 'column',
	width: '100%',
	backgroundColor: '#f2f3f7',
})

interface VerticalLayoutProps {
	children?: ReactNode
	navColor?: NavColor
	sections?: Section[]
	user: sidebarUserProp
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
	const { user, children, sections, navColor } = props
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
	const mobileNav = useMobileNav()

	return (
		<>
			<TopNav
				onMobileNavOpen={mobileNav.handleOpen}
				user={user}
			/>
			{lgUp && (
				<SideNav
					color={navColor}
					sections={sections}
				/>
			)}
			{!lgUp && (
				<MobileNav
					color={navColor}
					onClose={mobileNav.handleClose}
					open={mobileNav.open}
					sections={sections}
				/>
			)}
			<VerticalLayoutRoot>
				<VerticalLayoutContainer>{children}</VerticalLayoutContainer>
			</VerticalLayoutRoot>
		</>
	)
}
