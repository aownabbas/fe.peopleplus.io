import React from 'react'
import { Box, Button, List, Typography, createTheme, useMediaQuery } from '@mui/material'

import PersonCard from './PersonCard'
import type { Person } from 'type/search'
import ArrowOutwardOutlinedIcon from '@untitled-ui/icons-react/build/esm/ArrowUpRight'
import { useNavigate } from 'react-router-dom'

interface PersonListProps {
	title: string
	people: Person[]
	link: { text: string; path: string }
	selectedItemId: number | null
	onSelect: (person: Person) => void
	handleCloseModal: () => void
	viewProfile: (state: { url: string; state?: { uuid?: string } }) => void
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

const PersonList: React.FC<PersonListProps> = ({
	title,
	people,
	link,
	selectedItemId,
	onSelect,
	handleCloseModal,
	viewProfile,
}) => {
	const navigate = useNavigate()

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					pr: '10px',
				}}
			>
				<Typography
					variant="h6"
					gutterBottom
				>
					{title}
				</Typography>

				<Button
					type="button"
					sx={{
						background: theme.palette.background.default,
						color: 'transparent',
						WebkitBackgroundClip: 'text',
						display: 'flex',
						alignItems: 'center',
						fontSize: 14,
						fontWeight: 500,
						gap: 1,
					}}
					onClick={() => {
						handleCloseModal()
						navigate(link.path)
					}}
				>
					{link.text}
					<Box sx={{ color: '#357DBC', mt: '3px' }}>
						<ArrowOutwardOutlinedIcon
							style={{
								width: '15px',
								height: '15px',
							}}
						/>
					</Box>
				</Button>
			</Box>

			<List
				dense
				// sx={{
				// 	height: '400px',
				// }}
			>
				{people.map((person) => (
					<PersonCard
						key={person.id}
						person={person}
						isSelected={person.id === selectedItemId}
						onSelect={onSelect}
						viewProfile={viewProfile}
					/>
				))}
			</List>
		</>
	)
}

export default PersonList
