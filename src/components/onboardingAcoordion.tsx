/* eslint-disable prettier/prettier */
import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'

export default function OnboardingAccordion() {
	return (
		<Stack
			sx={{ p: 2 }}
			gap={2}
		>
			<Box>
				<Accordion
					sx={{
						border: 1,
						borderColor: '#E0E0E0',
						borderRadius: 8,
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						sx={{
							display: 'flex',
							alignItems: 'center',
							margin: 0,
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
							<Checkbox />
							<Typography variant="h6">Company Orientation</Typography>
						</Box>
					</AccordionSummary>

					<AccordionDetails>
						<Stack spacing={2}>
							<List sx={{ listStyleType: 'disc' }}>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Sign the employee handbook acknowledgement form
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Attend company orientation session
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Meet with team members and department head
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Review company policies and procedures
								</ListItem>
							</List>
						</Stack>
					</AccordionDetails>
				</Accordion>
			</Box>

			<Box>
				<Accordion
					sx={{
						border: 1,
						borderColor: '#357DBC',
						borderRadius: 8,
						background: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						sx={{
							display: 'flex',
							alignItems: 'center',
							margin: 0,
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
							<Checkbox />
							<Typography variant="h6">IT and Equipment Setup</Typography>
						</Box>
					</AccordionSummary>

					<AccordionDetails>
						<Stack spacing={2}>
							<List sx={{ listStyleType: 'disc' }}>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Receive company-issued equipment (e.g., laptop, phone, access card)
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Set up email and communication tools (e.g., Slack, Microsoft Teams)
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Complete cybersecurity and data privacy training
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Configure and install required software and applications
								</ListItem>
							</List>
						</Stack>
					</AccordionDetails>
				</Accordion>
			</Box>

			<Box>
				<Accordion
					sx={{
						border: 1,
						borderColor: '#E0E0E0',
						borderRadius: 8,
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						sx={{
							display: 'flex',
							alignItems: 'center',
							margin: 0,
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
							<Checkbox />
							<Typography variant="h6">HR and Legal</Typography>
						</Box>
					</AccordionSummary>

					<AccordionDetails>
						<Stack spacing={2}>
							<List sx={{ listStyleType: 'disc' }}>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Complete role-specific training sessions
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Review job responsibilities and expectations with manager
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Familiarize oneself with team workflows and processes
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Set initial performance goals or objectives
								</ListItem>
							</List>
						</Stack>
					</AccordionDetails>
				</Accordion>
			</Box>

			<Box>
				<Accordion
					sx={{
						border: 1,
						borderColor: '#357DBC',
						borderRadius: 8,
						background: 'linear-gradient(135deg, #357DBC2A, #B591DB2C)',
					}}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						sx={{
							display: 'flex',
							alignItems: 'center',
							margin: 0,
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
							<Checkbox />
							<Typography variant="h6">Company Culture and Social Integration</Typography>
						</Box>
					</AccordionSummary>

					<AccordionDetails>
						<Stack spacing={2}>
							<List sx={{ listStyleType: 'disc' }}>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Attend company culture and team-building events
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Schedule one-on-one meetings with colleagues
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Join relevant company social media groups or channels
								</ListItem>
								<ListItem sx={{ display: 'list-item', ml: 2, p: '3px' }}>
									Get familiar with company values and mission
								</ListItem>
							</List>
						</Stack>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Stack>
	)
}
