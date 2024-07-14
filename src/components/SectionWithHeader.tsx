import React, { FC } from 'react'
import { Box, Button, Card, SvgIcon, Typography, createTheme } from '@mui/material'
// import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined'
import ArrowOutwardOutlinedIcon from '@untitled-ui/icons-react/build/esm/ArrowUpRight'
import { useNavigate } from 'react-router-dom'

interface SectionWithHeaderProps {
	children: React.ReactNode
	heading: string
	subHeading: string
	link: { text: string; path: string }
}

const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: 'linear-gradient(to right, #357DBC, #B591DB)', // Adjust colors as needed
		},
		text: {
			primary: '#173A5E',
			secondary: '#46505A',
		},
	},
})

const SectionWithHeader: FC<SectionWithHeaderProps> = ({ children, heading, subHeading, link }) => {
	const navigate = useNavigate()
	return (
		<Card
			sx={{
				boxShadow: 'none',
			}}
		>
			<Box
				sx={{
					backgroundColor: '#F9FAFB',
					border: '#EAECF0',
					padding: '20px 24px',
					display: 'flex',
					flexDirection: 'column', // Updated to column
					alignItems: 'center',
					justifyContent: 'space-between',
					'@media (min-width: 600px)': {
						flexDirection: 'row', // Change back to row for screens larger than or equal to sm
					},
				}}
			>
				<Box
					sx={{
						textAlign: 'center',
						'@media (min-width: 600px)': {
							textAlign: 'start',
						},
					}}
				>
					<Typography
						sx={{
							fontSize: 18,
							fontWeight: 600,
							color: '#101323',
						}}
					>
						{heading}
					</Typography>
					<Typography
						sx={{
							color: '#667085',
							fontWeight: 400,
							fontSize: 13,
						}}
					>
						{subHeading}
					</Typography>
				</Box>
				<Box>
					<Button
						onClick={() => navigate(link.path)}
						type="button"
						sx={{
							background: theme.palette.background.default,
							color: 'transparent',
							WebkitBackgroundClip: 'text',
							display: 'flex',
							alignItems: 'center',
							fontSize: 14,
							fontWeight: 500,
						}}
						endIcon={
							<SvgIcon>
								<ArrowOutwardOutlinedIcon
									style={{
										width: '15px',
										height: '15px',
										color: '#357DBC',
									}}
								/>
							</SvgIcon>
						}
					>
						{link.text}
					</Button>
				</Box>
			</Box>

			<Box sx={{ p: 1 }}>{children}</Box>
		</Card>
	)
}

export default SectionWithHeader
