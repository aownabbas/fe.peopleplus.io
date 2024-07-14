import React from 'react'
import { Box } from '@mui/material' // Import Box from Material-UI or your preferred UI library
import ShiftCard from '@sections/employee/dashboard/ShiftCard'
import LeaveManagementCard from '@sections/employee/dashboard/LeaveManagementCard'
import UpcomingEventsCard from '@sections/employee/dashboard/UpcomingEventsCard'
import SectionWithHeader from '@components/SectionWithHeader'

interface EventsProps {
	recentLogs: {
		date: string
		day: string
		time: string[]
	}[]
}
const Events: React.FC<EventsProps> = ({ recentLogs }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<ShiftCard
				coverImageSrc="./quick_response.png"
				title="Quick Attendance"
				subtitle="Don’t forget to log your shift!"
				buttontitle="Ready to get started?"
				buttonText="Start Shift"
				manualbutton="Add Manual Time"
				recentLogs={recentLogs}
			/>
			<UpcomingEventsCard />

			<SectionWithHeader
				heading={'Leave Management'}
				subHeading={''}
				link={{ text: 'View All', path: '/' }}
			>
				<LeaveManagementCard />
			</SectionWithHeader>
		</Box>
	)
}

export default Events
