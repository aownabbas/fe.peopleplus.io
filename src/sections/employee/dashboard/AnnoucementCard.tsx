// AnnouncementCard.tsx
import React, { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { CardContent, IconButton, Link, Box } from '@mui/material'

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

interface AnnouncementCardProps {
	announcement: Announcement
}

const AnnouncementCard: FC<AnnouncementCardProps> = ({ announcement }) => (
	<Card
		key={announcement.id}
		sx={{
			background: announcement.pinned ? 'linear-gradient(135deg, #357DBC2A, #B591DB2C)' : '#FFFFFF',
			border: announcement.pinned ? '1px solid #357DBC' : 'none',
		}}
	>
		<Box
			sx={{
				display: announcement.pinned ? 'flex' : 'none',
				alignItems: 'center',
				p: 3,
				pb: 0,
				gap: 1,
			}}
		>
			<img
				src="./Pin.png"
				style={{
					width: '25px',
				}}
			/>
			<Typography sx={{ color: '#475467', fontWeight: 400, fontSize: 11, lineHeight: '21px' }}>
				Pinned By {announcement.author.name}
			</Typography>
		</Box>
		<CardHeader
			sx={{
				pt: '15px',
			}}
			avatar={<Avatar src={announcement.author.avatar} />}
			disableTypography
			title={
				<Link
					color="text.primary"
					variant="subtitle2"
				>
					{announcement.author.name}
				</Link>
			}
			subheader={
				<Typography
					sx={{
						fontSize: 12,
						color: '#475467',
					}}
				>
					{announcement.designation}
				</Typography>
			}
		/>
		<CardContent
			sx={{
				pt: 0,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					justifyContent: 'space-between',
				}}
			>
				<Typography
					color="text.secondary"
					sx={{
						fontSize: 12,
						color: '#697688',
						fontWeight: 400,
						lineHeight: '20px',
					}}
				>
					{announcement.comment}
				</Typography>

				<Typography
					sx={{
						fontSize: 12,
						color: '#A6AAB3',
						fontWeight: 400,
						fontStyle: 'italic',
						textAlign: 'end',
					}}
				>
					{announcement.createdAt}
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<IconButton>
					<Typography
						sx={{
							fontSize: 12,
						}}
					>
						✅ 6
					</Typography>
				</IconButton>
				<IconButton>
					<Typography
						sx={{
							fontSize: 12,
						}}
					>
						😊 3
					</Typography>
				</IconButton>
				<IconButton>
					<svg
						width="15"
						height="15"
						viewBox="0 0 13 13"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M7.6665 7.00001V5.25001H8.83317V7.00001H7.6665ZM4.1665 7.00001V5.25001H5.33317V7.00001H4.1665ZM4.02323 8.64769L4.85218 7.81872L5.26153 8.23831C5.44575 8.4157 5.63335 8.54532 5.8244 8.62722C6.02226 8.70906 6.24743 8.75001 6.49984 8.75001C6.75225 8.75001 6.97741 8.70906 7.17528 8.62722C7.37315 8.54532 7.56075 8.4157 7.73814 8.23831L8.14752 7.81872L8.97644 8.64769L8.55685 9.05702C8.28396 9.32996 7.96669 9.54142 7.60508 9.69151C7.25035 9.8416 6.88192 9.91668 6.49984 9.91668C6.11775 9.91668 5.74594 9.8416 5.38433 9.69151C5.02956 9.54142 4.71572 9.32996 4.44282 9.05702L4.02323 8.64769ZM11.1665 6.41668H12.3332V7.00001C12.3332 8.05071 12.0705 9.02633 11.5451 9.92688C11.0266 10.8207 10.3171 11.5302 9.4165 12.0556C8.52272 12.5741 7.55054 12.8333 6.49984 12.8333C5.44914 12.8333 4.47352 12.5741 3.57294 12.0556C2.67917 11.5302 1.96962 10.8207 1.44428 9.92688C0.925761 9.02633 0.666504 8.05071 0.666504 7.00001C0.666504 5.94248 0.925761 4.96687 1.44428 4.07311C1.96962 3.17935 2.67917 2.47321 3.57294 1.95469C4.47352 1.42935 5.44914 1.16668 6.49984 1.16668H7.08317V2.33334H6.49984C5.63335 2.33334 4.84194 2.53802 4.12557 2.94738C3.41602 3.34991 2.85656 3.90936 2.4472 4.62574C2.03785 5.33529 1.83317 6.1267 1.83317 7.00001C1.83317 7.86649 2.03785 8.6579 2.4472 9.37429C2.85656 10.0838 3.41602 10.6433 4.12557 11.0527C4.84194 11.462 5.63335 11.6667 6.49984 11.6667C7.37315 11.6667 8.16455 11.462 8.87412 11.0527C9.59045 10.6433 10.1499 10.0838 10.5525 9.37429C10.9618 8.6579 11.1665 7.86649 11.1665 7.00001V6.41668ZM12.9165 3.50001H9.99984V0.583344H11.1665V2.33334H12.9165V3.50001ZM8.24984 2.33334H11.1665V5.25001H9.99984V3.50001H8.24984V2.33334Z"
							fill="#5D5D5D"
						/>
					</svg>
				</IconButton>
			</Box>
		</CardContent>
	</Card>
)

export default AnnouncementCard
