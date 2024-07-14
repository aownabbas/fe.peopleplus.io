import type { FC } from 'react'
import numeral from 'numeral'
import { subDays, subHours } from 'date-fns'
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight'
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02'
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SectionWithHeader from '@components/SectionWithHeader'

import { Scrollbar } from '@components/scrollbar'
import { date } from 'zod'

const now = new Date()

interface Customer {
	id: string
	avatar: string
	name: string
	designation: string
	date: string
	loggedtime: string
	approvedby1: string
	approvedstatus1: string
	approvedby2: string
	approvedstatus2: string
}

const customers: Customer[] = [
	{
		id: 'bp-0001',
		avatar: './user.png',
		name: 'Ibrahim Hammayun',
		designation: 'Web Developer',
		date: '15 Nov , 2023',
		loggedtime: '11:00AM - 08:30PM',
		approvedby1: './user.png',
		approvedstatus1: './tick.png',
		approvedby2: './hamad.jpeg',
		approvedstatus2: 'pending.png',
	},

	{
		id: 'bp-0002',
		avatar: './user.png',
		name: 'Taimoor Imam ',
		designation: 'Operations Manager',
		date: '10 Mar , 2023',
		loggedtime: '11:00AM - 02:30PM',
		approvedby1: './hamad.jpeg',
		approvedstatus1: './rejected.png',
		approvedby2: './user.png',
		approvedstatus2: 'tick.png',
	},

	{
		id: 'bp-0001',
		avatar: './user.png',
		name: 'Hamad Pervaiz',
		designation: 'Project Manager ',
		date: '12 Jan , 2024',
		loggedtime: '09:00AM - 08:30PM',
		approvedby1: './user.png',
		approvedstatus1: './tick.png',
		approvedby2: './user.png',
		approvedstatus2: 'pending.png',
	},
]

const TimeInOut: FC = () => (
	<>
		<SectionWithHeader
			heading={'🕐 Time In/Out Manual Request Management'}
			subHeading={''}
			link={{ text: 'View All', path: '/' }}
		>
			<Scrollbar>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<TableCell>Employee Name</TableCell>
							<TableCell>Date</TableCell>
							<TableCell>Logged Time</TableCell>
							<TableCell>Approved By </TableCell>
							<TableCell align="right">Approval</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{customers.map((customer) => {
							return (
								<TableRow key={customer.id}>
									<TableCell>
										<Stack
											alignItems="center"
											direction="row"
											spacing={1}
										>
											<Avatar
												src={customer.avatar}
												sx={{
													height: 42,
													width: 42,
												}}
											/>
											<Box>
												<Link
													color="inherit"
													variant="subtitle2"
												>
													{customer.name}
												</Link>
												<Typography
													color="text.secondary"
													variant="body2"
												>
													{customer.designation}
												</Typography>
											</Box>
										</Stack>
									</TableCell>
									<TableCell>
										<Typography
											color="text.secondary"
											variant="body2"
										>
											{customer.date}
										</Typography>
									</TableCell>
									<TableCell>
										<Typography
											color="text.secondary"
											variant="body2"
										>
											{customer.loggedtime}
										</Typography>
									</TableCell>
									<TableCell>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 2,
											}}
										>
											<Box
												sx={{
													position: 'relative',
												}}
											>
												<Avatar
													src={customer.approvedby1}
													sx={{
														height: 42,
														width: 42,
													}}
												/>
												<img
													src={customer.approvedstatus1}
													style={{
														width: 12,
														position: 'absolute',
														right: 2,
														bottom: '0px',
													}}
												/>
											</Box>
											<Box
												sx={{
													position: 'relative',
												}}
											>
												<Avatar
													src={customer.approvedby2}
													sx={{
														height: 42,
														width: 42,
													}}
												/>
												<img
													src={customer.approvedstatus2}
													style={{
														width: 12,
														position: 'absolute',
														right: 2,
														bottom: '0px',
													}}
												/>
											</Box>
										</Box>
									</TableCell>
									<TableCell
										align="right"
										sx={{
											display: 'flex',
											alignItems: 'center',
											pt: '25px',
										}}
									>
										<IconButton>
											<img
												src="./approve.png"
												style={{ width: 20 }}
											/>
										</IconButton>
										<IconButton>
											<img
												src="./reject.png"
												style={{ width: 20 }}
											/>
										</IconButton>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</Scrollbar>
		</SectionWithHeader>
	</>
)

export default TimeInOut
