import React from 'react'
// mui imports
import {
	Button,
	Card,
	Box,
	Container,
	Stack,
	Typography,
	TableBody,
	Table,
	SvgIcon,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { createTheme } from '@mui/system'
import { Scrollbar } from '@components/scrollbar'
import { UpcomingEvents } from './UpcomingEvents'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'
import { dashboardEventsSelector, statusSelector } from '@redux/features/dashboardSlice'
import { useAppSelector } from '@redux/hooks'
import { TableSkeleton } from '@components/Skeletons'
import { useNavigate } from 'react-router-dom'
import ArrowOutwardOutlinedIcon from '@untitled-ui/icons-react/build/esm/ArrowUpRight'
import { eventSelector } from '@redux/features/eventsSlice'

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

const Events = () => {
	const { t } = useTranslation()
	const status = useAppSelector(statusSelector)
	const events = useAppSelector(eventSelector).event.listing

	const navigate = useNavigate()

	return (
		<Grid
			xs={12}
			md={4}
		>
			<Card
				sx={{
					boxShadow: 'none',
				}}
			>
				<Box
					sx={{
						width: '100%',
						height: 160,
						objectFit: 'cover',
					}}
				>
					<img
						src="./upcomingEvent.png"
						style={{ height: '100%', width: '100%' }}
					/>
				</Box>
				<Stack
					sx={{
						border: '1px solid #EAECF0',
					}}
				>
					<Box sx={{ backgroundColor: '#F9FAFB', padding: '20px 24px' }}>
						<Typography
							sx={{
								fontSize: 18,
								fontWeight: 600,
								color: '#101323',
							}}
						>
							{t(tokens.org_dashboard.events.header.heading)}
						</Typography>
						<Typography
							sx={{
								fontSize: '13px',
								color: '#667085',
								fontWeight: 400,
								lineHeight: '20px',
							}}
						>
							{t(tokens.org_dashboard.events.header.sub_heading)}
						</Typography>
					</Box>

					<Scrollbar
						sx={{
							maxHeight: 1015,
						}}
					>
						<Box
							sx={{
								p: 1,
								maxHeight: 1000,
							}}
						>
							{status === 'LOADING' && events.length == 0 ? (
								<Table>
									<TableBody>
										<TableSkeleton
											columns={1}
											rows={1}
											avatarColumn={0}
										/>
									</TableBody>
								</Table>
							) : (
								<UpcomingEvents />
							)}
						</Box>
					</Scrollbar>

					<Button
						onClick={() => navigate(`/events`)}
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
						{t(tokens.org_dashboard.events.header.jump_button)}
					</Button>
				</Stack>
			</Card>
		</Grid>
	)
}

export default Events
