/* eslint-disable prettier/prettier */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Seo } from '@components/seo'
import Card from '@mui/material/Card'
import LinearProgress from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Checkbox from '@mui/material/Checkbox'
import List from '@mui/material/List'
import { useState, useCallback, useEffect } from 'react'
import { employeeOnBoardingListRequest, saveEmployeeOnBoardingRequest } from '@service/employee'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { SHOW_INFO } from '@utils/ToastMessage'
import { createTheme } from '@mui/system'
import { OnboardingLoading } from '@loading/employees'
import { useDispatch } from 'react-redux'
import { getEmployeeOnboardingAction } from '@redux/features/employeeSlice'
import { t } from 'i18next'
import { tokens } from '@locales/tokens'

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

const Onboarding = () => {
	const { uuid } = useParams()
	const [onboarding, setOnBoarding] = useState<{ data: any[] }>({ data: [] })
	const [completedTasks, setCompletedTasks] = useState(0)
	const [loading, setLoading] = useState(true)
	const [loadingMap, setLoadingMap] = useState<{ [key: string]: boolean }>({})
	const [isUpdating, setIsUpdating] = useState(false)
	const dispatch = useDispatch()

	const handleOnBoardingGet = useCallback(async () => {
		try {
			const response = await employeeOnBoardingListRequest({ uuid })
			if (response.data.onboardings) {
				setOnBoarding({ data: response.data.onboardings })
				const completed = response.data.onboardings.filter(
					(task: any) => task.is_completed === 1,
				).length
				setCompletedTasks(completed)
				setLoading(false)
			}
		} catch (err) {
			console.error(err)
		}
	}, [])

	useEffect(() => {
		handleOnBoardingGet()
		dispatch(getEmployeeOnboardingAction({ uuid }))
	}, [])

	const handleCheckboxChange = async (isChecked: any, object: any) => {
		if (isUpdating) {
			SHOW_INFO({ msg: 'Wait until request is not completed' })
			return // Don't proceed if a request is ongoing
		}
		setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [object.uuid]: true }))

		const isCompleted = isChecked ? 1 : 0
		const data = new FormData()
		data.append('employee_uuid', uuid as string)
		data.append('onboarding_uuid', object.uuid)
		data.append('is_completed', isCompleted.toString())
		setIsUpdating(true)

		try {
			const response = await saveEmployeeOnBoardingRequest(data)

			if (response.status === 200) {
				setCompletedTasks(completedTasks + (isChecked ? 1 : -1))
			} else {
				setCompletedTasks(completedTasks - 1)
			}
		} catch (error: any) {
			console.error('Error updating onboarding stats', error)
		} finally {
			setIsUpdating(false)
			setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [object.uuid]: false }))
		}

		setOnBoarding((prevState) => {
			return {
				data: prevState.data.map((item) =>
					item.uuid === object.uuid ? { ...item, is_completed: isCompleted } : item,
				),
			}
		})
	}

	const progressPercentage = Math.floor((completedTasks / onboarding.data.length) * 100)
	// console.log(progressPercentage, 'progressPercentage')

	if (loading) {
		return <OnboardingLoading />
	}
	return (
		<>
			<Seo title={t(tokens.seo_titles.employees.onboarding)} />
			{onboarding?.data.length > 0 && (
				<>
					<Card>
						<Stack
							spacing={1}
							sx={{ p: 4 }}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: 1,
								}}
							>
								<LinearProgress
									sx={{
										flexGrow: 1,
										height: 7,
										'& .MuiLinearProgress-bar': {
											backgroundImage: 'linear-gradient(to right,#357DBC, #B591DB)',
										},
									}}
									value={progressPercentage}
									variant="determinate"
								/>
								<Typography
									color="text.secondary"
									sx={{
										fontSize: 12,
										fontWeight: 400,
									}}
								>
									{`${progressPercentage}% Onboarding Completed`}
								</Typography>
							</Box>
						</Stack>

						<Stack
							sx={{ p: 2 }}
							gap={2}
						>
							{onboarding?.data.map((object, index) => (
								// eslint-disable-next-line react/jsx-key
								<Box>
									<Accordion
										sx={{
											border: 1,
											borderColor: object.is_completed === 1 ? '#357dbc' : '#E0E0E0', // Change border color based on the checkbox state
											borderRadius: 8,
											background:
												object.is_completed === 1
													? 'linear-gradient(45deg, #357dbc2a, #b591db2c)'
													: 'white',
										}}
									>
										<AccordionSummary
											expandIcon={
												<ExpandMoreIcon
													sx={{
														color: object.is_completed === 1 ? '#357dbc' : 'inherit', // Change text color based on the checkbox state
													}}
												/>
											}
											sx={{
												display: 'flex',
												alignItems: 'center',
												margin: 0,
												height: 26,
											}}
										>
											<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
												{loadingMap[object.uuid] ? (
													<CircularProgress
														sx={{
															width: '16px!important',
															height: '16px!important',
															marginRight: '10px',
														}}
													/>
												) : (
													<Checkbox
														onChange={(e) => handleCheckboxChange(e.target.checked, object)}
														checked={object.is_completed === 1}
													/>
												)}
												<Typography
													sx={{
														color: object.is_completed === 1 ? '#357dbc' : '#344054',
														fontWeight: 500,
														fontSize: 16,
														lineHeight: '24px',
														maxWidth: 220,
														textOverflow: 'ellipsis',
														overflow: 'hidden',
														textWrap: 'nowrap',
													}}
												>
													{object.title}
												</Typography>{' '}
											</Box>
										</AccordionSummary>

										<AccordionDetails sx={{ p: 0 }}>
											<Stack spacing={1}>
												<List
													sx={{
														listStyleType: 'disc',
														color: object.is_completed === 1 ? '#357dbc' : '#475467',
														fontWeight: 400,
														fontSize: 16,
														lineHeight: '24px',
														wordBreak: 'break-word',
														pr: 2,
														'& img': {
															maxWidth: '100%',
															height: 'auto',
														},
													}}
												>
													<span dangerouslySetInnerHTML={{ __html: object.description }}></span>
												</List>
											</Stack>
										</AccordionDetails>
									</Accordion>
								</Box>
							))}
						</Stack>
					</Card>
				</>
			)}
		</>
	)
}

export default Onboarding
