import React from 'react'
import { Box, Avatar, Typography, Button, createTheme, Stack, Tooltip } from '@mui/material'
import Phone from '@untitled-ui/icons-react/build/esm/Headphones01'
import Mail from '@untitled-ui/icons-react/build/esm/Mail01'
import type { Person } from 'type/search'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

interface DetailPersonProps {
	person: Person
	viewProfile: (state: { url: string; state?: { uuid?: string } }) => void
}

const theme = createTheme({
	palette: {
		background: {
			default: 'linear-gradient(to right, #357DBC, #B591DB)',
		},
	},
})

const DetailPerson: React.FC<DetailPersonProps> = ({ person, viewProfile }) => {
	const { t } = useTranslation()

	return (
		<Box
			flex={1}
			sx={{
				p: 4,
				borderRadius: '12px',
				backgroundColor: '#F4F4F4',
				width: '300px',
				height: '390px',
				ml: 1,
			}}
		>
			<Avatar
				src={person.image}
				sx={{ width: 100, height: 100 }}
			/>
			<Tooltip title={person.name}>
				<Typography
					sx={{
						color: '#111927',
						fontWeight: 600,
						fontSize: 22,
						textWrap: 'nowrap',
						overflow: 'hidden',
						maxWidth: '400px',
						textOverflow: 'ellipsis',
					}}
				>
					{person.name}
				</Typography>
			</Tooltip>

			<Tooltip title={person.role}>
				<Typography
					sx={{
						color: '#6C737F',
						fontWeight: 500,
						fontSize: 18,
						textWrap: 'nowrap',
						overflow: 'hidden',
						maxWidth: '400px',
						textOverflow: 'ellipsis',
					}}
				>
					{person.role}
				</Typography>
			</Tooltip>

			<Stack
				spacing={1}
				sx={{
					mt: '12px',
				}}
			>
				{person.phone && (
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<Phone
							style={{
								color: '#98A2B3',
								width: '18px',
								height: '18px',
							}}
						/>
						<Tooltip title={person.phone}>
							<Typography
								sx={{
									color: '#475467',
									fontSize: '16px',
									lineHeight: '28px',
									fontWeight: 400,
									textWrap: 'nowrap',
									overflow: 'hidden',
									maxWidth: '300px',
									textOverflow: 'ellipsis',
								}}
							>
								{person.phone}
							</Typography>
						</Tooltip>
					</Box>
				)}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<Mail
						style={{
							color: '#98A2B3',
							width: '18px',
							height: '18px',
						}}
					/>
					<Tooltip title={person.email}>
						<Typography
							sx={{
								fontSize: '16px',
								lineHeight: '28px',
								fontWeight: 400,
								textWrap: 'nowrap',
								overflow: 'hidden',
								maxWidth: '300px',
								textOverflow: 'ellipsis',
							}}
						>
							<a
								href={`mailto:${person.email}`}
								style={{ textDecoration: 'none', color: '#656AD2' }}
							>
								{person.email}
							</a>
						</Typography>
					</Tooltip>
				</Box>
			</Stack>

			<Button
				sx={{ mt: 2, background: theme.palette.background.default, color: 'white' }}
				onClick={() => viewProfile(person.reDir)}
			>
				{t(tokens.search_modal.view_button.text)}
			</Button>
		</Box>
	)
}

export default DetailPerson
