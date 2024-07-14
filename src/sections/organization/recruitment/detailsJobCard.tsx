import { useContext, useState, type FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// mui imports
import {
	Avatar,
	CardActions,
	CardContent,
	CardHeader,
	Box,
	Button,
	Card,
	Stack,
	Container,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
	Switch,
	SvgIcon,
	Tooltip,
} from '@mui/material'

// local imports
import { createTheme } from '@mui/system'
import CopyInput from '@components/copyToClipboardfield'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
	deleteJobAction,
	handleJobStatus,
	jobSelector,
	recruitmentSelector,
	recruitmentStatusSelector,
} from '@redux/features/recruitmentSlice'
import { currentUserSelector } from '@redux/features/authSlice'
import { deleteJobRequest, updateJobStatusRequest } from '@service/recruitment'
import { SHOW_SUCCESS } from '@utils/ToastMessage'
import type { HiringManager } from 'type/recruitment'
import { employmentType, prefix, urlPreFix } from '@config/index'
import Loading from '@components/Loading'
import Trash from '@untitled-ui/icons-react/build/esm/Trash01'
// import DeleteButton from '@components/DeleteButton'
import DeleteBtn from '@components/DeleteButton'

import { ConfirmationContext } from '@contexts/confirmation'

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

interface Detail {
	managerId: string
	avatar: string
	job: string
	name: string
}

export const DetailCard: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const job = useAppSelector(jobSelector)

	const { organization } = useAppSelector(currentUserSelector)
	const { openModal } = useContext(ConfirmationContext)

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		// console.info(event.target.checked, job.status === 'Open')
		const status = event.target.checked ? 'Open' : 'Closed'
		try {
			setIsLoading(true)
			const { data } = await updateJobStatusRequest({ id: job.uuid, status })
			// console.info(data)
			SHOW_SUCCESS({ msg: data.message })
			dispatch(handleJobStatus(status))
		} catch (error) {
			console.error('Error on job status ', error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleDelete = async (uuid: string) => {
		openModal(
			`Are you sure you want to delete this Job?`,
			() => {
				dispatch(deleteJobAction(uuid)).then(() => {
					navigate(-1)
				})
			},
			() => {
				console.log('Cancelled')
			},
		)
	}

	return (
		// <Container >
		<Card
			sx={{
				'@media (min-width: 768px)': {
					ml: 2,
				},
			}}
		>
			<CardContent>
				<Stack
					spacing={1}
					sx={{
						pb: 3,
					}}
				>
					<Typography
						sx={{
							background: theme.palette.background.default,
							color: 'transparent',
							WebkitBackgroundClip: 'text',
							display: 'flex',
							alignItems: 'center',
							fontSize: 13,
							fontWeight: 500,
							lineHeight: '20px',
						}}
					>
						{job.job_id}
					</Typography>
					<Typography
						sx={{
							color: 'black',
							fontSize: 14,
							fontWeight: 500,
						}}
					>
						{job?.title}
					</Typography>
					<Box>
						<Typography
							sx={{
								color: '#475467',
								fontSize: '14px',
								fontWeight: 400,
							}}
						>
							{job?.location?.name}
						</Typography>
						<Typography
							sx={{
								color: '#475467',
								fontSize: '14px',
								fontWeight: 400,
							}}
						>
							{employmentType.find((type) => type.value === job?.employment_type)?.label}
						</Typography>
						<Typography
							sx={{
								color: '#475467',
								fontSize: '14px',
								fontWeight: 400,
							}}
						>
							{job?.application_email}
						</Typography>
					</Box>
				</Stack>

				<Box sx={{ my: 1 }}>
					<CopyInput text={window.location.href} />
				</Box>
				<Divider />
				<Stack sx={{ py: 2 }}>
					<Box
						sx={{
							display: 'flex ',
							width: '100%',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography
							sx={{
								fontWeight: 500,
								color: '#344054',
								fontSize: 14,
							}}
						>
							{job.status === 'Open' ? 'Disable' : 'Enable'} this job
						</Typography>
						{isLoading ? (
							<Loading size={35} />
						) : (
							<Switch
								disabled={isLoading}
								checked={job.status === 'Open'}
								onChange={handleChange}
								inputProps={{ 'aria-label': 'controlled' }}
								sx={{
									'& .MuiSwitch-switchBase.Mui-checked': {
										color: '#357DBC',
									},
									'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
										background: theme.palette.background.default,
									},
								}}
							/>
						)}
					</Box>
					<Typography
						color={'gray'}
						sx={{
							fontSize: 14,
							width: '80%',
						}}
					>
						No applications will be accepted while the job is disabled.
					</Typography>
				</Stack>

				<DeleteBtn
					onClick={() => handleDelete(job.uuid)}
					label="Delete Job"
				/>

				<Box sx={{ mt: 3 }}>
					{job?.hiring_managers?.length > 0 ? (
						<List disablePadding>
							<Typography
								sx={{
									background: theme.palette.background.default,
									color: 'transparent',
									WebkitBackgroundClip: 'text',
									display: 'flex',
									alignItems: 'center',
									fontSize: 13,
									fontWeight: 500,
									lineHeight: '20px',
									pb: 1,
								}}
							>
								Hiring Managers
							</Typography>
							{job?.hiring_managers?.map((manager: HiringManager) => (
								<ListItem
									dense
									disableGutters
									key={manager?.id}
								>
									<ListItemAvatar>
										<Avatar src={manager?.photo} />
									</ListItemAvatar>
									<ListItemText
										primary={
											<Link
												to={`/${urlPreFix.employee}/profile/${manager?.uuid}`}
												style={{ textDecoration: 'none' }}
											>
												<Tooltip title={`${manager?.first_name} ${manager.last_name}`}>
													<Typography
														sx={{
															color: '#111927',
															fontWeight: 500,
															fontSize: 14,
															textWrap: 'nowrap',
															overflow: 'hidden',
															maxWidth: '300px',
															textOverflow: 'ellipsis',
														}}
													>
														{`${manager?.first_name} ${manager.last_name}`}
													</Typography>
												</Tooltip>
											</Link>
										}
										secondary={
											<Tooltip title={manager?.designation}>
												<Typography
													sx={{
														color: '#6C737F',
														fontWeight: 400,
														fontSize: 14,
														textWrap: 'nowrap',
														overflow: 'hidden',
														maxWidth: '300px',
														textOverflow: 'ellipsis',
													}}
												>
													{manager?.designation}
												</Typography>
											</Tooltip>
										}
									/>
								</ListItem>
							))}
						</List>
					) : null}
				</Box>
			</CardContent>
		</Card>
		// </Container>
	)
}
