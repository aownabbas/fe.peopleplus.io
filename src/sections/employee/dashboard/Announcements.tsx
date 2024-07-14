// Announcements.tsx
import React, { FC } from 'react'
import { Scrollbar } from '@components/scrollbar'
import { Box, Typography } from '@mui/material'
import AnnouncementCard from '@sections/employee/dashboard/AnnoucementCard'

interface Announcement {
	id: string
	author: {
		avatar: string
		name: string
	}
	comment: string
	createdAt: string
	designation: string
	pinned: boolean
}

const Announcements: FC = () => {
	const announcements: Announcement[] = [
		{
			id: 'bp-0002',
			author: {
				avatar: './user.png',
				name: 'Hamna Zafar',
			},
			comment: 'Back to WorkWe resume our operations from tomorrow.',
			createdAt: '15 Nov, 2023',
			designation: 'HR Generalist',
			pinned: true,
		},
		{
			id: 'bp-0003',
			author: {
				avatar: './user.png',
				name: 'Ibrahim Hammayun',
			},
			comment: 'We believe in acknowledging the hard work and dedication of our employees.',
			createdAt: '17 Jan, 2024',
			designation: 'Web Developer',
			pinned: false,
		},
	]

	return (
		<>
			<Box>
				<Typography sx={{ fontSize: 18, fontWeight: 500 }}>Company Announcements</Typography>
				<Scrollbar>
					<Box
						sx={{
							maxHeight: 650,
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}
					>
						{announcements.map((announcement) => (
							<AnnouncementCard
								key={announcement.id}
								announcement={announcement}
							/>
						))}
					</Box>
				</Scrollbar>
			</Box>
		</>
	)
}

export default Announcements
