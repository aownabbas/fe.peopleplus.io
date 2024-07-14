import { useEffect, type FC, type ReactNode } from 'react'

import { useSettings } from '@hooks/use-settings'
import { useSections } from '@config/sidebar'
import { VerticalLayout } from './vertical-layout'
import { SHOW_INFO } from '@utils/ToastMessage'
import { useAppSelector } from '@redux/hooks'
import { currentUserSelector } from '@redux/features/authSlice'
import type { sidebarUserProp } from 'type/config'
import { ROLE } from '@config/index'
import { employeeSelector } from '@redux/features/employeeSlice'

interface LayoutProps {
	children?: ReactNode
	role: ROLE
}

export const Layout: FC<LayoutProps> = (props) => {
	const settings = useSettings()
	const sections = useSections({ role: props.role })
	const authUser: any = useAppSelector(currentUserSelector)
	const { detail }: any = useAppSelector(employeeSelector)

	let user: sidebarUserProp = {
		email: authUser.email,
		name: authUser.organization
			? `${authUser.organization.first_name} ${authUser.organization.last_name}`
			: `${detail?.first_name} ${detail?.last_name}`,
		photo: authUser.organization ? authUser.organization.company_logo : (detail?.photo as string),
	}

	useEffect(() => {
		user = {
			email: authUser.email,
			name: authUser.organization
				? `${authUser.organization.first_name} ${authUser.organization.last_name}`
				: `${detail?.first_name} ${detail?.last_name}`,
			photo: authUser.organization ? authUser.organization.company_logo : (detail?.photo as string),
		}
	}, [authUser, detail])

	if (settings.layout === 'horizontal') {
		SHOW_INFO({ msg: 'you can not set layout horizontally  ' })
	}

	return (
		<VerticalLayout
			user={user}
			sections={sections}
			navColor={settings.navColor}
			{...props}
		/>
	)
}
