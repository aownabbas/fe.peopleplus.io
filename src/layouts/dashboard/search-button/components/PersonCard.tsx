import React from 'react'
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	useMediaQuery,
	useTheme,
	Typography,
	Tooltip,
} from '@mui/material'
import { Person } from 'type/search'

interface PersonListItemProps {
	person: Person
	isSelected: boolean
	onSelect: (person: Person) => void
	viewProfile: (state: { url: string; state?: { uuid?: string } }) => void
}

const PersonCard: React.FC<PersonListItemProps> = ({
	person,
	isSelected,
	onSelect,
	viewProfile,
}) => {
	const theme = useTheme()
	const isSmScreen = useMediaQuery(theme.breakpoints.up('sm'))
	return (
		<ListItem
			sx={{
				cursor: 'pointer',
				borderRadius: 1,
				my: 1,
				backgroundColor: isSelected ? '#f4f4f4' : 'transparent',
				'&:hover': {
					backgroundColor: '#f4f4f4',
				},
			}}
			onClick={() => (isSmScreen ? onSelect(person) : viewProfile(person.reDir))}
			onMouseOver={() => onSelect(person)}
			divider
		>
			<ListItemAvatar>
				<Avatar
					alt={person.name}
					src={person.image}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={
					<Tooltip title={person.name}>
						<Typography
							sx={{
								color: '#111927',
								fontWeight: 500,
								fontSize: 14,
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: '250px',
								textOverflow: 'ellipsis',
							}}
						>
							{person.name}
						</Typography>
					</Tooltip>
				}
				secondary={
					<Tooltip title={person.role}>
						<Typography
							sx={{
								color: '#6C737F',
								fontWeight: 400,
								fontSize: 14,
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: '250px',
								textOverflow: 'ellipsis',
							}}
						>
							{person.role}
						</Typography>
					</Tooltip>
				}
			/>
		</ListItem>
	)
}

export default PersonCard
