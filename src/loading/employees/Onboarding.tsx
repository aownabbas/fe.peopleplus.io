import React from 'react'
import {
	Box,
	Card,
	Stack,
	Skeleton,
	LinearProgress,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	CircularProgress,
	Checkbox,
	List,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Seo } from '@components/seo' // Assuming Seo is your custom component or import it if it's from a package

const Onboarding = () => {
	const skeletonArray = new Array(5).fill(null) // Assuming you'll show 5 skeleton loaders

	return (
		<>
			<Seo title="Employee Onboarding" />
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
							// value={progressPercentage}
							variant="determinate"
						/>
						<Typography
							color="text.secondary"
							sx={{
								fontSize: 12,
								fontWeight: 400,
							}}
						>
							{/* {`${progressPercentage}% Onboarding Completed`} */}
						</Typography>
					</Box>
				</Stack>

				<Stack
					sx={{ p: 2 }}
					gap={2}
				>
					{skeletonArray.map((_, index) => (
						<Box key={index}>
							<Accordion
								sx={{
									border: 1,
									borderColor: '#E0E0E0',
									borderRadius: 8,
									background: 'white',
								}}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									sx={{
										display: 'flex',
										alignItems: 'center',
										margin: 0,
										height: 26,
									}}
								>
									<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
										<Skeleton
											variant="circular"
											width={24}
											height={24}
											sx={{ marginRight: '10px' }}
										/>
										<Skeleton
											variant="text"
											width={150}
											height={24}
										/>
									</Box>
								</AccordionSummary>

								<AccordionDetails sx={{ p: 0 }}>
									<Stack spacing={1}>
										<List
											sx={{
												listStyleType: 'disc',
												color: '#475467',
												fontWeight: 400,
												fontSize: 16,
												lineHeight: '24px',
												wordBreak: 'break-word',
												pr: 2,
											}}
										>
											<Skeleton
												variant="text"
												width="100%"
											/>
											<Skeleton
												variant="text"
												width="100%"
											/>
											<Skeleton
												variant="text"
												width="100%"
											/>
										</List>
									</Stack>
								</AccordionDetails>
							</Accordion>
						</Box>
					))}
				</Stack>
			</Card>
		</>
	)
}

export default Onboarding
