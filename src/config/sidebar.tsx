/* eslint-disable prettier/prettier */
import type { ReactNode } from 'react'
import { useMemo } from 'react'

// mui imports
import { SvgIcon } from '@mui/material'
import ToolIcon from '@icons/untitled-ui/duocolor/tool'
import RecruitmentIcon from '@untitled-ui/icons-react/build/esm/UserSquare'
import Policy from '@untitled-ui/icons-react/build/esm/Certificate01'

import HomeSmileIcon from '@icons/untitled-ui/duocolor/home-smile'
import Calendar from '@untitled-ui/icons-react/build/esm/Calendar'

import Chart from '@untitled-ui/icons-react/build/esm/Dataflow04'
// internationalization imports
import { useTranslation } from 'react-i18next'
import EmployeeIcon from '@icons/untitled-ui/duocolor/users-03'
import { tokens } from '@locales/tokens'
import { ROLE } from '.'

export interface Item {
	disabled?: boolean
	external?: boolean
	icon?: ReactNode
	items?: Item[]
	label?: ReactNode
	path?: string
	title: string
}

export interface Section {
	items: Item[]
	subheader?: string
}

export const useSections = ({ role }: { role: ROLE }) => {
	const { t } = useTranslation()
	const commonRoutes = [
		{
			title: t(tokens.upcoming_event.title),
			path: '/events',
			icon: <img src="/birthday-gift 1.svg" />,
		},
	]

	const orgRoutes = [
		{
			title: t(tokens.nav.dashboard),
			path: '/',
			icon: (
				<SvgIcon fontSize="small">
					<HomeSmileIcon />
				</SvgIcon>
			),
		},

		{
			title: t(tokens.nav.employee),
			path: '/employees',
			icon: (
				<SvgIcon fontSize="small">
					<EmployeeIcon />
				</SvgIcon>
			),
		},
		{
			title: t(tokens.nav.asset),
			path: '/assets',
			icon: (
				<SvgIcon fontSize="small">
					<HomeSmileIcon />
				</SvgIcon>
			),
		},

		{
			title: t(tokens.nav.organization),
			path: '/chart',
			icon: (
				<SvgIcon fontSize="small">
					<Chart />
				</SvgIcon>
			),
		},

		{
			title: t(tokens.nav.recruitment),
			path: '/recruitment',
			icon: (
				<SvgIcon fontSize="small">
					<RecruitmentIcon />
				</SvgIcon>
			),
		},
		{
			title: t(tokens.nav.document_policy),
			path: '/policies',
			icon: (
				<SvgIcon fontSize="small">
					<Policy />
				</SvgIcon>
			),
		},
		{
			title: t(tokens.upcoming_event.title),
			path: '/events',
			icon: (
				<SvgIcon fontSize="small">
					<Calendar />
				</SvgIcon>
			),
		},
		{
			title: t(tokens.nav.settings),
			path: '/settings/general',
			icon: (
				<SvgIcon fontSize="small">
					<ToolIcon />
				</SvgIcon>
			),
		},
	]

	const empRoutes = [
		{
			title: t(tokens.nav.dashboard),
			path: '/',
			icon: (
				<SvgIcon fontSize="small">
					<HomeSmileIcon />
				</SvgIcon>
			),
		},
		{
			title: t(tokens.nav.profile),
			path: '/profile/detail',
			icon: (
				<SvgIcon fontSize="small">
					<RecruitmentIcon />
				</SvgIcon>
			),
		},
		{
			title: t(tokens.nav.recruitment),
			path: '/recruitment',
			icon: (
				<SvgIcon fontSize="small">
					<RecruitmentIcon />
				</SvgIcon>
			),
		},
		{
			title: t(tokens.nav.document_policy),
			path: '/policy',
			icon: (
				<SvgIcon fontSize="small">
					<Policy />
				</SvgIcon>
			),
		},

		{
			title: t(tokens.upcoming_event.title),
			path: '/events',
			icon: (
				<SvgIcon fontSize="small">
					<Calendar />
				</SvgIcon>
			),
		},
	]

	return useMemo(() => {
		return [
			{
				items: role === 'employee' ? empRoutes : role === 'organization' ? orgRoutes : [],
			},
		]
	}, [t, role])
}
