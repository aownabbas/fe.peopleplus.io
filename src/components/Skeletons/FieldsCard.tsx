import React from 'react'
import { createTheme } from '@mui/system'
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Skeleton,
	Stack,
	Typography,
	Divider,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { tokens } from '@locales/tokens'

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

interface FieldCard {
	firstTitle: string
	secondTitle: string
}

function FieldCard({ firstTitle, secondTitle }: FieldCard) {
	const { headers, form } = tokens.recruitment.add_job
	const { t } = useTranslation()
	return (
		<Card
			sx={{
				padding: '5px',
				'@media (min-width: 600px)': {
					padding: '20px',
				},
			}}
		>
			<Stack
				spacing={1}
				sx={{ marginRight: '20px' }}
			>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						xs={12}
						md={3}
					>
						<Typography variant="h6">{firstTitle}</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						md={9}
						container
						spacing={3}
					>
						{/* Job title */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Department */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Job description */}
						<Grid
							item
							xs={12}
							md={12}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={200}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Short description */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Location */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Job ID */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Employment type */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Salary range */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Salary type */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Skill-set */}
						<Grid
							item
							xs={12}
							md={12}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={56}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>
					</Grid>
				</Grid>

				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						xs={12}
						md={3}
					>
						<Typography variant="h6">{secondTitle}</Typography>
					</Grid>
					<Grid
						item
						xs={12}
						md={9}
						container
						spacing={3}
					>
						{/* Application Deadline */}
						<Grid
							item
							xs={12}
							md={12}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={60}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Experience Level */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={60}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Travel Requirements */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={60}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Hiring Manager */}
						<Grid
							item
							xs={12}
							md={12}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={60}
								sx={{ borderRadius: 1 }}
							/>
						</Grid>

						{/* Application Email */}
						<Grid
							item
							xs={12}
							md={6}
							sx={{ p: 1 }}
						>
							<Skeleton
								variant="rectangular"
								height={60}
								sx={{ borderRadius: 1 }}
							/>
							<Skeleton
								variant="text"
								sx={{ fontSize: '12px', marginTop: '8px', width: '60%' }}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Stack>

			<Box
				sx={{
					display: 'flex',
					alignContent: 'center',
					gap: 2,
					width: '100%',
					justifyContent: 'end',
					p: 2,
				}}
			>
				<Skeleton
					variant="text"
					sx={{ fontSize: '12px', marginTop: '8px', width: '20%' }}
				/>
			</Box>
		</Card>
	)
}

export default FieldCard
