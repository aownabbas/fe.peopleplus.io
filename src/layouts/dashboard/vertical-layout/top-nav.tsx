import type { FC } from 'react'
import { useState } from 'react'

// mui imports
import type { Theme } from '@mui/material/styles/createTheme'
import { alpha } from '@mui/system/colorManipulator'
import { Box, IconButton, Stack, SvgIcon, useMediaQuery } from '@mui/material'
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01'

// local imports
import { AccountButton } from '../account-button'
import { LanguageSwitch } from '../language-switch'
// import { NotificationsButton } from '../notifications-button'
import { SearchButton } from '../search-button'
import { SIDE_NAV_WIDTH, TOP_NAV_HEIGHT } from '@config/index'
import type { sidebarUserProp } from 'type/config'
import { ChatButton } from '@components/chatbox/ChatButton'
import { ChatDrawer } from '@components/chatbox/chat-drawer'
import { getAuth } from '@utils/AuthHelpers'

interface TopNavProps {
	onMobileNavOpen?: () => void
	user: sidebarUserProp
}

interface TopNavProps {
	onMobileNavOpen?: () => void
	user: sidebarUserProp
}

export const TopNav: FC<TopNavProps> = (props) => {
	const authUser = getAuth()

	const { user, onMobileNavOpen, ...other } = props
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
	const [chatDrawerOpen, setChatDrawerOpen] = useState(false)

	const handleChatDrawerOpen = () => {
		setChatDrawerOpen(true)
	}

	const handleChatDrawerClose = () => {
		setChatDrawerOpen(false)
	}

	return (
		<Box
			component="header"
			sx={{
				backgroundColor: '#F2F3F7',
				position: 'sticky',
				left: {
					lg: `${SIDE_NAV_WIDTH}px`,
				},
				top: -1,
				width: {
					lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
				},
				zIndex: (theme) => theme.zIndex.appBar,
			}}
			{...other}
		>
			<Stack
				alignItems="center"
				direction="row"
				justifyContent="space-between"
				spacing={2}
				sx={{
					minHeight: TOP_NAV_HEIGHT,
					px: 2,
				}}
			>
				<Stack
					alignItems="center"
					direction="row"
					spacing={2}
				>
					{!lgUp && (
						<IconButton onClick={onMobileNavOpen}>
							<SvgIcon>
								<Menu01Icon />
							</SvgIcon>
						</IconButton>
					)}
					<SearchButton />
				</Stack>
				<Stack
					alignItems="center"
					direction="row"
					spacing={2}
				>
					{authUser?.user && <ChatButton onClick={handleChatDrawerOpen} />}
					<ChatDrawer
						open={chatDrawerOpen}
						onClose={handleChatDrawerClose}
					/>

					<LanguageSwitch />
					{/* <NotificationsButton /> */}
					<AccountButton user={user} />
				</Stack>
			</Stack>
		</Box>
	)
}
