import type { FC } from 'react'
import { useCallback, useEffect } from 'react'

// mui import
import {
	Box,
	Button,
	Divider,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Popover,
	SvgIcon,
	Typography,
	Tooltip,
} from '@mui/material'
import CreditCard01Icon from '@untitled-ui/icons-react/build/esm/CreditCard01'
import User03Icon from '@untitled-ui/icons-react/build/esm/User03'

// local imports
import { RouterLink } from '@components/router-link'
import { useRouter } from '@hooks/use-router'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { logoutAction } from '@redux/features/authSlice'
import { SHOW_ERROR } from '@utils/ToastMessage'
import { sidebarUserProp } from 'type/config'
import { employeeSelector, getEmployeeProfileAction } from '@redux/features/employeeSlice'
import { getAuth } from '@utils/AuthHelpers'

interface AccountPopoverProps {
	anchorEl: null | Element
	onClose?: () => void
	open?: boolean
	user: sidebarUserProp
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
	const dispatch = useAppDispatch()
	const { user, anchorEl, onClose, open, ...other } = props

	const { detail }: any = useAppSelector(employeeSelector)
	useEffect(() => {
		if (authUser?.user.type === 'employee') {
			dispatch(getEmployeeProfileAction())
		}
	}, [])

	const authUser = getAuth()
	const router = useRouter()

	const handleLogout = useCallback(async (): Promise<void> => {
		try {
			onClose?.()
			dispatch(logoutAction()).then(({ type }) => {
				if (type === 'Auth/logout/fulfilled') {
					// console.log('logout action : ', type)
					router.push('/auth/login', { replace: true })
				}
			})
		} catch (err) {
			console.error(err)
			SHOW_ERROR({ msg: 'Something went wrong!' })
		}
	}, [router, onClose])

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: 'center',
				vertical: 'bottom',
			}}
			disableScrollLock
			onClose={onClose}
			open={!!open}
			PaperProps={{ sx: { width: 200 } }}
			{...other}
		>
			<Box sx={{ p: 2 }}>
				{/* <Typography variant="body1">{user.name}</Typography> */}
				<Tooltip title={user.name}>
					<Typography
						sx={{
							color: '#111927',
							fontWeight: 500,
							fontSize: 14,
							textWrap: 'nowrap',
							overflow: 'hidden',
							maxWidth: '200px',
							textOverflow: 'ellipsis',
						}}
					>
						{/* {authUser?.user.type === 'organization'
							?  */}
						{user.name}
						{/* : `${detail?.first_name} ${detail?.last_name}`} */}
					</Typography>
				</Tooltip>
				<Tooltip title={user.email}>
					<Typography
						sx={{
							color: '#111927',
							fontWeight: 400,
							fontSize: 14,
							textWrap: 'nowrap',
							overflow: 'hidden',
							maxWidth: '200px',
							textOverflow: 'ellipsis',
						}}
					>
						{user.email}
					</Typography>
				</Tooltip>
			</Box>
			<Divider />
			<Box sx={{ p: 1 }}>
				<ListItemButton
					component={RouterLink}
					href={authUser?.user.type === 'employee' ? '/profile/preference' : '/settings/general'}
					onClick={onClose}
					sx={{
						borderRadius: 1,
						px: 1,
						py: 0.5,
					}}
				>
					<ListItemIcon>
						<SvgIcon fontSize="small">
							<User03Icon />
						</SvgIcon>
					</ListItemIcon>
					<ListItemText primary={<Typography variant="body1">Profile</Typography>} />
				</ListItemButton>
				<ListItemButton
					component={RouterLink}
					href={'#'}
					onClick={onClose}
					sx={{
						borderRadius: 1,
						px: 1,
						py: 0.5,
					}}
					disabled
				>
					<ListItemIcon>
						<SvgIcon fontSize="small">
							<CreditCard01Icon />
						</SvgIcon>
					</ListItemIcon>
					<ListItemText primary={<Typography variant="body1">Billing</Typography>} />
				</ListItemButton>
			</Box>
			<Divider sx={{ my: '0 !important' }} />
			<Box
				sx={{
					display: 'flex',
					p: 1,
					justifyContent: 'center',
				}}
			>
				<Button
					color="error"
					onClick={handleLogout}
					variant="outlined"
					fullWidth
				>
					Logout
				</Button>
			</Box>
		</Popover>
	)
}
