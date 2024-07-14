import type { FC } from 'react'

// mui  imports
import User01Icon from '@untitled-ui/icons-react/build/esm/User01'
import { Avatar, Box, ButtonBase, SvgIcon } from '@mui/material'

// local imports
import { usePopover } from '@hooks/use-popover'
import { AccountPopover } from './account-popover'
import type { sidebarUserProp } from 'type/config'

export const AccountButton: FC<{ user: sidebarUserProp }> = ({ user }) => {
	const popover = usePopover<HTMLButtonElement>()

	return (
		<>
			<Box
				component={ButtonBase}
				onClick={popover.handleOpen}
				ref={popover.anchorRef}
				sx={{
					alignItems: 'center',
					display: 'flex',
					borderWidth: 2,
					borderStyle: 'solid',
					borderColor: 'divider',
					height: 40,
					width: 40,
					borderRadius: '50%',
				}}
			>
				<Avatar
					sx={{
						height: 35,
						width: 35,
					}}
					src={user.photo}
					alt="user_logo"
				>
					<SvgIcon>
						<User01Icon />
					</SvgIcon>
				</Avatar>
			</Box>
			<AccountPopover
				anchorEl={popover.anchorRef.current}
				onClose={popover.handleClose}
				open={popover.open}
				user={user}
			/>
		</>
	)
}
