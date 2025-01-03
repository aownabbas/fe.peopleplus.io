import type { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

import { SideNavItem } from './side-nav-item'
import { checkPoint } from '@utils/bug'

interface Item {
	disabled?: boolean
	external?: boolean
	icon?: ReactNode
	items?: Item[]
	label?: ReactNode
	path?: string
	title: string
}

const renderItems = ({
	depth = 0,
	items,
	pathname,
}: {
	depth?: number
	items: Item[]
	pathname?: string | null
}): JSX.Element[] =>
	items.reduce(
		(acc: JSX.Element[], item) =>
			reduceChildRoutes({
				acc,
				depth,
				item,
				pathname,
			}),
		[],
	)

const reduceChildRoutes = ({
	acc,
	depth,
	item,
	pathname,
}: {
	acc: JSX.Element[]
	depth: number
	item: Item
	pathname?: string | null
}): Array<JSX.Element> => {
	const checkPath = !!(item.path && pathname)
	const partialMatch = checkPath ? pathname.split('/')[1] === item.path!.split('/')[1] : false
	// @ts-ignore
	const exactMatch = checkPath ? pathname === item.path : false

	/** 
	 *TODO: WARNING - 
		If there are subRoutes/dropdowns for any nested routes, 
		ensure to check both the exactMatch and partialMatch variables. 
		The current implementation has been adjusted to consider the absence of dropdowns. 
		This comment is a reminder for developers to handle this condition when dropdowns are 
		introduced in the future.
		
	 *CODE: need to replace 
		const partialMatch = checkPath ? pathname.includes(item.path!) : false

	 *NOTE:  
		do that same thing in src/layouts/dashboard/mobile-nav/mobile-nav-section.tsx
		for small screens 
		
	*/
	if (item.items) {
		acc.push(
			<SideNavItem
				active={partialMatch}
				depth={depth}
				disabled={item.disabled}
				icon={item.icon}
				key={item.title}
				label={item.label}
				open={partialMatch}
				title={item.title}
			>
				<Stack
					component="ul"
					spacing={0.5}
					sx={{
						listStyle: 'none',
						m: 0,
						p: 0,
					}}
				>
					{renderItems({
						depth: depth + 1,
						items: item.items,
						pathname,
					})}
				</Stack>
			</SideNavItem>,
		)
	} else {
		acc.push(
			<SideNavItem
				active={partialMatch}
				depth={depth}
				disabled={item.disabled}
				external={item.external}
				icon={item.icon}
				key={item.title}
				label={item.label}
				path={item.path}
				title={item.title}
			/>,
		)
	}

	return acc
}

interface SideNavSectionProps {
	items?: Item[]
	pathname?: string | null
	subheader?: string
}

export const SideNavSection: FC<SideNavSectionProps> = (props) => {
	const { items = [], pathname, subheader = '', ...other } = props

	return (
		<Stack
			component="ul"
			spacing={0.5}
			sx={{
				listStyle: 'none',
				m: 0,
				p: 0,
			}}
			{...other}
		>
			{subheader && (
				<Box
					component="li"
					sx={{
						color: 'black',
						fontSize: 12,
						fontWeight: 700,
						lineHeight: 1.66,
						mb: 1,
						ml: 1,
						textTransform: 'uppercase',
					}}
				>
					{subheader}
				</Box>
			)}
			{renderItems({ items, pathname })}
		</Stack>
	)
}
